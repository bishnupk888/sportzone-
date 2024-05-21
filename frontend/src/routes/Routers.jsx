import React from 'react'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Services from '../pages/Services'
import Signup from '../pages/Signup'
import Trainers from '../pages/Trainers/Trainers'
import TrainerDetails from '../pages/Trainers/TrainerDetails'
import AdminLogin from '../pages/Admin/AdminLogin'
import Contact from '../pages/Contact'
import VerifyOtp from '../pages/VerifyOtp'
import Profile from '../pages/users/Profile'

const Routers = () => {
  return (
  // <Router>
<Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/trainers' element={<Trainers/>} />
        <Route path='/trainer/:id' element={<TrainerDetails />} />
        <Route path='/user/login' element={<Login role={'user'}/>} />
        <Route path='/trainer/login' element={<Login role={'trainer'}/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/profile' element={<Profile/>}/> 

    </Routes>
  // </Router>
    
  )
}

export default Routers