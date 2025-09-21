import React, { useState } from "react";
import useAuth from "../../../context/Authcontext";
import api from "../../../api/axios";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { User, Mail, Shield, LogOut, Package, Edit3, Camera } from "lucide-react";

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handlelogout() {
        try {
            setIsLoggingOut(true);
            await api.post("/users/logout");
            alert("Logout successful!");
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
            alert("Logout failed. Please try again.");
        } finally {
            setIsLoggingOut(false);
        }
    }

    const profileMenuItems = [
        { path: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
        { path: "/profile/orders", label: "Order History", icon: <Package className="h-5 w-5" /> }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in animate-delay-150 hover:shadow-xl transition-shadow duration-300">
                            {/* Profile Header */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 hover:scale-105 transition-transform duration-300">
                                        {user.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300">
                                        <Camera className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.username}</h2>
                                <p className="text-gray-600 text-sm">{user.email}</p>
                                <div className="mt-3">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                        user.role === 'admin' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        <Shield className="h-3 w-3 mr-1" />
                                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Profile Navigation */}
                            <nav className="space-y-2">
                                {profileMenuItems.map((item, index) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => 
                                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                                                isActive 
                                                    ? 'bg-purple-100 text-purple-700 shadow-md' 
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`
                                        }
                                        style={{ animationDelay: `${300 + index * 100}ms` }}
                                    >
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handlelogout}
                                    disabled={isLoggingOut}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in animate-delay-600"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in animate-delay-300 hover:shadow-xl transition-shadow duration-300">
                            {/* Profile Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in animate-delay-400">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-purple-200 rounded-full">
                                            <User className="h-6 w-6 text-purple-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-purple-700">Username</p>
                                            <p className="text-lg font-bold text-purple-900">{user.username}</p>
                                        </div>
                                    </div>
                                    {/* <button className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1 hover:scale-105 transition-all duration-300">
                                        <Edit3 className="h-4 w-4" />
                                        <span>Edit</span>
                                    </button> */}
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in animate-delay-500">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-blue-200 rounded-full">
                                            <Mail className="h-6 w-6 text-blue-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-blue-700">Email</p>
                                            <p className="text-lg font-bold text-blue-900">{user.email}</p>
                                        </div>
                                    </div>
                                    {/* <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 hover:scale-105 transition-all duration-300">
                                        <Edit3 className="h-4 w-4" />
                                        <span>Edit</span>
                                    </button> */}
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in animate-delay-600">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-green-200 rounded-full">
                                            <Shield className="h-6 w-6 text-green-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-green-700">Account Type</p>
                                            <p className="text-lg font-bold text-green-900 capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <span className="text-green-600 text-sm font-medium">✓ Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Content Area */}
                            <div className="animate-fade-in animate-delay-700">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}