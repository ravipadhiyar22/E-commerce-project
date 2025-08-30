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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((it) => (
                            <div key={it.product} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="aspect-video bg-gray-100">
                                    <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-900">{it.name}</h3>
                                    <p className="mt-1 text-purple-600 font-bold">${Number(it.price || 0).toFixed(2)}</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <Link to={`/products/${it.slug || ''}`} className="px-4 py-2 bg-gray-900 text-white rounded-lg">View</Link>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                await toggleWishlistService({ _id: it.product }, user);
                                                const { items: refreshed } = await loadWishlist(user);
                                                setItems(refreshed);
                                            }}
                                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                        >
                                            Remove
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


