import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [deleteload, setdeleteload] = useState(false);
    async function fetchProducts() {
        setLoading(true);
        setError("");
        try {
            const res = await api.get("/products/allproduct");
            setProducts(res.data.products || []);
        } catch (err) {
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    }

    const [popup, setpopup] = useState("");
    useEffect(() => {
        fetchProducts();
    }, [popup]);

    const [showpopup, setshowpopup] = useState(false);

    async function handleDelete(id) {
        const ok = window.confirm("Are you sure you want to delete this product?")
        if (!ok) return;
        try {
            setdeleteload(true);
            setshowpopup(true);
            setpopup("loading...")
            const res = await api.delete(`/products/deleteproduct/${id}`);
            setdeleteload(false);
            setpopup(res.data.message);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        } catch (error) {
            setpopup(error?.response?.data?.message);
            setshowpopup(true);
            setTimeout(() => {
                setshowpopup(false);
            }, 3000);
        }

    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <Link to="/admin/addproduct" className="px-3 py-2 rounded bg-purple-600 text-white">Add Product</Link>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && products.length === 0 && <p>No products.</p>}
            {showpopup && (
                <div className="fixed top-20 right-20 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
                    {popup}
                </div>
            )}
            {!loading && products.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left border-b">
                                <th className="p-2">Image</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">
                                        {p.image ? (
                                            <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-100 rounded" />
                                        )}
                                    </td>
                                    <td className="p-2 font-medium">{p.name}</td>
                                    <td className="p-2">${p.selling_price ?? p.price}</td>
                                    <td className="p-2">{p.stock}</td>
                                    <td className="p-2 flex gap-2">
                                        <Link to={`/admin/products/update/${p._id}`} className="px-2 py-1 rounded bg-amber-500 text-white">Edit</Link>
                                        <button onClick={() => handleDelete(p._id)} className="px-2 py-1 rounded bg-red-600 text-white">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Side popup */}

                </div>
            )}
        </div>
    );
}


