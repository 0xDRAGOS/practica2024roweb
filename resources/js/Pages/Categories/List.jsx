import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {Fragment} from "react";

export default function List({categories}) {
    return (
        <AuthenticatedLayout>
            <Head title="Category List" />
            <div>
                <div className="py-4 px-4">
                    <div className="text-xl text-yellow-600 font-bold">Categories</div>
                    <div className="flex justify-end my-4">
                        <Link href={route('categories.create')} className="mt-2 text-yellow-600 rounded-md bg-red-950 px-4 py-4 text-center">Create a new category</Link>
                    </div>
                        <div className="mt-6">
                            <div className="grid grid-cols-4">
                                <div className={'text-yellow-600 text-center font-bold mb-3'}>ID</div>
                                <div className={'text-yellow-600 text-center font-bold mb-3'}>Name</div>
                                <div className={'text-yellow-600 text-center font-bold mb-3'}>Order</div>
                                <div className={'text-yellow-600 text-center font-bold mb-3'}>Actions</div>

                                {categories.map((category, index) => {
                                    return <Fragment key={index}>
                                        <div className={'text-yellow-600 mb-2'}>{category.id}</div>
                                        <div className={'text-yellow-600 mb-2'}>{category.name}</div>
                                        <div className={'text-yellow-600 mb-2'}>{category.order}r</div>
                                        <div className={'mb-2 flex justify-center'}>
                                            <Link href={route('categories.update', [category.id])} className="mr-2 text-yellow-600 rounded-md bg-red-950 px-4 py-4 text-center">Update</Link>
                                            <Link href={route('categories.delete', [category.id])} className="text-yellow-600 rounded-md bg-red-950 px-4 py-4 text-center">Delete</Link>
                                        </div>
                                    </Fragment>
                                })}
                            </div>
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
