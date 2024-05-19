import React from 'react'
import AdminHeader from '../components/Header/AdminHeader'
import Footer from '../components/Footer/Footer'
import AdminRouters from '../routes/AdminRouters'


const Layout = () => {
  return (
    <>
    <AdminHeader/>
    <main>
        <AdminRouters/>
    </main>

    <Footer/>

    </>
  )
}

export default Layout