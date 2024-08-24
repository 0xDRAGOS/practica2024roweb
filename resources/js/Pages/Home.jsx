import {Link, Head, useForm} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import NavLink from "@/Components/NavLink.jsx";
import Pagination from "@/Components/Pagination.jsx";
import {useState} from "react";
import SelectInput from "@/Components/SelectInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function Home({ products, search, auth, canLogin, canRegister }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { data, setData, get } = useForm({
        search: search || ''
    })

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('home'), {preserveState: true});
    }

    const filteredProducts = selectedCategory === 'All' ? products.data : products.data.filter(product => product.category.name === selectedCategory);

    const categories = Array.from(new Set(products.data.map(product => product.category.name)));

    return (
        <>
            <Head title="Home"/>
            <div className="min-h-screen bg-yellow-800">
                <header className="bg-red-950 border-b border-yellow-600 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-yellow-600"/>
                            </Link>
                        </div>
                        <nav className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {auth.user ? (
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            ) : (
                                <>
                                    {canLogin && (
                                        <NavLink href={route('login')} active={route().current('login')}>
                                            Log in
                                        </NavLink>
                                    )}
                                    {canRegister && (
                                        <NavLink href={route('register')} active={route().current('register')}>
                                            Register
                                        </NavLink>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>
                <div className="bg-red-950">
                    <div className="text-yellow-600 text-xl font-bold max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">Home</div>
                </div>

                <main className="container flex-1 mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-between">
                        <div>
                            <InputLabel htmlFor="category" value="Filter by Category"
                                        className="text-yellow-600 font-bold text-lg mr-2"/>
                            <SelectInput
                                id="category"
                                className="p-2 bg-red-900 text-red-950 rounded font-bold hover:bg-yellow-500"
                                value={selectedCategory}
                                required
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All" className="text-red-950">All</option>
                                {
                                    categories.map((category, index) => (
                                        <option value={category} key={index}
                                                className="text-red-950">{category}</option>
                                    ))
                                }
                            </SelectInput>
                        </div>
                        <form onSubmit={handleSearch}>
                            <InputLabel htmlFor="search" value="Search Products"
                                        className="text-yellow-600 font-bold text-lg mr-2"/>
                            <input
                                id="search"
                                type="text"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                className="p-2 bg-red-900 text-yellow-600 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 rounded font-bold border-transparent"
                                placeholder="Search by product name"
                            />
                            <button type="submit" className="ml-2 p-2 bg-yellow-600 text-yellow-900 hover:bg-yellow-500 rounded font-bold">Search</button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Link href={route("products.show", product.id)} key={product.id}
                                  className="bg-red-950 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                                <div className="h-48 bg-red-900 flex items-center justify-center">
                                    {product.images.length > 0 ? (
                                        <img src={product.images[0].url} alt={product.name}
                                             className="h-full w-full object-cover"/>
                                    ) : (
                                        <div className="text-yellow-500">No image available</div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="text-lg font-bold text-yellow-500">{product.name}</div>
                                    <div className="text-sm text-red-600 mt-1">#{product.category.name}</div>
                                    <div className="text-xl font-semibold text-yellow-800 mt-2">&euro;{product.price}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="col-span-full mt-6">
                        <Pagination links={products.links}/>
                    </div>
                </main>

                <footer className="bg-red-950 py-16 text-center text-sm text-yellow-600">
                    <p>&copy; {new Date().getFullYear()} Practica Roweb. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
