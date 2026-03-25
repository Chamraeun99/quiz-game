<?php

namespace App\Http\Controllers;

use App\Services\GeminiQuizGeneratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;

class QuizGeneratorController extends Controller
{
    public function __construct(private readonly GeminiQuizGeneratorService $service)
    {
    }

    public function indexDocument(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'document_key' => ['required', 'string', 'max:255'],
            'text' => ['required', 'string'],
        ]);

        try {
            $count = $this->service->embedAndStoreDocumentText(
                $validated['document_key'],
                $validated['text'],
            );

            return response()->json([
                'message' => 'Document embeddings stored successfully.',
                'document_key' => $validated['document_key'],
                'chunks_stored' => $count,
            ]);
        } catch (RuntimeException $error) {
            return response()->json([
                'message' => $error->getMessage(),
            ], 422);
        }
    }

    public function generateQuestions(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'query' => ['required', 'string'],
            'top_k' => ['nullable', 'integer', 'min:1', 'max:20'],
        ]);

        try {
            $result = $this->service->generateMultipleChoiceQuestions(
                $validated['query'],
                (int) ($validated['top_k'] ?? 5),
            );

            return response()->json($result);
        } catch (RuntimeException $error) {
            return response()->json([
                'message' => $error->getMessage(),
            ], 422);
        }
    }
}
