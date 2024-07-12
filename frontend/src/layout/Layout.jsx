// src/Layout.js
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Routers from '../routes/Routers';
import TrainerHeader from '../components/header/TrainerHeader';

import AdminSidebar from '../components/sidebar/AdminSidebar';
import { SocketProvider } from '../context/SocketContext';
import socket from '../utils/socket';
import apiServices from '../apiServices/apiServices';



const Layout = () => {
  const {userId,userRole} = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications,setNotifications] = useState([])

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

useEffect(()=>{
  socket.on('notification',(data)=>{
    console.log("notification data ==",data);
    setNotifications((prevState)=>{
      return [
        ...prevState,
        data
      ]
    })
  })
  return ()=>{
    socket.off('notification')
  }
},[])

useEffect(()=>{
  apiServices.getNotifications(userId)
  .then((response)=>{
    console.log("notifications response : ",response.data.data)
    setNotifications(response.data.data)
  })
  .catch((error)=>{
    console.error(error)
  })
},[userId])


  const isAdminPath = location.pathname.startsWith('/admin');
  

  const renderHeader = () => {
    if (isAdminPath) {
      return <AdminSidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />;
    }
    switch (userRole) {
      case 'trainer':
        return <TrainerHeader notifications={notifications} />;
      case 'user':
        return <Header notifications={notifications} />;
      default:
        return <Header />;
    }
  };

  return (
    <SocketProvider>
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
    </SocketProvider>
  );
};

export default Layout;




// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
// import Routers from '../routes/Routers';
// import TrainerHeader from '../components/Header/trainerHeader';
// import AdminSidebar from '../components/Sidebar/AdminSidebar';

// const Layout = () => {
//   const {userId,userRole} = useSelector((state) => state.user);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   console.log('in layout:',userRole,userId);

//   const isAdminPath = location.pathname.startsWith('/admin');
  
//   const renderHeader = () => {
//     if (isAdminPath) {
//       return <AdminSidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />;
//     }
//     switch (userRole) {
//       case 'trainer':
//         return <TrainerHeader />;
//       case 'user':
//         return <Header />;
//       default:
//         return <Header />;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {renderHeader()}
//       <div className="flex flex-grow "> {/* Adjust mt-16 based on your header height */}
//         <main className={`flex-grow transition-all duration-300 ease-in-out ${isAdminPath ? (isSidebarOpen ? 'ml-64' : 'ml-20') : ''}`}>
//           <Routers />
//         </main>
//       </div>
//       {!isAdminPath && (
//         <footer className="transition-all duration-300 ease-in-out">
//           <Footer />
//         </footer>
//       )}
//     </div>
//   );
// };

// export default Layout;
