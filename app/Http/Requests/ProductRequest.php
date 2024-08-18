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

        $product->fill($this->validated());

        $product->save();

        if ($this->hasFile('images')) {
            foreach ($this->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'path' => $path,
                    'product_id' => $product->id
                ]);
            }
        }

        return $product;
    }
}
