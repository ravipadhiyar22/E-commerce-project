import React from 'react'
import useAuth from '../context/Authcontext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredrole }) {

    const { user, loading } = useAuth();

    //check if loading is true than load page
    if (loading) return <p>loading...</p>

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (requiredrole && user?.role != requiredrole) {
        return <Navigate to="/" replace />;
    }
    return children;

}

export default ProtectedRoute;























// import React from 'react'
// import useAuth from '../context/Authcontext'
// import { Navigate } from "react-router-dom"
// function ProtectedRoute({ children, requiredrole }) {

//     const { user, loading } = useAuth();

//     if (loading) return <p>loading...</p>


//     if (!user) return <Navigate to="/login" />

//     if(requiredrole && user.role!=requiredrole){
//         return <Navigate to="/"/>
//     }

//     return children


// }

// export default ProtectedRoute
