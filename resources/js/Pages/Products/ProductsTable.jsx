import Pagination from "@/Components/Pagination";
import {Link, router, useForm} from "@inertiajs/react";

export default function ProductsTable({ products, filteredProducts, auth }) {
    const {delete: deleteEntry} = useForm({});
    const deleteProduct = (id) => {
        deleteEntry(route('products.delete', [id]), {
            onFinish: () => {
                router.reload({only: ['products']});
            },
        });
    }

    return (
        <>
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
                    {filteredProducts.map(product => (
                        <tr className="bg-yellow-950 text-yellow-600 border-b border-yellow-700" key={product.id}>
                            <td className="px-3 py-2">{product.id}</td>
                            <th className="px-3 py-2 hover:underline">
                                <Link href={route("products.show", product.id)}>{product.name}</Link>
                            </th>
                            <td className="px-3 py-2 text-nowrap">{product.category.name}</td>
                            <td className="px-3 py-2 text-nowrap">{product.price}</td>
                            <td className="px-3 py-2 flex justify-center">
                                {
                                    auth.can.product_edit && (
                                        <Link href={route('products.update', product.id)}
                                              className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1">Update</Link>
                                    )
                                }
                                {
                                    auth.can.product_destroy && (
                                    <button onClick={() => deleteProduct(product.id)}
                                        className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1">Delete
                                    </button>
                                    )
                                }
                                {
                                    !auth.can.product_edit && !auth.can.product_destroy && (
                                        <span className="text-yellow-600">No actions available</span>
                                    )
                                }
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
