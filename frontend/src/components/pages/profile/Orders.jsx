import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Package, Truck, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import api from "../../../api/axios";
function OrderCard({ order, onRefresh }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="h-4 w-4" />;
            case 'dispatched': return <Truck className="h-4 w-4" />;
            case 'delivered': return <CheckCircle className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'yellow';
            case 'dispatched': return 'blue';
            case 'delivered': return 'green';
            case 'cancelled': return 'red';
            default: return 'gray';
        }
    };

    const getStatusProgress = (status) => {
        const statuses = ['pending', 'dispatched', 'delivered'];
        const currentIndex = statuses.indexOf(status);
        return currentIndex >= 0 ? ((currentIndex + 1) / statuses.length) * 100 : 0;
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-4 gap-2">
                <div>
                    <p className="font-semibold text-gray-900">Order #{order._id.slice(-8)}</p>
                    <p className="text-xs text-gray-500">
                        Date: {new Date(order.orderdate).toLocaleDateString()} • Expected: {order.expectedDelivery || 'TBD'}
                    </p>
                    {order.updatedAt && (
                        <p className="text-xs text-gray-400">
                            Last Updated: {new Date(order.updatedAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 text-gray-700">
                    <p><span className="font-semibold">Total:</span> ₹{order.total}</p>
                    <p><span className="font-semibold">Items:</span> {order.items.length}</p>
                    <p><span className="font-semibold">Payment:</span> {order.paytype?.toUpperCase()}</p>
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
                                    to={`/products/${item.productid?.slug || item.slug}`}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-gray-700"
                                >
                                    <Eye className="h-3 w-3 inline mr-1" />
                                    View Product
                                </Link>
                                <button className="px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 hover:scale-105 transition-all duration-300">
                                    <RefreshCw className="h-3 w-3 inline mr-1" />
                                    Reorder
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
                <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">
                        Deliver to: {order.address.city} - {order.address.pincode}
                    </p>
                    <p className="text-xs text-gray-400">
                        {order.address.houseno}, {order.address.building}, {order.address.socity}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = async (showRefreshing = false) => {
        try {
            if (showRefreshing) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            
            const response = await api.get("checkout/allorders");
            setOrders(response.data.orders || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleRefresh = () => {
        fetchOrders(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 animate-fade-in animate-delay-150">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">Order History</h1>
                    <p className="text-sm text-gray-600">
                        Track your recent orders, manage returns, and reorder items easily.
                    </p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order, index) => (
                        <div
                            key={order._id}
                            style={{ animationDelay: `${300 + index * 100}ms` }}
                        >
                            <OrderCard order={order} onRefresh={handleRefresh} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 animate-fade-in animate-delay-500">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No orders yet.</p>
                    <p className="text-gray-400 text-sm mb-6">Start shopping to see your orders here!</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300"
                    >
                        <Package className="h-5 w-5" />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
