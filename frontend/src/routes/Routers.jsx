import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../axiosInstance/axiosInstance';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import VerifyOtp from '../pages/VerifyOtp';
import ResetPassword from '../pages/ResetPassword';
import PageNotFound from '../404';
import { clearUserData } from '../redux/features/userSlice';
import UserRoutes from './UserRoutes';
import TrainerRoutes from './TrainerRoutes';
import AdminRoutes from './AdminRoutes';
import VerifyForResetPassword from '../pages/VerifyForResetPassword';
import InvoiceComponent from '../components/pdfComponents/InvoiceComponent';

const Routers = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/verify-otp' element={<VerifyOtp />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/reset-password/verify-otp' element={<VerifyForResetPassword />} />
      <Route path='/invoice' element={<InvoiceComponent />} />



      
      <Route path='/user/*' element={<UserRoutes />} />

   
      <Route path='/trainer/*' element={<TrainerRoutes />} />

     
      <Route path='/admin/*' element={<AdminRoutes />} />

     
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;



