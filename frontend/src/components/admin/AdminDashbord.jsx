import React, { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, TrendingUp, Eye, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

function AdminDashbord() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0,
        pendingOrders: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch orders for statistics
            const ordersResponse = await api.get('/checkout/allorders');
            const orders = ordersResponse.data.orders || [];
            
            // Fetch products count
            const productsResponse = await api.get('/products');
            const products = productsResponse.data.products || [];

            // Calculate statistics
            const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
            const pendingOrders = orders.filter(order => order.orderstatus === 'pending').length;
            
            setStats({
                totalOrders: orders.length,
                totalProducts: products.length,
                totalRevenue,
                pendingOrders
            });

            // Get recent orders (last 5)
            setRecentOrders(orders.slice(0, 5));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: <ShoppingCart className="h-8 w-8" />,
            color: 'blue',
            change: '+12%'
        },
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: <Package className="h-8 w-8" />,
            color: 'green',
            change: '+5%'
        },
        {
            title: 'Total Revenue',
            value: `₹${stats.totalRevenue.toLocaleString()}`,
            icon: <TrendingUp className="h-8 w-8" />,
            color: 'purple',
            change: '+18%'
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: <Users className="h-8 w-8" />,
            color: 'orange',
            change: '-3%'
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="animate-fade-in animate-delay-150">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animate-delay-300">
                {statCards.map((stat, index) => (
                    <div
                        key={stat.title}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                <p className={`text-sm mt-1 ${
                                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {stat.change} from last month
                                </p>
                            </div>
                            <div className={`p-3 bg-${stat.color}-100 rounded-full text-${stat.color}-600`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in animate-delay-800">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/admin/addproduct"
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 hover:scale-105 transition-all duration-300"
                    >
                        <Plus className="h-6 w-6 text-purple-600" />
                        <span className="font-medium text-gray-900">Add New Product</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-300"
                    >
                        <Eye className="h-6 w-6 text-blue-600" />
                        <span className="font-medium text-gray-900">View All Orders</span>
                    </Link>
                    <Link
                        to="/admin/products"
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all duration-300"
                    >
                        <Package className="h-6 w-6 text-green-600" />
                        <span className="font-medium text-gray-900">Manage Products</span>
                    </Link>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in animate-delay-1000">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <Link
                        to="/admin/orders"
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:scale-105 transition-all duration-300"
                    >
                        View All
                    </Link>
                </div>
                
                {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                            <div
                                key={order._id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                style={{ animationDelay: `${1100 + index * 100}ms` }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                    <div>
                                        <p className="font-medium text-gray-900">Order #{order._id.slice(-8)}</p>
                                        <p className="text-sm text-gray-600">{order.items.length} items • {order.address.city}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">₹{order.total}</p>
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                        order.orderstatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.orderstatus === 'delivered' ? 'bg-green-100 text-green-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {order.orderstatus}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8">No recent orders</p>
                )}
            </div>
        </div>
    )
}

export default AdminDashbord;
