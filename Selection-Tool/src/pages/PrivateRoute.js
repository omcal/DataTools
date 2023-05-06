import React, { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
    const adminPassword = 'your_admin_password'; // Replace this with the actual admin password

    const checkAuthentication = () => {
        if (showPasswordPrompt) {
            const password = window.prompt('Enter admin password:');
            if (password === adminPassword) {
                setIsAuthenticated(true);
                setShowPasswordPrompt(false);
            }
        }
    };

    return (
        <Route
            {...rest}
            element={
                showPasswordPrompt ? null : isAuthenticated ? (
                    <Component />
                ) : (
                    <Navigate to="/admin/login" replace />
                )
            }
            onEnter={checkAuthentication}
        />
    );
};

export default PrivateRoute;
