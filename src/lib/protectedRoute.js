import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!window.localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? (
        children
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRoute;