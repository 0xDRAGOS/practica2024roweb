import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import CategoriesTable from "@/Pages/Categories/CategoriesTable.jsx";

export default function List({ categories, success, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-yellow-600 leading-tight">Categories</h2>}
        >
            <Head title="Categories List" />
            <div>
                <div className="py-4 px-4">
                    <div className="flex justify-end my-4">
                        <Link href={route('categories.create')} className="mt-2 text-yellow-600 rounded-md bg-red-950 px-4 py-4 text-center hover:bg-red-900">Add a new category</Link>
                    </div>
                    <div className="mt-6">
                        <CategoriesTable
                            categories={categories}
                            success={success}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
