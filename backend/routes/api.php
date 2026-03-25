<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\QuestionAdminController;
use App\Http\Controllers\Admin\TopicController as AdminTopicController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\PdfExtractController;
use App\Http\Controllers\QuizGeneratorController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TopicController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/questions', [QuestionController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/topics', [TopicController::class, 'index']);
Route::post('/pdf/extract', [PdfExtractController::class, 'extract']);
Route::post('/quiz-generator/index-document', [QuizGeneratorController::class, 'indexDocument']);
Route::post('/quiz-generator/generate-questions', [QuizGeneratorController::class, 'generateQuestions']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/admin/google/redirect', [AdminAuthController::class, 'redirectToGoogle']);
Route::get('/admin/google/callback', [AdminAuthController::class, 'handleGoogleCallback']);

Route::middleware(['auth:sanctum', 'admin.token'])->prefix('admin')->group(function (): void {
    Route::post('/logout', [AdminAuthController::class, 'logout']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    Route::get('/questions', [QuestionAdminController::class, 'index']);
    Route::post('/questions', [QuestionAdminController::class, 'store']);
    Route::put('/questions/{question}', [QuestionAdminController::class, 'update']);
    Route::delete('/questions/{question}', [QuestionAdminController::class, 'destroy']);

    Route::get('/topics', [AdminTopicController::class, 'index']);
    Route::post('/topics', [AdminTopicController::class, 'store']);
    Route::put('/topics/{topic}', [AdminTopicController::class, 'update']);
    Route::delete('/topics/{topic}', [AdminTopicController::class, 'destroy']);
    Route::post('/topics/upload-image', [AdminTopicController::class, 'uploadImage']);
});