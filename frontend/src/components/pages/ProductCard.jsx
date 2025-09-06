import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../api/axios.js"
import { Star, ShoppingBag, Heart } from 'lucide-react';
import useAuth from '../../context/Authcontext.jsx';
import { loadWishlist, toggleWishlistService } from '../../utils/wishlistService.js';


function ProductCard({ product, viewMode }) {
    const { user } = useAuth();
    const [wishIds, setWishIds] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { ids } = await loadWishlist(user);
                setWishIds(ids);
            } catch (e) { }
        })();
    }, [user]);

    return (
        <div>
            <div
                key={product.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${viewMode === 'list' ? 'flex' : ''
                    }`}
            >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : ''}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`${viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'} object-cover group-hover:scale-110 transition-transform duration-300`}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-2">
                        {(
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                New
                            </span>
                        )}
                        {product.isSale && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Sale
                            </span>
                        )}
                    </div>

                    {/* Wishlist */}
                    <button
                        type="button"
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            try {
                                const { ids } = await toggleWishlistService(product, user);
                                setWishIds(ids);
                            } catch (e2) { }
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                    >
                        <Heart className={`h-4 w-4 ${wishIds.includes(String(product._id || product.id || product.slug)) ? 'text-red-500' : ''}`} />
                    </button>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(product.averageRating || 0)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                            {(product.numReviews || 0) > 0
                                ? `${(product.averageRating || 0).toFixed ? (Number(product.averageRating).toFixed(1)) : Number(product.averageRating || 0)} • ${product.numReviews} review${product.numReviews > 1 ? 's' : ''}`
                                : 'No reviews yet'}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-purple-600">₹{product.selling_price}</span>
                            {product.price && (
                                <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={`flex gap-2 ${viewMode === 'list' ? 'justify-end' : ''}`}>
                        <Link
                            to={`/products/${product.slug}`}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-amber-600 transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span>Add to Cart</span>
                        </Link>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProductCard
