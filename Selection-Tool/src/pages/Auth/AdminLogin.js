// ./pages/AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const adminPassword = 'admin'; // Replace this with the actual admin password

        if (password === adminPassword) {
            window.location.href = '/admin/add';
        } else {
            setError('Incorrect password. Please try again.');
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AdminLogin;
