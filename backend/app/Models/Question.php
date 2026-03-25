<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'text',
        'topic',
        'topic_image_url',
        'topic_id',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'correct_answer',
        'category_id',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function topicEntity(): BelongsTo
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }
}
