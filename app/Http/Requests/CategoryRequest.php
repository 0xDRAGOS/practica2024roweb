<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'order' => ['required', 'numeric'],
        ];
    }

    public function updateOrCreate(?Category $category = null)
    {
        if (!$category) {
            $category = new Category();
        }

        $category->name = $this->get('name');
        $category->order = $this->get('order');
        $category->save();

        return $category;
    }
}
