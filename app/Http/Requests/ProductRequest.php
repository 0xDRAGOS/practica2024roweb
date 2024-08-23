<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class ProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'description' => ['nullable', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image'],
            'deleted_images' => ['nullable', 'array'],
            'deleted_images.*' => ['exists:product_images,id'],
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

        if ($this->has('deleted_images')) {
            foreach ($this->get('deleted_images') as $imageId) {
                $image = $product->images()->find($imageId);

                if ($image) {
                    Storage::disk('public')->delete($image->path);
                    $image->delete();
                }
            }
        }

        return $product;
    }
}
