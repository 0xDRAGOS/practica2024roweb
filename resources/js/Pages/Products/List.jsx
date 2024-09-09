import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import ProductsTable from './ProductsTable.jsx'
import InputLabel from "@/Components/InputLabel.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {useState} from "react";

export default function List({ products, flash, auth }) {

    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts = selectedCategory === 'All' ? products.data : products.data.filter(product => product.category.name === selectedCategory);

    const categories = Array.from(new Set(products.data.map(product => product.category.name)));

    console.log(auth.can);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-yellow-600 leading-tight">Products</h2>}
            flash={flash}
        >
            <Head title="Products List"/>
            <div>
                <div className="py-4 px-4">
                    <div className="flex justify-between my-4">
                        <div>
                            <InputLabel htmlFor="category" value="Filter by Category"
                                        className="text-yellow-600 font-bold text-lg mr-2"/>
                            <SelectInput
                                id="category"
                                className="min-w-full p-2 bg-red-900 text-red-950 rounded font-bold hover:bg-yellow-500"
                                value={selectedCategory}
                                required
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All" className="text-red-950">All</option>
                                {
                                    categories.map((category, index) => (
                                        <option value={category} key={index}
                                                className="text-red-950">{category}</option>
                                    ))
                                }
                            </SelectInput>
                        </div>

                        {
                            auth.can.product_create && (
                            <Link href={route('products.create')}
                        className="mt-2 text-yellow-600 rounded-md bg-red-950 px-4 py-4 text-center hover:bg-red-900">Add
                        a new product</Link>
                            )
                        }

                    </div>
                    <div className="mt-6">
                        <ProductsTable
                            products={products}
                            filteredProducts={filteredProducts}
                            auth={auth}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
