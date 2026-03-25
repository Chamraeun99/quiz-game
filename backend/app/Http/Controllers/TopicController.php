<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\JsonResponse;

class TopicController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Topic::query()
                ->withCount('questions')
                ->orderBy('name')
                ->get(),
        );
    }
}
