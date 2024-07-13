import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../assets/images/logo/logo.png';
import bgImage from '../assets/images/background/20215.jpg'; // Adjust the path accordingly
import { useGoogleLogin } from '@react-oauth/google';
import BouncingBallLoader from '../components/loader/BouncingBallLoader'
import apiServices from '../apiServices/apiServices';

// import RoleSelectModal from '../components/popupComponents/RoleSelectModal';




const Login = ({Role}) => {
  const userRole = useSelector((state) => state.user.userRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoaderActive, setLoaderActive] = useState(true)
  // const [isModalOpen,setIsModalOpen] = useState(true)
  // const [role,setRole] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:Role
  });
  


  useEffect(() => {
    if (userRole) {
      navigate('/home');
    }
  }, [userRole, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const openModal = (e) => {
  //   e.preventDefault();
  //   if (!formData.role) {
  //     setIsModalOpen(true);
  //   } else {
  //     handleSignUp(e);
  //   }
  // };

  // const handleRoleSelect = (role) => {
  //   setRole(role)
  //   setFormData({ ...formData,role:role});
  // };

  const GoogleSignIn = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleSignIn(tokenResponse),
    onFailure: tokenResponse => console.log(tokenResponse),
    cookiePolicy : 'single_host_origin',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoaderActive(true)
    if (formData.email === '' || formData.password === ''|| formData.role ==='' ) {
      toast.error('Need to fill all fields');
    } else {
      try {
      const response = await apiServices.login(formData);
      dispatch(setUserData(response.data.data));
      toast.success('Successfully logged in');
      setLoaderActive(false);
      navigate('/home');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
      setLoaderActive(false);
    }
  }
  };

  const handleGoogleSignIn = (credentialResponse) => {
    const { access_token } = credentialResponse;
    
    // Extract email using Google's userinfo endpoint
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      setLoaderActive(true)
     
      const { email } = data;
      const role = formData.role
      
      apiServices.googleSignIn(email,Role)
        .then(response => {
          dispatch(setUserData(response.data.data));
          toast.success('Successfully logged in');
          setLoaderActive(false)
          navigate('/home');
        })
        .catch(error => {
          toast.error(error.response.data.message)
          console.error('Error while signing in with Google:', error.response.data );
        });
    })
    .catch(error => {
      console.error('Error fetching userinfo:', error);
    });
  };
  

  return (
    <>
      <style>
        {`
          .bgImage {
            background-image: url(${bgImage});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }

          .button-hover-effect {
            transition: transform 0.3s ease;
          }

          .button-hover-effect:hover {
            transform: scale(1.05);
          }
        `}
      </style>
      <div className="bgImage fixed top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center" style={{ zIndex: 1000 }}>
        <div className='flex items-center justify-center lg:justify-start md:justify-start w-full min-h-screen bg-black bg-opacity-50 lg:pl-[15%] md:pl-[15%] '>
          <div className="flex-col w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:text-white bg-black hover:bg-opacity-100 border hover:border-r-4 hover:border-b-4 border-redBorder button-hover-effect">
            <div className="flex flex-col items-center">
              <img src={logo} alt="logo" className="h-24 mb-4" />
              <h2 className="mb-3 lg:text-3xl md:text-2xl text-lg font-semibold text-center">Login to <span className='text-bold'>{Role ? (Role === 'trainer' ? 'trainer' : 'user'):'your' }</span> account</h2>
              <br />
            </div>
            <form noValidate="" action="" className="space-y-8" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm">Email address</label>
                  <input type="email" name="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <a rel="noopener noreferrer" href="/reset-password" className="text-xs hover:underline dark:text-textColor">Forgot password?</a>
                  </div>
                  <input type="password" name="password" id="password" placeholder="Enter Your Password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
              </div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-green-800 hover:bg-green-600 dark:text-gray-50 button-hover-effect">Sign in</button>
            </form>
            <div className="flex items-center w-full my-4">
              <hr className="w-full dark:text-gray-600" />
              <p className="px-3 dark:text-gray-400">OR</p>
              <hr className="w-full dark:text-gray-600" />
            </div>
            <div className="my-6 space-y-4 ">
              
                  <button onClick={() => GoogleSignIn()} aria-label="Login with Google"   className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md dark:border-gray-500 hover:border-white button-hover-effect">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
                      <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
                      <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
                      <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
                    </svg>
                    <p>Login with Google</p>
                  </button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-center dark:text-textColor">
                Don't have an account? <span className="focus:underline hover:underline" > <Link to={'/register'}>Sign up here</Link></span>
              </p>
            </div>
          </div>
          <div className='flex flex-col w-full items-center justify-center hidden lg:flex md:flex bg- '>
            <h1 className='bg-clip-text text-transparent bg-gradient-to-t from-black via-gray-300 to-white lg:text-[50px] md:text-[30px] font-bold fade-in '>Welcome Back,</h1>
            <h1 className='bg-clip-text text-transparent bg-gradient-to-t from-black via-gray-300 to-white lg:text-[40px] md:text-[20px] font-bold fade-in '>{Role ? (Role === 'trainer' ? 'TRAINER' : 'ATHLETE') : (role ? (role === 'trainer' ? 'TRAINER' : 'ATHLETE') : '')}
            </h1>

          </div>
        </div>
      </div>
      
      
      
    </>
  );
}

export default Login;
