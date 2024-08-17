import {Link, Head} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import NavLink from "@/Components/NavLink.jsx";

export default function Home({auth, laravelVersion, phpVersion}) {
    return (
        <>
            <Head title="Home"/>
            <div className="min-h-screen bg-gray-100">
                <header
                    className="bg-red-950 border-b border-yellow-600 ">
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
                                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                        Log in
                                    </NavLink>
                                    <NavLink href={route('register')} active={route().current('dashboard')}>
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </nav>
                    </div>
                </header>
                <div className="bg-red-950">
                    <div className="text-yellow-600 text-xl font-bold max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">Home</div>
                </div>

                <main className="flex-1">
                    TODO
                </main>

                <footer className="bg-red-950 py-16 text-center text-sm text-yellow-600">
                    Laravel v{laravelVersion} (PHP v{phpVersion})
                </footer>
            </div>
        </>
    );
}
