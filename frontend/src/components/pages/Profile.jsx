import React from "react";
import useAuth from "../../context/Authcontext";

export default function Profile() {
    const { user } = useAuth();
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}