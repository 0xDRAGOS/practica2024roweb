<?php

namespace Database\Seeders;

use App\Models\Like;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewLikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Review::factory()->count(50)->create();
        Like::factory()->count(100)->create();
    }
}
