import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPriveateRoute from '../routes/AdminPrivateRoute'
import Dashboard from '../pages/Admin/Dashboard';
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminTrainers from '../pages/Admin/Trainers';
import Athletes from '../pages/Admin/Athletes';
import AdminServices from '../pages/Admin/Services';
import AdminBookings from '../pages/Admin/Bookings';
import PageNotFound from '../404';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AdminLogin />} />
            <Route path='/login' element={<AdminLogin />} />
            <Route path='/*' element={<AdminPriveateRoute role={'admin'} />} >
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='trainers' element={<AdminTrainers />} />
                <Route path='users' element={<Athletes />} />
                <Route path='services' element={<AdminServices />} />
                <Route path='bookings' element={<AdminBookings />} />
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
