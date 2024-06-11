import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Routers from '../routes/Routers';
import TrainerHeader from '../components/Header/trainerHeader';
import AdminSidebar from '../components/Sidebar/AdminSidebar';

const Layout = () => {
  const userRole = useSelector((state) => state.user.userRole);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(userRole);

  const isAdminPath = location.pathname.startsWith('/admin');
  const notFoundPath = location.pathname.endsWith('/');

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
    <div className="flex flex-col min-h-screen">
      {renderHeader()}
      <div className="flex flex-grow "> {/* Adjust mt-16 based on your header height */}
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
