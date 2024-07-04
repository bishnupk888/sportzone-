// src/Layout.js
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';
import TrainerHeader from '../components/Header/trainerHeader';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import { SocketProvider } from '../context/SocketContext';
import socket from '../utils/socket';




const Layout = () => {
  const {userId,userRole} = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(userRole);

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

  const isAdminPath = location.pathname.startsWith('/admin');
  

  const renderHeader = () => {
    if (isAdminPath) {
      return <AdminSidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />;
    }
    switch (userRole) {
      case 'trainer':
        return <TrainerHeader />;
      case 'user':
        return <Header />;
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
