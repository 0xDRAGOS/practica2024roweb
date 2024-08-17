<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'description' => ['nullable', 'string'],
            'category_id' => ['required', 'exists:categories,id']
        ];
    }

    public function updateOrCreate(?Product $product = null)
    {
        if (!$product) {
            $product = new Product();
        }

        $product->category_id = $this->get('category_id');
        $product->name = $this->get('name');
        $product->price = $this->get('price');
        $product->description = $this->get('description');
        $product->save();

        return $product;
    }
}
