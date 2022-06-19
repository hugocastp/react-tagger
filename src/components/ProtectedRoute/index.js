import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('USER_TOKEN');

    if (!isAuthenticated) {
        return <Navigate to={{ pathname: '/login' }} />;
    }
    return children
}

export default ProtectedRoute;