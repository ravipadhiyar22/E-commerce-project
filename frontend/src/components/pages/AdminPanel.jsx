import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

export default function AdminPanel() {
    return (
        <div className="p-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                <li>/</li>
                <li><Link to="/admin" className="hover:text-purple-600">admin</Link></li>
                <li>/</li>
                <li><NavLink className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "hover:text-purple-600 " : "hidden"}`} to="/admin/products">Products</NavLink></li>
                <li> <NavLink className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "hover:text-purple-600" : "hidden"}`} to="/admin/addproduct">Add Product</NavLink></li>

                {/* <li className="text-gray-900">{product.name}</li> */}
            </ol>
            <div className="min-h-[70vh] grid grid-cols-12 gap-4 p-4">
                <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Admin</h2>
                    <nav className="flex flex-col gap-2">
                        <NavLink className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`} to="/admin">Dashboard</NavLink>
                        <NavLink className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`} to="/admin/products">Products</NavLink>
                        <NavLink className={({ isActive }) => `px-3 py-2 rounded ${isActive ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`} to="/admin/addproduct">Add Product</NavLink>
                    </nav>
                </aside>
                <section className="col-span-12 md:col-span-9 lg:col-span-10">
                    <div className="bg-white rounded shadow p-4">
                        <Outlet />
                    </div>
                </section>
            </div>


        </div>
    );
}