<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $backendCategory = Category::firstOrCreate([
            'name' => 'Backend',
        ], [
            'description' => 'Laravel, APIs, and server-side concepts.',
        ]);

        $frontendCategory = Category::firstOrCreate([
            'name' => 'Frontend',
        ], [
            'description' => 'React and browser concepts.',
        ]);

        $gamingCategory = Category::firstOrCreate([
            'name' => 'Gaming',
        ], [
            'description' => 'Fun and game-based questions.',
        ]);

        $questions = [
            [
                'text' => 'Which programming language is used for Laravel?',
                'topic' => 'Laravel Basics',
                'option_a' => 'Python',
                'option_b' => 'PHP',
                'option_c' => 'JavaScript',
                'option_d' => 'Java',
                'correct_answer' => 'b',
                'category_id' => $backendCategory->id,
            ],
            [
                'text' => 'In React, which hook is used to handle side effects?',
                'topic' => 'React Hooks',
                'option_a' => 'useState',
                'option_b' => 'useContext',
                'option_c' => 'useEffect',
                'option_d' => 'useReducer',
                'correct_answer' => 'c',
                'category_id' => $frontendCategory->id,
            ],
            [
                'text' => 'Which Mobile Legends hero is known for the "Ocean Oddity" skill?',
                'topic' => 'Mobile Legends',
                'option_a' => 'Eudora',
                'option_b' => 'Kadita',
                'option_c' => 'Aurora',
                'option_d' => 'Odette',
                'correct_answer' => 'b',
                'category_id' => $gamingCategory->id,
            ],
        ];

        foreach ($questions as $q) {
            $topic = Topic::firstOrCreate([
                'name' => $q['topic'],
            ]);

            $q['topic_id'] = $topic->id;

            Question::updateOrCreate(
                ['text' => $q['text']],
                $q,
            );
        }
    }
}