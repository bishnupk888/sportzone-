// src/Layout.js
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Routers from '../routes/Routers';
import TrainerHeader from '../components/header/TrainerHeader';

import AdminSidebar from '../components/sidebar/AdminSidebar';

import socket from '../utils/socket';
import apiServices from '../apiServices/apiServices';



const Layout = () => {
  const {userId,userRole} = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications,setNotifications] = useState([])
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0)
  const [chatNotification, setChatNotification] = useState([])

  useEffect(() => {
    if (userId && userRole) {
        socket.connect();
        socket.emit('register', userId);

        return () => {
            socket.off('register');
            socket.disconnect();
        };
    }
}, [userId, userRole]);

useEffect(() => {
  socket.on('notification', (data) => {
    setNotifications((prevState) => [data, ...prevState]);
    setUnreadNotificationCount((prevCount) => prevCount + 1);
  });

  return () => {
    socket.off('notification');
  };
}, []);

useEffect(()=>{
  if(userId && userRole){
  apiServices.getNotifications(userId)
  .then((response)=>{
    setNotifications(response.data.data)
  })
  .catch((error)=>{
    console.error(error)
  })
  }
},[userId])

useEffect(() => {
   const unreadCount = notifications.filter(notification => !notification.isRead).length;
   setUnreadNotificationCount(unreadCount)
}, [notifications,userId])
// useEffect(()=>{
//   const unreadMessages = 
// },[])


// const unreadNotificationCount = notifications.filter(notification => !notification.isRead).length;

const isAdminPath = location.pathname.startsWith('/admin');
  

  const renderHeader = () => {
    if (isAdminPath) {
      return <AdminSidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}  />;
    }
    switch (userRole) {
      case 'trainer':
        return <TrainerHeader notifications={notifications} unreadNotificationCount={unreadNotificationCount} setUnreadNotificationCount={setUnreadNotificationCount}/>;
      case 'user':
        return <Header notifications={notifications} unreadNotificationCount={unreadNotificationCount} setUnreadNotificationCount={setUnreadNotificationCount} />;
      default:
        return <Header />;
    }
  };

  return (
   
      <div className="flex flex-col min-h-screen">
        {renderHeader()}
        <div className="flex flex-grow"> {/* Adjust mt-16 based on your header height */}
          <main className={`flex-grow transition-all duration-300 ease-in-out ${isAdminPath ? (isSidebarOpen ? 'ml-64' : 'ml-20') : ''}`}>
            <Routers />
          </main>
        </div>
        {!isAdminPath && (
          <footer className="transition-all duration-300 ease-in-out">
            <Footer />
          </footer>
        )}
      </div>
  );
};

export default Layout;


