import React from "react";
import useAuth from "../../../context/Authcontext";
import api from "../../../api/axios";
import { Outlet, useNavigate } from "react-router-dom"
import { use } from "react";
export default function Profile() {
    const { user } = useAuth();
    const usenavigate = useNavigate();
    async function handlelogout() {
        try {
            const res = api.post("/users/logout");
            alert("user logout successfull");
            usenavigate("/");
            window.location.reload();
        } catch (error) {

        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <Outlet />
            <button type="submit"
                className="px-1 py-1 bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 font-medium"
                onClick={handlelogout}>Logout</button>
        </div>
    );
}