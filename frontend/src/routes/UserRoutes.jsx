import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoutes from './PrivateRoutes';
import FindTrainers from '../pages/FindATrainer';
import Contact from '../pages/Contact';
import Profile from '../pages/users/Profile';
import EditUserProfile from '../pages/users/EditUserProfile';
import MyBookings from '../pages/users/MyBookings';
import Wallet from '../pages/users/Wallet';
import ServicesPage from '../pages/users/ServicesPage';
import CheckoutForm from '../components/checkout/CheckoutComponent';
import CheckoutSuccess from '../pages/users/CheckoutSuccess';
import ChatList from '../components/chat component/ChatList';
import PageNotFound from '../404';
import ViewTrainerProfile from '../pages/users/ViewTrainerDetails';
import ChatToTrainer from '../pages/users/ChatToTrainer'
import VideoCall from '../pages/users/VideoCall';
import JoinVideocall from '../pages/users/JoinVideocall';
import AllNotifications from '../pages/AllNotifications';
import PaymentSuccess from '../components/checkout/PaymentSucces';
import CheckoutFailure from '../pages/users/CheckoutFailure';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login Role={'user'} />} />
            <Route path='/*' element={<PrivateRoutes role={'user'} />}>
                <Route path='findtrainers' element={<FindTrainers />} />
                <Route path='contact' element={<Contact />} />
                <Route path='services' element={<ServicesPage />} />
                <Route path='profile' element={<Profile />} />
                <Route path='edit-profile' element={<EditUserProfile />} />
                <Route path='view-trainer/:id' element={<ViewTrainerProfile />} />
                <Route path='my-bookings' element={<MyBookings />} />
                <Route path='wallet' element={<Wallet />} />
                <Route path='checkout' element={<CheckoutForm />} />
                <Route path='checkout-success' element={<CheckoutSuccess />} />
                <Route path='checkout-failure' element={<CheckoutFailure />} />
                <Route path="payment-success" element={<PaymentSuccess />} />
                <Route path='chat' element={<ChatToTrainer/>} />
                <Route path='messages' element={<ChatList />} />
                <Route path='joinvideocall' element={<JoinVideocall />} />
                <Route path='videocall' element={<VideoCall />} />
                <Route path='notifications' element={< AllNotifications/>} />

                
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
