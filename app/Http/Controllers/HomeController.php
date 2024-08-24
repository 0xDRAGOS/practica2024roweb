<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index(Request $request) {
        $search = $request->input('search');

        $query = Product::query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $products = $query->with(['category', 'images'])->orderBy('name')->paginate(9)->onEachSide(1);

        return Inertia::render('Home', [
            'products' => $products,
            'search' => $search,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register')
        ]);
    }
}
