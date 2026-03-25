<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\JsonResponse;

class QuestionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Question::query()
                ->with('category:id,name', 'topicEntity:id,name,image_url')
                ->orderBy('id')
                ->get(),
        );
    }
}