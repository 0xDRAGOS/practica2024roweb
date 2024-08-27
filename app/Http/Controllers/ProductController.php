<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\ReviewRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ReviewResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function list() {
        $products = Product::query()->orderBy('name')->paginate(10)->onEachSide(1);

        return Inertia::render('Products/List', [
            'products' => ProductResource::collection($products),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function show(Product $product) {
        $reviews = $product->reviews()->with('user')->orderBy('created_at', 'desc')->paginate(10)->onEachSide(1);

        return Inertia::render('Products/Show', [
            'product' => new ProductResource($product),
            'images' => $product->images()->get(),
            'reviews' => ReviewResource::collection($reviews),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function create() {
        return Inertia::render('Products/AddEdit', [
            'categories' => CategoryResource::collection(Category::orderBy('name')->get()),
        ]);
    }

    public function store(ProductRequest $productRequest, ?Product $product = null) {
        $productRequest->updateOrCreate($product);

        return redirect()->route('products.list')->with('success', 'Product saved successfully!');
    }

    public function update(Product $product) {
        return Inertia::render('Products/AddEdit', [
            'product' => $product,
            'categories' => CategoryResource::collection(Category::orderBy('name')->get()),
            'images' => $product->images()->get()
        ]);
    }

    public function delete(Product $product) {
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $product->images()->delete();
        $product->delete();

        return redirect()->route('products.list')->with('success', 'Product deleted successfully!');
    }

    public function toggleLike(Product $product)
    {
        $user = Auth::user();
        $like = $product->likes()->where('user_id', $user->id)->first();

        if ($like) {
            $like->delete();
        } else {
            $product->likes()->create(['user_id' => $user->id]);
        }

        return Inertia::location(route('products.show', $product->id));
    }

    public function storeReview(Product $product, ReviewRequest $request) {
        $request->updateOrCreate($product);

        return redirect()->route('products.show', $product)->with('success', 'Review saved successfully!');
    }

    public function deleteReview(Product $product, Review $review)
    {
        if (auth()->id() !== $review->user_id) {
            return redirect()->route('products.show', $product)->with('error', 'Unauthorized access!');
        }

        $review->delete();

        return redirect()->route('products.show', $product)->with('success', 'Review deleted successfully!');
    }
}
