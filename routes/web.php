<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION
        ]);
    })->name('dashboard');

    Route::group([
        'prefix' => 'categories',
    ], function () {
        Route::get('/', [CategoryController::class, 'list'])->name('categories.list');
        Route::get('/create', [CategoryController::class, 'create'])->name('categories.create');
        Route::get('/edit/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::post('store/{category?}', [CategoryController::class, 'store'])->name('categories.store');
        Route::delete('{category}', [CategoryController::class, 'delete'])->name('categories.delete');
    });

    Route::group([
        'prefix' => 'products',
    ], function () {
        Route::get('/', [ProductController::class, 'list'])->name('products.list');
        Route::get('/create', [ProductController::class, 'create'])->name('products.create');
        Route::get('/edit/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::post('/store/{product?}', [ProductController::class, 'store'])->name('products.store');
        Route::post('/{product}/like', [ProductController::class, 'toggleLike'])->name('products.toggleLike');
        Route::post('/{product}/review', [ProductController::class, 'storeReview'])->name('products.storeReview');
        Route::delete('/delete/{product}/review/{review}', [ProductController::class, 'deleteReview'])->name('products.deleteReview');
        Route::delete('/delete/{product}', [ProductController::class, 'delete'])->name('products.delete');
        Route::get('/{product}', [ProductController::class, 'show'])->name('products.show');
    });
});

require __DIR__.'/auth.php';
