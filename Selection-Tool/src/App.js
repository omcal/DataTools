import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SubmissionForm from './pages/Submisssion/SubmissionForm';
import Contacts from './components/common/Contact/Contacts';
import SubmitForm from './components/Home/SupaBase/SubmitForm';
import DeleteItem from './components/Home/SupaBase/DeleteItem';
import AdminLogin from './pages/Auth/AdminLogin';
import PrivateRoute from './pages/Auth/PrivateRoute';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmissionForm />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
                path="/admin/add"
                element={<PrivateRoute component={SubmitForm} />}
            />
            <Route
                path="/admin/delete"
                element={<PrivateRoute component={DeleteItem} />}
            />
            <Route path="*" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

export default App;
