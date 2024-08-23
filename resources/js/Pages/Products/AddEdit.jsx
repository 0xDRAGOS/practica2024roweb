import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {useState} from "react";

export default function AddEdit({ product, categories, images, auth }) {
    const {data, setData, post, errors, processing} = useForm({
        name: product?.name || '',
        category_id: product?.category_id || '',
        price: product?.price || '',
        description: product?.description || '',
        images: [],
        deleted_images: []
    });

    console.log(images);

    const [currentImages, setCurrentImages] = useState(images || []);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('category_id', data.category_id);
        formData.append('price', data.price);
        formData.append('description', data.description);

        currentImages.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        let productRoute = product ? route('products.store', [product.id]) : route('products.store');
        post(productRoute);
    };

    const deleteProductImage = (id) => {
        let updatedImages = currentImages.filter(function( obj ){
            return obj.id !== id;
        });
        setCurrentImages(updatedImages);
        setData('deleted_images', [...data.deleted_images, id]);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-yellow-600 leading-tight">{product ? 'Edit product' : 'Add product'}</h2>}
        >
            <Head title={product ? 'Edit product' : 'Add product'}/>
            <div>
                <div className="py-4 px-4">
                    <div className="mt-6">
                        <div className="flex justify-center flex-wrap">
                            {
                                currentImages.map((image) => (
                                    <div key={image.id} className="flex flex-col items-center border-b border-yellow-700">
                                        <img src={$image.url} alt="" className="w-full h-64 object-contain px-2 py-2"/>
                                        <button
                                            onClick={() => deleteProductImage(image.id)}
                                            className="font-medium text-yellow-600 rounded-md bg-red-950 px-2 py-2 text-center hover:bg-red-900 mx-1 mb-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            }

                        </div>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="product_image_path" value="Image"/>
                                <TextInput
                                    id="image_path"
                                    type="file" name="image"
                                    className="mt-1 block w-full"
                                    onChange={e => setData('images', Array.from(e.target.files))}
                                    multiple
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>

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
