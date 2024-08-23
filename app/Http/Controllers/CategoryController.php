<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function list() {
        $categories = Category::query()->orderBy('name')->paginate(10)->onEachSide(1);

        return Inertia::render('Categories/List', [
            'categories' => CategoryResource::collection($categories),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
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
        if ($category->products()->count()) {
            return redirect()->back()->with(['error' => 'Category contains products that are associated with it.']);
        }

        $category->delete();

        return redirect()->route('categories.list')->with('success', 'Category deleted successfully!');
    }
}
