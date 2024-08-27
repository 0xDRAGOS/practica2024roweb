<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ReviewRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'comment' => ['required', 'string', 'max:255'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
        ];
    }

    public function updateOrCreate(Product $product)
    {
        $review = Review::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $product->id,
            ],
            [
                'comment' => $this->input('comment'),
                'rating' => $this->input('rating'),
            ]
        );

        return $review;
    }
}
