import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import ProductsTable from './ProductsTable.jsx'

export default function List({ products, flash, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-yellow-600 leading-tight">Products</h2>}
            flash={flash}
        >
            <Head title="Products List" />
            <div>
                <div className="py-4 px-4">
                    <div className="flex justify-end my-4">
                        <Link href={route('products.create')} className="mt-2 text-yellow-600 rounded-md bg-red-950 px-4 py-4 text-center hover:bg-red-900">Add a new product</Link>
                    </div>
                        <div className="mt-6">
                                <ProductsTable
                                    products={products}
                                />
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
