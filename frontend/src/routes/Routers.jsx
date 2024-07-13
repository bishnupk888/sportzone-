import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../axiosInstance/axiosInstance';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import VerifyOtp from '../pages/VerifyOtp';
import ResetPassword from '../pages/ResetPassword';
import PageNotFound from '../404';
import { clearUserData } from '../redux/features/userSlice';
import UserRoutes from './UserRoutes';
import TrainerRoutes from './TrainerRoutes';
import AdminRoutes from './AdminRoutes';
import VerifyForResetPassword from '../pages/VerifyForResetPassword';

const Routers = () => {
  // const isBlocked = useSelector((state) => state.user.isBlocked);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleBlockedUser = async () => {
  //     if (isBlocked) {
  //       try {
  //         await axiosInstance.post('/api/auth/logout');
  //         console.log("call to logout");
  //         dispatch(clearUserData());
  //         navigate('/home');
  //       } catch (error) {
  //         console.error('Error logging out blocked user:', error);
  //       }
  //     }
  //   };

  //   handleBlockedUser();
  // }, [isBlocked, dispatch, navigate]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/verify-otp' element={<VerifyOtp />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/reset-password/verify-otp' element={<VerifyForResetPassword />} />


      {/* User Routes */}
      <Route path='/user/*' element={<UserRoutes />} />

      {/* Trainer Routes */}
      <Route path='/trainer/*' element={<TrainerRoutes />} />

      {/* Admin Routes */}
      <Route path='/admin/*' element={<AdminRoutes />} />

      {/* Catch All */}
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;







// import React, { useEffect } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import axiosInstance from '../axiosInstance/axiosInstance';

// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import FindTrainers from '../pages/FindATrainer'; // Assuming this is the user-facing Trainers page
// import TrainerDetails from '../pages/Trainers/TrainerDetails';
// import Contact from '../pages/Contact';
// import VerifyOtp from '../pages/VerifyOtp';
// import Profile from '../pages/users/Profile';
// import Bookings from '../pages/Trainers/Bookings'
// import Experience from '../pages/Trainers/Experience'
// import Slots from '../pages/Trainers/Slots'
// import TrainerProfile from '../pages/Trainers/TrainerProfile';
// import EditUserProfile from '../pages/users/EditUserProfile';
// import ResetPassword from '../pages/ResetPassword';
// import MyBookings from '../pages/users/MyBookings';
// import Wallet from '../pages/users/Wallet'
// import ServicesPage from '../pages/users/ServicesPage';
// import CheckoutSuccess from '../pages/users/CheckoutSuccess';
// import TrainerTransactions from '../pages/Trainers/TrainerTransactions'
// import ChatToTrainer from '../pages/users/ChatToTrainer';
// // Admin imports
// import Dashboard from '../pages/Admin/Dashboard';
// import AdminLogin from '../pages/Admin/AdminLogin';
// import AdminTrainers from '../pages/Admin/Trainers'; // Renamed to avoid conflict
// import Athletes from '../pages/Admin/Athletes';
// import AdminServices from '../pages/Admin/Services'; // Renamed to avoid conflict
// import AdminBookings from '../pages/Admin/Bookings';
// import EditTrainerProfile from '../pages/Trainers/EditTrainerProfile';
// import ViewTrainerProfile from '../pages/users/ViewTrainerDetails'; 
// import PageNotFound from '../404';

// import PrivateRoutes from './PrivateRoutes';

// import { clearUserData } from '../Redux/features/userSlice';
// import CheckoutForm from '../components/checkout/CheckoutComponent';
// // import TrainerWallet from '../pages/Trainers/TrainerWallet';
// import LoginGoogleAuth from '../pages/LoginGoogleAuth';
// import BookingDetails from '../pages/users/BookingDetails';
// import ChatComponent from '../components/chat component/ChatComponent';
// import ChatList from '../components/chat component/ChatList';


// const Routers = () => {
//   const userRole = useSelector((state) => state.user.userRole);
//   const isBlocked = useSelector((state) => state.user.isBlocked);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const handleBlockedUser = async () => {
//   //     if (isBlocked) {
//   //       try {
//   //         await axiosInstance.post('/api/auth/logout');
//   //         console.log("call to logout");
//   //         dispatch(clearUserData());
//   //         navigate('/home');
          

//   //       } catch (error) {
//   //         console.error('Error logging out blocked user:', error);
//   //       }
//   //     }
//   //   };

//   //   handleBlockedUser();
//   // }, [isBlocked]);

//   return (
//     <Routes>

//       <Route path='/' element={<Home />} />
//       <Route path='/home' element={<Home />} />
//       <Route path='/register' element={<Signup />} />
//       <Route path='/verify-otp' element={<VerifyOtp />} />
//       <Route path='/reset-password' element={<ResetPassword />} />
//       <Route path='/test-route' element={<ChatList />} />
//       <Route path='/test-route2' element={<ChatToTrainer />} />




//       <Route path='/user/login' element={<Login Role={'user'} />} />
//         <Route path='/user/*' element={<PrivateRoutes role={'user'}/>} >
//          <Route path='findtrainers' element={<FindTrainers />} />
//          <Route path='contact' element={<Contact/>} /> 
//           <Route path='trainer/:id' element={<TrainerDetails />} />
//         <Route path='services' element={<ServicesPage />} />
//         <Route path='profile' element={<Profile />} />
//         <Route path='edit-profile' element={<EditUserProfile />} />
//         <Route path='view-trainer' element={<ViewTrainerProfile/>}/>
//         <Route path='my-bookings' element={<MyBookings/>}/>
//         <Route path='wallet' element={<Wallet/>}/>
//         <Route path='checkout' element={<CheckoutForm/>}/>
//         <Route path='checkout-success' element={<CheckoutSuccess/>}/>
//         <Route path='chat' element={<ChatList/>}/>
//         <Route path='messages' element={<ChatList />} />

//         <Route path='*' element={<PageNotFound/>}/>
//       </Route>
//        <Route/>


//       <Route path='/trainer/login' element={<Login Role={'trainer'}/>} />
//       <Route path='/trainer/*' element={<PrivateRoutes role={'trainer'}/>} >
//       <Route path='bookings' element={<Bookings />} />
//       <Route path='experience' element={<Experience />} />
//       <Route path='slots' element={<Slots />} />
//       <Route path='profile' element={<TrainerProfile />} />
//       <Route path='edit-profile' element={<EditTrainerProfile/>}/>
//       <Route path='transactions' element={<TrainerTransactions/>}/>
//       <Route path='messages' element={<ChatList />} />


//       <Route path='*' element={<PageNotFound/>}/>

//       </Route>

      
      

//       {/* Admin Routes */}
//       <Route path='/admin' element={<Dashboard />} />
//       <Route path='/admin/login' element={<AdminLogin />} />
//       <Route path='/admin/dashboard' element={<Dashboard />} />
//       <Route path='/admin/trainers' element={<AdminTrainers />} />
//       <Route path='/admin/users' element={<Athletes />} />
//       <Route path='/admin/services' element={<AdminServices />} />
//       <Route path='/admin/bookings' element={<AdminBookings />} />
//       <Route path='*' element={<PageNotFound/>}/>
//     </Routes>
//   );
// };

// export default Routers;
