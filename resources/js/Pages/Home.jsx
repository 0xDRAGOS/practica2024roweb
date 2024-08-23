import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import NavLink from "@/Components/NavLink.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Home({ products, auth, canLogin, canRegister }) {
    console.log(products);
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

                <main className="container flex-1 mx-auto py-6 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.map((product) => (
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
