<?php

namespace App\Services;

use App\Models\DocumentChunk;
use Gemini;
use Illuminate\Support\Collection;
use RuntimeException;

class GeminiQuizGeneratorService
{
    /**
     * Embed and store a full document in chunked form.
     */
    public function embedAndStoreDocumentText(string $documentKey, string $text): int
    {
        $trimmedText = trim($text);

        if ($trimmedText === '') {
            throw new RuntimeException('Document text cannot be empty.');
        }

        $chunks = $this->chunkText(
            $trimmedText,
            max(100, config('gemini_quiz.chunk_size', 1200)),
            max(0, config('gemini_quiz.chunk_overlap', 200)),
        );

        if ($chunks->isEmpty()) {
            throw new RuntimeException('No text chunks were generated from the document.');
        }

        DocumentChunk::query()->where('document_key', $documentKey)->delete();

        $embeddingModel = config('gemini_quiz.embedding_model', 'text-embedding-004');

        foreach ($chunks as $index => $chunk) {
            $embeddingResponse = $this->geminiClient()
                ->embeddingModel($embeddingModel)
                ->embedContent($chunk);

            $embeddingValues = $embeddingResponse->embedding->values ?? [];

            if (! is_array($embeddingValues) || $embeddingValues === []) {
                throw new RuntimeException('Gemini returned an empty embedding vector.');
            }

            DocumentChunk::query()->create([
                'document_key' => $documentKey,
                'chunk_index' => $index,
                'content' => $chunk,
                'embedding' => array_map('floatval', $embeddingValues),
            ]);
        }

        return $chunks->count();
    }

    /**
     * Find most relevant chunks for a query using cosine similarity.
     */
    public function findRelevantChunks(string $query, int $topK = 5): Collection
    {
        $query = trim($query);

        if ($query === '') {
            throw new RuntimeException('Query cannot be empty.');
        }

        $topK = max(1, min($topK, 20));

        $embeddingModel = config('gemini_quiz.embedding_model', 'text-embedding-004');
        $queryEmbeddingResponse = $this->geminiClient()
            ->embeddingModel($embeddingModel)
            ->embedContent($query);

        $queryVector = array_map('floatval', $queryEmbeddingResponse->embedding->values ?? []);

        if ($queryVector === []) {
            throw new RuntimeException('Gemini returned an empty query embedding vector.');
        }

        return DocumentChunk::query()
            ->get(['id', 'document_key', 'chunk_index', 'content', 'embedding'])
            ->map(function (DocumentChunk $chunk) use ($queryVector) {
                $chunkVector = array_map('floatval', $chunk->embedding ?? []);
                $score = $this->cosineSimilarity($queryVector, $chunkVector);

                return [
                    'id' => $chunk->id,
                    'document_key' => $chunk->document_key,
                    'chunk_index' => $chunk->chunk_index,
                    'content' => $chunk->content,
                    'score' => $score,
                ];
            })
            ->sortByDesc('score')
            ->take($topK)
            ->values();
    }

    /**
     * Generate 5 multiple-choice questions in JSON format from relevant chunks.
     */
    public function generateMultipleChoiceQuestions(string $query, int $topK = 5): array
    {
        $relevantChunks = $this->findRelevantChunks($query, $topK);

        if ($relevantChunks->isEmpty()) {
            throw new RuntimeException('No document chunks found in database.');
        }

        $context = $relevantChunks
            ->map(fn (array $chunk) => $chunk['content'])
            ->implode("\n\n---\n\n");

        $prompt = "You are a quiz generator.\n"
            . "Context:\n{$context}\n\n"
            . "User query: {$query}\n\n"
            . "Generate 5 multiple-choice questions in JSON format.\n"
            . "Return valid JSON only with this schema:\n"
            . "{\n"
            . "  \"questions\": [\n"
            . "    {\n"
            . "      \"question\": \"...\",\n"
            . "      \"choices\": [\"A\", \"B\", \"C\", \"D\"],\n"
            . "      \"answer_index\": 0\n"
            . "    }\n"
            . "  ]\n"
            . "}";

        $generationModel = config('gemini_quiz.generation_model', 'gemini-2.0-flash');

        $response = $this->geminiClient()
            ->generativeModel(model: $generationModel)
            ->generateContent($prompt);

        $raw = trim((string) $response->text());
        $payload = $this->decodeJsonResponse($raw);

        if (! isset($payload['questions']) || ! is_array($payload['questions'])) {
            throw new RuntimeException('Gemini response did not contain a valid questions array.');
        }

        return [
            'query' => $query,
            'chunks' => $relevantChunks->all(),
            'questions' => $payload['questions'],
            'raw' => $raw,
        ];
    }

    private function geminiClient(): \Gemini\Contracts\ClientContract
    {
        $apiKey = (string) config('gemini_quiz.api_key');

        if ($apiKey === '') {
            throw new RuntimeException('Missing GEMINI_API_KEY configuration.');
        }

        return Gemini::client($apiKey);
    }

    private function chunkText(string $text, int $chunkSize, int $overlap): Collection
    {
        $text = preg_replace('/\s+/', ' ', $text) ?? '';
        $text = trim($text);

        if ($text === '') {
            return collect();
        }

        $length = mb_strlen($text);
        $step = max(1, $chunkSize - $overlap);

        $chunks = [];

        for ($start = 0; $start < $length; $start += $step) {
            $chunk = trim(mb_substr($text, $start, $chunkSize));

            if ($chunk !== '') {
                $chunks[] = $chunk;
            }

            if ($start + $chunkSize >= $length) {
                break;
            }
        }

        return collect($chunks);
    }

    private function cosineSimilarity(array $vectorA, array $vectorB): float
    {
        if ($vectorA === [] || $vectorB === []) {
            return 0.0;
        }

        $length = min(count($vectorA), count($vectorB));

        if ($length === 0) {
            return 0.0;
        }

        $dot = 0.0;
        $magnitudeA = 0.0;
        $magnitudeB = 0.0;

        for ($i = 0; $i < $length; $i++) {
            $a = (float) $vectorA[$i];
            $b = (float) $vectorB[$i];
            $dot += $a * $b;
            $magnitudeA += $a * $a;
            $magnitudeB += $b * $b;
        }

        if ($magnitudeA <= 0.0 || $magnitudeB <= 0.0) {
            return 0.0;
        }

        return $dot / (sqrt($magnitudeA) * sqrt($magnitudeB));
    }

    private function decodeJsonResponse(string $raw): array
    {
        $clean = trim($raw);

        if (str_starts_with($clean, '```')) {
            $clean = preg_replace('/^```(?:json)?\s*/', '', $clean) ?? $clean;
            $clean = preg_replace('/\s*```$/', '', $clean) ?? $clean;
            $clean = trim($clean);
        }

        $decoded = json_decode($clean, true);

        if (! is_array($decoded)) {
            throw new RuntimeException('Gemini did not return valid JSON.');
        }

        return $decoded;
    }
}
