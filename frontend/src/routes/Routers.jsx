// src/routes/Routers.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Services from '../pages/Services';
import Signup from '../pages/Signup';
import Trainers from '../pages/FindATrainer'; // Assuming this is the user-facing Trainers page
import TrainerDetails from '../pages/Trainers/TrainerDetails';
import Contact from '../pages/Contact';
import VerifyOtp from '../pages/VerifyOtp';
import Profile from '../pages/users/Profile';
import Bookings from '../pages/Trainers/Bookings'
import Experience from '../pages/Trainers/Experience'
import Slots from '../pages/Trainers/Slots'
import TrainerProfile from '../pages/Trainers/TrainerProfile';
import EditUserProfile from '../pages/users/EditUserProfile';
import ResetPassword from '../pages/ResetPassword';


// Admin imports
import Dashboard from '../pages/Admin/Dashboard';
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminTrainers from '../pages/Admin/Trainers'; // Renamed to avoid conflict
import Athletes from '../pages/Admin/Athletes';
import AdminServices from '../pages/Admin/Services'; // Renamed to avoid conflict
import AdminBookings from '../pages/Admin/Bookings'


const Routers = () => {
  const userRole = useSelector((state) => state.user.userRole);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/trainers' element={<Trainers />} />
      <Route path='/trainer/:id' element={<TrainerDetails />} />
      <Route path='/user/login' element={<Login role={'user'} />} />
      <Route path='/trainer/login' element={<Login role={'trainer'} />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/contact' element={<Contact userRole={userRole}/>} />
      <Route path='/services' element={<Services />} />
      <Route path='/verify-otp' element={<VerifyOtp />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/bookings' element={<Bookings />} />
      <Route path='/experience' element={<Experience />} />
      <Route path='/slots' element={<Slots />} />
      <Route path='/trainer-profile' element={<TrainerProfile />} />
      <Route path='/edit-userprofile' element={<EditUserProfile />} />
      <Route path='/slots' element={<Slots />} />



      {/* Admin Routes */}
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/admin/trainers' element={<AdminTrainers />} />
      <Route path='/admin/users' element={<Athletes />} />
      <Route path='/admin/services' element={<AdminServices />} />
      <Route path='/admin/bookings' element={<AdminBookings />} />
    </Routes>
  );
};

export default Routers;
