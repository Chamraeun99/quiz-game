<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Topic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionAdminController extends Controller
{
    /**
     * Ensure topic text/image are always linked to a Topic record.
     * This keeps legacy question topics visible in Topic Management.
     */
    private function resolveTopicPayload(array $payload): array
    {
        $topicId = $payload['topic_id'] ?? null;
        $topicName = trim((string) ($payload['topic'] ?? ''));
        $topicImageUrl = $payload['topic_image_url'] ?? null;

        if ($topicId) {
            $topic = Topic::query()->find($topicId);
            if ($topic) {
                $payload['topic'] = $topic->name;
                $payload['topic_image_url'] = $topic->image_url;
                $payload['topic_id'] = $topic->id;

                return $payload;
            }
        }

        if ($topicName !== '') {
            $topic = Topic::query()->firstOrCreate(
                ['name' => $topicName],
                ['image_url' => $topicImageUrl],
            );

            // Fill topic image when topic exists but has no image yet.
            if ($topicImageUrl && ! $topic->image_url) {
                $topic->update(['image_url' => $topicImageUrl]);
            }

            $payload['topic_id'] = $topic->id;
            $payload['topic'] = $topic->name;
            $payload['topic_image_url'] = $topic->image_url;
        }

        return $payload;
    }

    public function index(): JsonResponse
    {
        return response()->json(
            Question::query()
                ->with('category:id,name', 'topicEntity:id,name,image_url')
                ->latest('id')
                ->get(),
        );
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'text' => ['required', 'string', 'max:255'],
            'topic' => ['nullable', 'string', 'max:100'],
            'topic_image_url' => ['nullable', 'url', 'max:2048'],
            'topic_id' => ['nullable', 'exists:topics,id'],
            'option_a' => ['required', 'string', 'max:255'],
            'option_b' => ['required', 'string', 'max:255'],
            'option_c' => ['required', 'string', 'max:255'],
            'option_d' => ['required', 'string', 'max:255'],
            'correct_answer' => ['required', 'in:a,b,c,d'],
            'category_id' => ['nullable', 'exists:categories,id'],
        ]);

        $payload = $this->resolveTopicPayload($payload);

        $question = Question::create($payload);

        return response()->json($question->load('category:id,name', 'topicEntity:id,name,image_url'), 201);
    }

    public function update(Request $request, Question $question): JsonResponse
    {
        $payload = $request->validate([
            'text' => ['required', 'string', 'max:255'],
            'topic' => ['nullable', 'string', 'max:100'],
            'topic_image_url' => ['nullable', 'url', 'max:2048'],
            'topic_id' => ['nullable', 'exists:topics,id'],
            'option_a' => ['required', 'string', 'max:255'],
            'option_b' => ['required', 'string', 'max:255'],
            'option_c' => ['required', 'string', 'max:255'],
            'option_d' => ['required', 'string', 'max:255'],
            'correct_answer' => ['required', 'in:a,b,c,d'],
            'category_id' => ['nullable', 'exists:categories,id'],
        ]);

        $payload = $this->resolveTopicPayload($payload);

        $question->update($payload);

        return response()->json($question->load('category:id,name', 'topicEntity:id,name,image_url'));
    }

    public function destroy(Question $question): JsonResponse
    {
        $question->delete();

        return response()->json([
            'message' => 'Question deleted.',
        ]);
    }
}
