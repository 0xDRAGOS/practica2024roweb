<?php

namespace Database\Factories;

use App\Models\Like;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Like>
 */
class LikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
//            'product_id' => \App\Models\Product::inRandomOrder()->first()->id,
            'product_id' => null,
            'user_id' => \App\Models\User::inRandomOrder()->first()->id
        ];
    }
}
