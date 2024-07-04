import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { setUserData } from '../Redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../assets/images/logo/logo.png';
import bgImage from '../assets/images/background/20215.jpg'; // Adjust the path accordingly
import BouncingBallLoader from '../components/Loader/BouncingBallLoader';


const LoginGoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:''
  });
  const userRole = useSelector((state) => state.user.userRole);
  const [role, setRole] = useState('user');
  useEffect(() => {
    if (userRole) {
      navigate('/home');
    }
  }, [userRole, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
      toast.error('Need to fill all fields');
    } else if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
        console.log(formData);
      axiosInstance.post('/api/auth/signup', { formData, role }).then((response) => {
        dispatch(setUserData(response.data.data));
        toast.success('Successfully signed up');
        navigate('/home');
      }).catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
    }
  };

  return (
    <>
      <style>
        {`
          .bgImage {
            background-image: url(${bgImage}); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
            background-size: cover; /* Ensures the image covers the entire element */
            background-position: center top; /* Starts the image at the top center */
            background-repeat: no-repeat; /* Prevents the image from repeating */
          }

          .button-hover-effect {
            transition: transform 0.3s ease;
          }

          .form-container {
            max-width: 500px;
            width: 100%;
           
          }

          .radio-container {
            display: flex;
            justify-content:center;
            align-items: center;
            margin-t: 1rem;
          }

          .radio-label {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-left:10px
          }

          .radio-label input {
            display: none;
          }

          .custom-radio {
            width: 20px;
            height: 20px;
            border: 2px solid white; /* Change the color as needed */
            border-radius: 50%;
            margin-right: 10px;
            position: relative;
            transition: background-color 0.3s ease;
          }

          .radio-label input:checked + .custom-radio {
            background-color: #34A853; /* Change the color as needed */
          }

          .custom-radio::after {
            content: '';
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: green;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
          }

          .radio-label input:checked + .custom-radio::after {
            display: block;
          }
        `}
      </style>
      <div className={`bgImage absolute top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center`} >
        <div className='flex items-center justify-left w-full bg-black bg-opacity-50 lg:pl-40 h-full'>
          <div className="flex-col w-full form-container rounded-md shadow sm:p-8 dark:text-white bg-black hover:bg-opacity-100 border-r hover:border-r-4 hover:border-b-4 border-redBorder">
            <div className="flex flex-col items-center mb-4">
              <img src={logo} alt="logo" className="h-20 mb-2" />
              <h2 className="mb-2 text-2xl font-semibold text-center">Create your account</h2>
            </div>
            <form noValidate="" action="" className="space-y-4" onSubmit={handleSignUp}>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm">Full Name</label>
                  <input type="text" name="name" id="name" placeholder="Enter Your Full Name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm">Email address</label>
                  <input type="email" name="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm">Password</label>
                  <input type="password" name="password" id="password" placeholder="Enter Your Password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-sm">Confirm Password</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Your Password" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
              </div>
              <div className="">
                <label className=" text-sm">Register as:</label>
                <div className="radio-container">
                  <label className="radio-label">
                    <input type="radio" name="role" value="user" checked={role === 'user'} onChange={handleRoleChange} />
                    <div className="custom-radio"></div>
                    <span>User</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="role" value="trainer" checked={role === 'trainer'} onChange={handleRoleChange} />
                    <div className="custom-radio"></div>
                    <span>Trainer</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-green-800 hover:bg-green-600 dark:text-gray-50 button-hover-effect">Sign up</button>
            </form>
            <div className="flex items-center w-full my-4">
              <hr className="w-full dark:text-gray-600" />
              <p className="px-3 dark:text-gray-400">OR</p>
              <hr className="w-full dark:text-gray-600" />
            </div>
            <div className="my-6 space-y-4">
              <button aria-label="Sign up with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md dark:border-gray-500 hover:border-white button-hover-effect">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
                </svg>
                <p>Sign up with Google</p>
              </button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-center dark:text-textColor">
                Already have an account?
                <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline"> Log in here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginGoogleAuth;



