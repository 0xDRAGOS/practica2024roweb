import Pagination from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";

export default function CategoriesTable({ categories, success }) {
    const deleteCategory = (category) => {
        if (!window.confirm('Are you sure you want to delete this category?')) {
            router.delete(route('categories.delete', category.id))
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
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {categories.data.map(category => (
                        <tr className="bg-yellow-950 text-yellow-600 border-b border-yellow-700" key={category.id}>
                            <td className="px-3 py-2">{category.id}</td>
                            <td className="px-3 py-2">{category.name}</td>
                            <td className="px-3 py-2">{category.order}</td>
                            <td className="px-3 py-2 flex justify-center">
                                <Link href={route('categories.update', category.id)}
                                      className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1">Update</Link>
                                <button onClick={() => deleteCategory(category)}
                                        className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {<Pagination links={categories.meta.links} />}
        </>
    )
}
