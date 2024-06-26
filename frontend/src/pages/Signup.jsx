import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { setUserData } from '../Redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../assets/images/logo/logo.png';
import bgImage from '../assets/images/background/20215.jpg'; // Adjust the path accordingly
import { useGoogleLogin } from '@react-oauth/google';
import RoleSelectModal from '../components/popupComponents/RoleSelectModal';


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loaderActive, setLoaderActive] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', 
  });

  const userRole = useSelector((state) => state.user.userRole);

  useEffect(() => {
    if (userRole) {
      navigate('/home');
    }
  }, [userRole, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GoogleSignUp = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleSignUp(tokenResponse),
    onFailure: tokenResponse => console.log(tokenResponse),
    cookiePolicy : 'single_host_origin',
  });

  const handleGoogleSignUp = (credentialResponse) => {
    console.log("handle g sign in");
    const { access_token } = credentialResponse;
    // Extract email using Google's userinfo endpoint
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("data : ",data);
      const { email } = data;
      const name = data.given_name+" "+data.family_name
      const role = formData.role
      const password = data.id 
      console.log("fullname : ",name, " role:",role, " email:",email ,"password : ",password);
     
  
      axiosInstance.post('/api/auth/google-sign-up', {name, email , password,role })
      .then((response) => {
        console.log(response);
        toast.success("OTP sent to your email");
        navigate('/verify-otp');
        setLoaderActive(false);
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

  const handleSignUp = (e) => {
    console.log("handle signup");
    e.preventDefault();
    setLoaderActive(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    

    if (!formData.name) {
      toast.error("Name is required.");
      setLoaderActive(false);
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address.");
      setLoaderActive(false);
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
      setLoaderActive(false);
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoaderActive(false);
    }

    if (!formData.role) {
      toast.error("Please select a role.");
      setLoaderActive(false);
    }

    if (
      formData.name &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      formData.role
    ) {
      console.log("call to server");
      setLoaderActive(true);
      axiosInstance.post('/api/auth/register', formData)
        .then((response) => {
          console.log(response);
          toast.success("OTP sent to your email");
          navigate('/verify-otp');
          setLoaderActive(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.error("Error during signup request", err);
        });
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    if (!formData.role) {
      setIsModalOpen(true);
    } else {
      handleSignUp(e);
    }
  };

  const handleRoleSelect = (role) => {
    setRole(role)
    setFormData({ ...formData,role:role});
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
            height: 100%; /* Set height to 100% to match the outer container */
            padding: 2rem;
          }

          .radio-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1rem;
          }

          .radio-label {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-left: 10px;
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
            background-color: green; /* Change the color as needed */
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
      <div className={`bgImage absolute top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center`}>
        <div className='flex items-center justify-left w-full bg-black bg-opacity-50 h-full'>
          <div className="flex-col w-full form-container rounded-md shadow sm:p-8 dark:text-white bg-black hover:bg-opacity-100 border-r hover:border-r-4 border-redBorder lg:ml-40 md:ml-40 lg:hover:ml-44 ">
            <div className="flex flex-col items-center mb-4">
              <img src={logo} alt="logo" className="h-20 mb-2" />
              <h2 className="mb-2 lg:text-3xl text-2xl font-semibold text-center">Create your account</h2>
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
                    <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleInputChange} />
                    <div className="custom-radio"></div>
                    <span>User</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="role" value="trainer" checked={formData.role === 'trainer'} onChange={handleInputChange} />
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
              <button onClick={() =>{ 
                 if (!formData.role) {
                  toast.error("Please select a role (register as) and try again");
                  setLoaderActive(false);
                }else{
                  GoogleSignUp()
                }
                }
                } aria-label="Sign up with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md dark:border-gray-500 hover:border-white button-hover-effect">
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
              </p>
              <p>  Login as 
                <span className="focus:underline hover:text-lg hover:text-green-500"><Link to={'/user/login'}> user </Link></span>
                <span className="focus:underline hover:text-lg hover:text-green-500"><Link to={'/trainer/login'}> trainer </Link></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInstance/axiosInstance';
// import { toast } from 'react-toastify';
// import bgImgLogin from '../assets/images/loginBG.png';
// import BouncingBallLoader from '../components/Loader/BouncingBallLoader';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [loaderActive,setLoaderActive] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: ''
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     setLoaderActive(true)
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
//     const phoneRegex = /^\d{10}$/;

//     if (!formData.name) {
//       toast.error("Name is required.");
//       setLoaderActive(false)
//     }

//     if (!emailRegex.test(formData.email)) {
//       toast.error("Enter a valid email address.");
//       setLoaderActive(false)

//     }

//     if (!phoneRegex.test(formData.phone)) {
//       toast.error("Phone number must be 10 digits.");
//       setLoaderActive(false)

//     }

//     if (!passwordRegex.test(formData.password)) {
//       toast.error("Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
//       setLoaderActive(false)
     
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match.");
//       setLoaderActive(false)

//     }

//     if (!formData.role) {
//       toast.error("Please select a role.");
//       setLoaderActive(false)

//     }

//     if (
//       formData.name &&
//       emailRegex.test(formData.email) &&
//       phoneRegex.test(formData.phone) &&
//       passwordRegex.test(formData.password) &&
//       formData.password === formData.confirmPassword &&
//       formData.role
//     ) {
//       setLoaderActive(true)
//       axiosInstance.post('/api/auth/register', formData)
//         .then((response) => {
//           console.log(response);
//           toast.success("OTP sent to your email");
//           navigate('/verify-otp');
//           setLoaderActive(false)

//         })
//         .catch((err) => {
//           toast.error(err.response.data.message);
//           console.error("Error during signup request", err);
//         });
//     }
//   };


//   return (
//     <>
//       <style>
//         {`
//           .glow {
//             box-shadow: 0 0 30px rgba(255, 0, 0, 0.4);
//             transition: box-shadow 0.3s ease;
//           }

//           .hover-glow:hover {
//             box-shadow: 0 0 30px rgba(255, 0, 0, 0.4);
//             color: white;
//             transition: box-shadow 0.3s ease, color 0.3s ease;
//             transform: scale(1.05);
//           }
//         `}
//       </style>
//       <div className='absolute top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center'>
      
//       {/* <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'> */}
//         <div className='text-center w-full max-w-[500px] mx-auto rounded-[30px] shadow-md p-5 md:p-10 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
//         {loaderActive && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-[30px]">
//           <BouncingBallLoader />
//         </div>
//       )}
//           <h1 className='text-textColor text-4xl md:text-4xl leading-9 font-bold pb-[20px]'>SIGN UP</h1>
//           <form className='py-3 ' onSubmit={handleSignup}>
//             <div className='mb-3'>
//               <input
//                 type="text"
//                 placeholder='Enter Your Name'
//                 name='name'
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
//               />
//             </div>
//             <div className='mb-3 '>
//               <input
//                 type="email"
//                 placeholder='Enter Your Email'
//                 name='email'
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
//               />
//             </div>
//             <div className='mb-3'>
//               <input
//                 type="text"
//                 placeholder='Enter Your Phone'
//                 name='phone'
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
//               />
//             </div>
//             <div className='mb-3'>
//               <input
//                 type="password"
//                 placeholder='Enter Your Password'
//                 name='password'
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
//               />
//             </div>
//             <div className='mb-3'>
//               <input
//                 type="password"
//                 placeholder='Re-Enter Password'
//                 name='confirmPassword'
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
//               />
//             </div>
//             <div className='mb-3 flex justify-center px-[20px]' >
//               <p className='text-textColor px-[20px] text-[18px]'>Register as: </p>
//               <label className='text-textColor mr-4 flex items-center'>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="trainer"
//                   checked={formData.role === 'trainer'}
//                   onChange={handleInputChange}
//                   className='appearance-none h-5 w-5 border-2 border-redBorder rounded-full checked:bg-redBorder checked:border-white focus:outline-none'
//                 />
//                 <span className='ml-2'>Trainer</span>
//               </label>
//               <label className='text-textColor flex items-center'>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="user"
//                   checked={formData.role === 'user'}
//                   onChange={handleInputChange}
//                   className='appearance-none h-5 w-5 border-2 border-redBorder rounded-full checked:bg-redBorder checked:border-white focus:outline-none'
//                 />
//                 <span className='ml-2'>User</span>
//               </label>
//             </div>
//               <button type='submit' className=' border-2 border-redBorder rounded-lg w-2/4 text-textColor text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow' style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
//                 SUBMIT
//               </button>
//           </form>
//         </div>
//       {/* </section> */}
//       </div>
//     </>
//   );
// };

// export default Signup;
