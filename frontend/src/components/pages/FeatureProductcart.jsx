import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';


function FeatureProductcart({ product }) {
    return (
        <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    Sale
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>

                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.averageRating || 0)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.numReviews || 0})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">₹{product.selling_price}</span>
                        <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
                    </div>
                </div>

                <Link
                    to={`/products/${product.slug}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-amber-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Add to Cart</span>
                </Link>
            </div>
        </div>
    )
}

export default FeatureProductcart;
