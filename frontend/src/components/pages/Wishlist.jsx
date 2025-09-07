import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../context/Authcontext.jsx';
import { loadWishlist, toggleWishlistService } from '../../utils/wishlistService.js';

const Wishlist = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { items } = await loadWishlist(user);
                setItems(items);
            } finally {
                setLoading(false);
            }
        })();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
                    <p className="mb-6 text-gray-700">Please log in to view your wishlist.</p>
                    <Link to="/login" className="px-4 py-2 bg-purple-600 text-white rounded-lg">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Your Wishlist</h1>
                    <p className="text-gray-600 mt-2">Products you saved for later</p>
                </div>

                {loading ? (
                    <div className="text-gray-600">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 shadow-sm text-center">
                        <p className="text-gray-700 mb-4">Your wishlist is empty.</p>
                        <Link to="/products" className="inline-block px-5 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg">Browse Products</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {items.map((it) => (
                            <div key={it.product} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                                    <img src={it.image} alt={it.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{it.name}</h3>
                                    <p className="text-2xl text-purple-600 font-bold mb-4">₹{Number(it.price || 0).toFixed(2)}</p>
                                    <div className="flex flex-col gap-3">
                                        <Link 
                                            to={`/products/${it.slug || ''}`} 
                                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-lg font-semibold text-center hover:from-purple-700 hover:to-amber-600 transition-all duration-300 hover:scale-105"
                                        >
                                            View Product
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                await toggleWishlistService({ _id: it.product }, user);
                                                const { items: refreshed } = await loadWishlist(user);
                                                setItems(refreshed);
                                            }}
                                            className="w-full px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 hover:border-red-400 transition-all duration-300 hover:scale-105"
                                        >
                                            Remove from Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;


