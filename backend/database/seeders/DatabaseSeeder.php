<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            QuestionSeeder::class,
        ]);

        // User::factory(10)->create();

        User::firstOrCreate([
            'email' => 'chomraeunrom@gmail.com',
        ], [
            'name' => 'Test User',
            'password' => bcrypt('password'),
        ]);

    }
}
