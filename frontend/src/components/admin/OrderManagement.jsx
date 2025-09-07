import React, { useEffect, useState } from 'react';
import { Search, Filter, Eye, Edit, Truck, Package, CheckCircle, XCircle, Clock, MoreVertical, Download, RefreshCw } from 'lucide-react';
import api from '../../api/axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const orderStatuses = [
    { value: 'all', label: 'All Orders', color: 'gray', description: 'View all orders' },
    { value: 'pending', label: 'Pending', color: 'yellow', description: 'Order placed, awaiting dispatch' },
    { value: 'dispatched', label: 'Dispatched', color: 'blue', description: 'Order dispatched for delivery' },
    { value: 'delivered', label: 'Delivered', color: 'green', description: 'Order successfully delivered' },
    { value: 'cancelled', label: 'Cancelled', color: 'red', description: 'Order cancelled/rejected' }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/orders'); // You'll need to create this endpoint
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to existing endpoint if admin endpoint doesn't exist
      try {
        const fallbackResponse = await api.get('/checkout/allorders');
        setOrders(fallbackResponse.data.orders || []);
      } catch (fallbackError) {
        console.error('Error with fallback:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.orderstatus === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => 
          item.productname.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        order.address.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      
      // Use the checkout route that already exists
      const response = await api.put(`/checkout/orders/${orderId}`, { 
        orderstatus: newStatus
      });
      
      // Update local state
      const updatedOrders = orders.map(order => 
        order._id === orderId 
          ? { 
              ...order, 
              orderstatus: newStatus,
              updatedAt: new Date().toISOString()
            }
          : order
      );
      
      setOrders(updatedOrders);
      
      // Show success message
      const statusLabel = orderStatuses.find(s => s.value === newStatus)?.label;
      alert(`Order status updated to ${statusLabel} successfully!`);
      
    } catch (error) {
      console.error('Error updating order status:', error);
      alert(`Failed to update order status. Please try again.`);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'gray';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'dispatched': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const OrderModal = ({ order, onClose, onUpdateStatus }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-fade-in animate-delay-150">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-medium">Order ID:</span> {order._id}</p>
                <p><span className="font-medium">Expected Delivery:</span> {order.expectedDelivery || 'TBD'}</p>
                <p><span className="font-medium">Last Updated:</span> {order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A'}</p>
                <p><span className="font-medium">Payment:</span> {order.paytype?.toUpperCase()}</p>
                <p><span className="font-medium">Total:</span> ₹{order.total}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">{order.address.houseno}, {order.address.building}</p>
                <p className="text-gray-700">{order.address.socity}</p>
                <p className="text-gray-700">{order.address.city} - {order.address.pincode}</p>
                {order.address.phone && (
                  <p className="text-sm text-gray-600 mt-2">Phone: {order.address.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Actions</h3>
            <p className="text-sm text-gray-600 mb-4">Current Status: <span className="font-medium capitalize text-purple-600">{order.orderstatus}</span></p>
            
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {order.orderstatus === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      if (window.confirm('Dispatch this order?')) {
                        onUpdateStatus(order._id, 'dispatched');
                      }
                    }}
                    disabled={updating}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    <Truck className="h-4 w-4" />
                    <span>Dispatch</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Cancel/Reject this order? This action cannot be undone.')) {
                        onUpdateStatus(order._id, 'cancelled');
                      }
                    }}
                    disabled={updating}
                    className="flex items-center justify-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </>
              )}
              
              {order.orderstatus === 'dispatched' && (
                <button
                  onClick={() => {
                    if (window.confirm('Mark this order as delivered?')) {
                      onUpdateStatus(order._id, 'delivered');
                    }
                  }}
                  disabled={updating}
                  className="col-span-2 flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Mark as Delivered</span>
                </button>
              )}
              
              {(order.orderstatus === 'delivered' || order.orderstatus === 'cancelled') && (
                <div className="col-span-2 text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {order.orderstatus === 'delivered' ? '✅ Order completed successfully' : '❌ Order was cancelled'}
                  </p>
                </div>
              )}
            </div>
            
            {/* All Status Options (Collapsed by default) */}
            <details className="group">
              <summary className="cursor-pointer p-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                <span className="group-open:hidden">Show all status options</span>
                <span className="hidden group-open:inline">Hide status options</span>
              </summary>
              
              <div className="mt-3 space-y-2">
                {orderStatuses.filter(s => s.value !== 'all').map(status => {
                  const isCurrentStatus = order.orderstatus === status.value;
                  const isDisabled = updating || isCurrentStatus;
                  
                  return (
                    <button
                      key={status.value}
                      onClick={() => {
                        if (window.confirm(`Change order status to "${status.label}"?`)) {
                          onUpdateStatus(order._id, status.value);
                        }
                      }}
                      disabled={isDisabled}
                      className={`w-full p-3 rounded-lg border transition-all duration-300 text-left text-sm ${
                        isCurrentStatus
                          ? `border-${status.color}-500 bg-${status.color}-50 text-${status.color}-700 cursor-not-allowed`
                          : isDisabled
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : `border-gray-200 hover:border-${status.color}-300 hover:bg-${status.color}-50 hover:scale-105 cursor-pointer`
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(status.value)}
                        <span className="font-medium">{status.label}</span>
                        {isCurrentStatus && <span className="text-xs">(Current)</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </details>
            
            {updating && (
              <div className="mt-4 flex items-center justify-center space-x-2 text-purple-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                <span className="text-sm">Updating status...</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={item.image || '/placeholder.png'}
                  alt={item.productname}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.productname}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium text-purple-600">₹{item.selling_price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-fade-in animate-delay-150">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>
        
        <div className="flex items-center space-x-3 animate-fade-in animate-delay-300">
          <button
            onClick={fetchOrders}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in animate-delay-500">
        {orderStatuses.filter(s => s.value !== 'all').map((status, index) => {
          const count = orders.filter(order => order.orderstatus === status.value).length;
          return (
            <div
              key={status.value}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 bg-${status.color}-100 rounded-full`}>
                  {getStatusIcon(status.value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in animate-delay-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search orders by ID, product, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            >
              {orderStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in animate-delay-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Items</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
                  style={{ animationDelay: `${1000 + index * 50}ms` }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.orderdate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.address.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.items.length} items
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₹{order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-${getStatusColor(order.orderstatus)}-100 text-${getStatusColor(order.orderstatus)}-800`}>
                      {getStatusIcon(order.orderstatus)}
                      <span className="capitalize">{order.orderstatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {order.orderstatus === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              if (window.confirm('Dispatch this order?')) {
                                updateOrderStatus(order._id, 'dispatched');
                              }
                            }}
                            disabled={updating}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                          >
                            Dispatch
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Cancel this order?')) {
                                updateOrderStatus(order._id, 'cancelled');
                              }
                            }}
                            disabled={updating}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      
                      {order.orderstatus === 'dispatched' && (
                        <button
                          onClick={() => {
                            if (window.confirm('Mark as delivered?')) {
                              updateOrderStatus(order._id, 'delivered');
                            }
                          }}
                          disabled={updating}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                        >
                          Deliver
                        </button>
                      )}
                      
                      {(order.orderstatus === 'delivered' || order.orderstatus === 'cancelled') && (
                        <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {order.orderstatus === 'delivered' ? 'Completed' : 'Cancelled'}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default OrderManagement;
