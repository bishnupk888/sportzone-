import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoutes from './PrivateRoutes';
import Bookings from '../pages/Trainers/Bookings';
import Experience from '../pages/Trainers/Experience';
import Slots from '../pages/Trainers/Slots';
import TrainerProfile from '../pages/Trainers/TrainerProfile';
import TrainerTransactions from '../pages/Trainers/TrainerTransactions';
import ChatList from '../components/chat component/ChatList';
import PageNotFound from '../404';
import CreateVideocallSession from '../pages/Trainers/CreateVideocallSession';
import VideoCall from '../pages/Trainers/VideoCall';
import AllNotifications from '../pages/AllNotifications';

const TrainerRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login Role={'trainer'} />} />
            <Route path='/*' element={<PrivateRoutes role={'trainer'} />}>
                <Route path='bookings' element={<Bookings />} />
                <Route path='experience' element={<Experience />} />
                <Route path='slots' element={<Slots />} />
                <Route path='profile' element={<TrainerProfile />} />
                <Route path='transactions' element={<TrainerTransactions />} />
                <Route path='messages' element={<ChatList />} />
                <Route path='create-videocall' element={<CreateVideocallSession />} />
                <Route path='videocall' element={<VideoCall />} />
                <Route path='notifications' element={< AllNotifications/>} />





                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    );
};

export default TrainerRoutes;
