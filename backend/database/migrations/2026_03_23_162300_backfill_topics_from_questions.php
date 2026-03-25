<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $rows = DB::table('questions')
            ->select('topic', 'topic_image_url')
            ->whereNotNull('topic')
            ->where('topic', '!=', '')
            ->distinct()
            ->get();

        foreach ($rows as $row) {
            $existingId = DB::table('topics')->where('name', $row->topic)->value('id');

            if (! $existingId) {
                DB::table('topics')->insert([
                    'name' => $row->topic,
                    'image_url' => $row->topic_image_url,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $existingId = DB::table('topics')->where('name', $row->topic)->value('id');
            }

            if ($existingId) {
                DB::table('questions')
                    ->where('topic', $row->topic)
                    ->whereNull('topic_id')
                    ->update([
                        'topic_id' => $existingId,
                        'updated_at' => now(),
                    ]);
            }
        }
    }

    public function down(): void
    {
        // Intentionally left empty to avoid deleting user-managed topics.
    }
};
