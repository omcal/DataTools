import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SubmissionForm from './pages/Submisssion/SubmissionForm';
import Contacts from './components/common/Contact/Contacts';
import SubmitForm from './components/Home/SupaBase/SubmitForm';
import DeleteItem from './components/Home/SupaBase/DeleteItem';
import AdminLogin from './pages/AdminLogin';
import PrivateRoute from './pages/PrivateRoute';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/submit" element={<SubmissionForm />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
                path="/admin/add"
                element={<PrivateRoute element={<SubmitForm />} />}
            />
            <Route
                path="/admin/delete"
                element={<PrivateRoute element={<DeleteItem />} />}
            />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);

export default App;
