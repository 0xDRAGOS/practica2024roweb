import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, laravelVersion, phpVersion }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-yellow-600 leading-tight">Dashboard</h2>}
            laravelVersion={laravelVersion}
            phpVersion={phpVersion}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-red-950 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-yellow-600">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
