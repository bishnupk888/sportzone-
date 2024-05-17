import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Services from '../pages/Services'
import Signup from '../pages/Signup'
import Trainers from '../pages/Trainers/Trainers'
import TrainerDetails from '../pages/Trainers/TrainerDetails'

import {Routes, Route} from 'react-router-dom'
import Contact from '../pages/Contact'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/trainers' element={<Trainers/>} />
        <Route path='/trainer/:id' element={<TrainerDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/services' element={<Services/>} />

    </Routes>
  )
}

export default Routers