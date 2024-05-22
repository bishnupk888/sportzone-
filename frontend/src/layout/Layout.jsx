import React from 'react'
import { useSelector } from 'react-redux';

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers'
import AdminHeader from '../components/Header/AdminHeader';
import TrainerHeader from '../components/Header/trainerHeader' // Make sure the import matches the component name

const Layout = () => {
  const userRole = useSelector((state) => state.user.userRole);
 
  console.log(userRole);
  const renderHeader = () => {

    if (location.pathname.startsWith('/admin')) {
      return <AdminHeader />;
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
    <>
      {renderHeader()}
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
