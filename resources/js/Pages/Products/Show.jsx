import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm} from "@inertiajs/react";
import {useState} from "react";
import Pagination from "@/Components/Pagination.jsx";

export default function Show({ auth, product, images, reviews }) {
    const [likesCount, setLikesCount] = useState(product.likes_count);
    const [isLiked, setIsLiked] = useState(product.is_liked_by_user);

    const { post } = useForm();
    const handleLikeToggle = () => {
        post(`/products/${product.id}/like`, {}, {
            onSuccess: (page) => {
                setIsLiked(page.props.liked);
                setLikesCount(page.props.likes_count);
            },
            onError: (errors) => {
                console.error("Error occurred while toggling like:", errors);
            }
        });
    };
    console.log(reviews);
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
                            <div className="mt-6 flex items-center">
                                <button
                                    className={`text-red-950 bg-yellow-600 p-2 rounded mr-4 hover:bg-yellow-400 ${isLiked ? 'bg-yellow-600 text-red-950' : 'bg-yellow-600 text-red-950'}`}
                                    onClick={handleLikeToggle}
                                >
                                    {isLiked ? 'Unlike' : 'Like'}
                                </button>
                                <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-bold text-xl text-yellow-600">User Reviews</h3>
                        {reviews.data.map((review) => (
                            <div key={review.id} className="bg-red-950 text-yellow-600 p-4 mt-4 rounded-lg shadow-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="font-bold">{review.user_name}</div>
                                    <div className="text-sm text-gray-300">{new Date(review.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className="text-yellow-600">{review.comment}</div>
                            </div>
                        ))}
                    </div>
                    <Pagination links={reviews.meta.links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
