import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
    const adminPassword = "admin"; // Password change it

    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage for the isAuthenticated flag
        const storedAuth = localStorage.getItem('isAdminAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setShowPasswordPrompt(false);
        } else {
            if (showPasswordPrompt) {
                const password = window.prompt('Enter admin password:');
                if (password === adminPassword) {
                    setIsAuthenticated(true);
                    setShowPasswordPrompt(false);
                    // Store the authentication flag in localStorage
                    localStorage.setItem('isAdminAuthenticated', 'true');
                } else {
                    navigate('/admin/login', { replace: true });
                }
            }
        }
    }, [showPasswordPrompt, adminPassword, navigate]);

    if (showPasswordPrompt) {
        return null;
    }

    return isAuthenticated ? <Component {...rest} /> : null;
};

export default PrivateRoute;
