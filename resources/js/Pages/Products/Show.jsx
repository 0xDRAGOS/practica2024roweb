import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, product, images }) {
    return (
        <AuthenticatedLayout user={auth.user}
                         header={<h2 className="font-semibold text-xl text-yellow-600 leading-tight">{`Product "${product.name}"`}</h2>}
        >
            <Head title={`Product "${product.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-red-950 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            {
                                images.map((image) =>
                                    (<img key={image.id} src={`/storage/${image.path}`} alt="" className="w-full h-64 object-contain px-2 py-2 border-b border-yellow-700"/>
                                ))
                            }
                        </div>
                        <div className="p-6 text-yellow-600">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Product ID</label>
                                        <p className="mt-1">{product.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Product Name</label>
                                        <p className="mt-1">{product.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Product Category</label>
                                        <p className="mt-1">{product.category.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Product Price</label>
                                        <p className="mt-1">{product.price}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Create Date</label>
                                        <p className="mt-1">{product.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Update Date</label>
                                        <p className="mt-1">{product.updated_at}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Product Description</label>
                                <p className="mt-1">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
