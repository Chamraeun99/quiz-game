<?php

return [
    'api_key' => env('GEMINI_API_KEY'),
    'embedding_model' => env('GEMINI_EMBEDDING_MODEL', 'text-embedding-004'),
    'generation_model' => env('GEMINI_GENERATION_MODEL', 'gemini-2.0-flash'),
    'chunk_size' => (int) env('GEMINI_CHUNK_SIZE', 1200),
    'chunk_overlap' => (int) env('GEMINI_CHUNK_OVERLAP', 200),
];
