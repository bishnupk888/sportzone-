import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Dashboard from '../pages/Admin/Dashboard'
import AdminLogin from '../pages/Admin/AdminLogin'
import Trainers from '../pages/Admin/Trainers'
import Athletes from '../pages/Admin/Athletes'
import Services from '../pages/Admin/Services'
import Bookings from '../pages/Admin/Bookings'





const AdminRouters = () => {
  return (
    <Routes>
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='admin/dashboard' element={<Dashboard/>} />
        <Route path='admin/trainers' element={<Trainers/>} />
        <Route path='admin/users' element={<Athletes/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/bookings' element={<Bookings/>} />
    </Routes>
  )
}

export default AdminRouters