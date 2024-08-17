<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function list() {
        return Inertia::render('Categories/List', [
            'categories' => Category::orderBy('order')->get()
        ]);
    }

    public function create() {
        return Inertia::render('Categories/AddEdit');
    }

    public function store(CategoryRequest $categoryRequest, ?Category $category = null) {
        $categoryRequest->updateOrCreate($category);

        return redirect()->route('categories.list')->with('success', 'Category saved successfully!');
    }

    public function update(Category $category) {
        return Inertia::render('Categories/AddEdit', [
            'category' => $category,
        ]);
    }

    public function delete(Category $category) {
        $category->delete($category);

        return redirect()->route('categories.list')->with('success', 'Category deleted successfully!');
    }
}
