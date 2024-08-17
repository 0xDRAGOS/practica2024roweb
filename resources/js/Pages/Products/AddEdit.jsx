import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function AddEdit({ product, categories, auth }) {
    const {data, setData, post, errors, processing} = useForm({
        name: product?.name || '',
        category_id: product?.category_id || '',
        price: product?.price || '',
        description: product?.description || ''
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        let productRoute = product ? route('products.store', [product.id]) : route('products.store');
        console.log(productRoute);
        post(productRoute);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={product ? 'Edit product' : 'Add product'}/>
            <div>
                <div className="py-4 px-4">
                    <div className={'text-yellow-600 text-xl font-bold'}>{product ? 'Edit product' : 'Add product'}</div>

                    <div className="mt-6">
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Name"/>

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />

                                <InputError className="mt-2" message={errors.name}/>
                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Category"/>

                                <SelectInput
                                    id="category"
                                    className="mt-1 block w-full"
                                    value={data.category_id}
                                    required
                                    onChange={(e) => setData('category_id', e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {
                                        categories.data.map(category => (
                                            <option value={category.id} key={category.id}>{category.name}</option>
                                        ))
                                    }
                                </SelectInput>


                                <InputError className="mt-2" message={errors.category}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="price" value="Price"/>

                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.price}/>
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description"/>

                                <TextAreaInput
                                    id="description"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />

                                <InputError className="mt-2" message={errors.description}/>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
