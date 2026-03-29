<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Topic;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TopicController extends Controller
{
    /**
     * Backfill topics from legacy question.topic text entries.
     */
    private function syncTopicsFromQuestions(): void
    {
        Question::query()
            ->whereNotNull('topic')
            ->where('topic', '!=', '')
            ->whereNull('topic_id')
            ->orderBy('id')
            ->chunkById(200, function ($questions): void {
                foreach ($questions as $question) {
                    if (! $question instanceof Question) {
                        continue;
                    }

                    $topicName = trim((string) $question->topic);

                    if ($topicName === '') {
                        continue;
                    }

                    $topic = Topic::query()->firstOrCreate(
                        ['name' => $topicName],
                        ['image_url' => $question->topic_image_url ?: null],
                    );

                    if ($question->topic_image_url && ! $topic->image_url) {
                        $topic->update(['image_url' => $question->topic_image_url]);
                    }

                    $question->update([
                        'topic_id' => $topic->id,
                        'topic' => $topic->name,
                        'topic_image_url' => $topic->image_url ?: $question->topic_image_url,
                    ]);
                }
            });
    }

    public function index(): JsonResponse
    {
        $this->syncTopicsFromQuestions();

        return response()->json(
            Topic::query()
                ->withCount('questions')
                ->orderBy('name')
                ->get(),
        );
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:topics,name'],
            'image_url' => ['nullable', 'url', 'max:2048'],
        ]);

        $topic = Topic::create($payload);

        return response()->json($topic->loadCount('questions'), 201);
    }

    public function update(Request $request, Topic $topic): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:topics,name,'.$topic->id],
            'image_url' => ['nullable', 'url', 'max:2048'],
        ]);

        $topic->update($payload);

        return response()->json($topic->loadCount('questions'));
    }

    public function destroy(Topic $topic): JsonResponse
    {
        if ($topic->questions()->exists()) {
            return response()->json([
                'message' => 'Cannot delete a topic that still has questions.',
            ], 422);
        }

        $topic->delete();

        return response()->json([
            'message' => 'Topic deleted.',
        ]);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $path = $payload['image']->store('topics', 'public');

        return response()->json([
            'image_url' => Storage::url($path),
        ]);
    }
}
