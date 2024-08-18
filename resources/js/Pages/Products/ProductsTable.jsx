import Pagination from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";

export default function ProductsTable({ products, success }) {
    const deleteProduct = (product) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.delete', product.id))
        }
    }

    return (
        <>
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                    {success}
                </div>
            )
            }
            <div className="overflow-auto">
                <table className="w-full text-sm text-center rtl:text-right">
                    <thead className="text-lg text-yellow-600
        bg-yellow-800 border-b-2 border-yellow-400">
                    <tr className="text-nowrap">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {products.data.map(product => (
                        <tr className="bg-yellow-950 text-yellow-600 border-b border-yellow-700" key={product.id}>
                            <td className="px-3 py-2">{product.id}</td>
                            <th className="px-3 py-2 hover:underline">
                                <Link href={route("products.show", product.id)}>{product.name}</Link>
                            </th>
                            <td className="px-3 py-2 text-nowrap">{product.category.name}</td>
                            <td className="px-3 py-2 text-nowrap">{product.price}</td>
                            <td className="px-3 py-2 flex justify-center">
                                <Link href={route('products.update', product.id)} className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1">Update</Link>
                                <button onClick={() => deleteProduct(product)} className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {<Pagination links={products.meta.links} />}
        </>
    )
}
