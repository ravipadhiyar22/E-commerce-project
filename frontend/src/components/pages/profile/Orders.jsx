import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
function OrderCard({ order }) {
    return (
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-4 gap-2">
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Order #{order._id}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Date Placed: {order.orderdate} • Expected: {order.expectedDelivery}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300">
                    <p><span className="font-semibold">Total:</span> ₹{order.total}</p>
                    <p><span className="font-semibold">Items:</span> {order.items.length}</p>
                    <p><span className="font-semibold">Payment:</span> {order.paytype.toUpperCase()}</p>
                </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <img
                            src={item.image || "/placeholder.png"}
                            alt={item.productname}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.productname}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                ₹{item.selling_price}{" "}
                                <span className="line-through text-gray-400 text-xs ml-1">₹{item.price}</span>
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-2 mt-3">
                                <Link
                                    to={`/products/${item.productid.slug}`}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                    View Product
                                </Link>
                                <button className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90">
                                    Reorder
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                        className={`px-2 py-0.5 rounded-md text-white text-xs ${
                            order.orderstatus === "pending"
                                ? "bg-yellow-400 text-black"
                                : order.orderstatus === "delivered"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                    >
                        {order.orderstatus}
                    </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Deliver to: {order.address.houseno}, {order.address.building}, {order.address.socity},{" "}
                    {order.address.city} - {order.address.pincode}
                </p>
            </div>
        </div>
    );
}

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("checkout/allorders");
                setOrders(response.data.orders || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 ">Order history</h1>
            <p className="text-sm text-gray-600 mb-6">
                Track your recent orders, manage returns, and reorder items easily.
            </p>

            {orders.length > 0 ? (
                orders.map((order) => <OrderCard key={order._id} order={order} />)
            ) : (
                <p className="text-gray-500 text-center">No orders yet.</p>
            )}
        </div>
    );
}
