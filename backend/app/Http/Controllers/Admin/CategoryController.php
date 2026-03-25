<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Category::query()
                ->withCount('questions')
                ->orderBy('name')
                ->get(),
        );
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:categories,name'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $category = Category::create($payload);

        return response()->json($category->loadCount('questions'), 201);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:categories,name,'.$category->id],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $category->update($payload);

        return response()->json($category->loadCount('questions'));
    }

    public function destroy(Category $category): JsonResponse
    {
        if ($category->questions()->exists()) {
            return response()->json([
                'message' => 'Cannot delete a category that still has questions.',
            ], 422);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted.',
        ]);
    }
}
