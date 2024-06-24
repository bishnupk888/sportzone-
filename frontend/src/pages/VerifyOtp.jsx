import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import logo from '../assets/images/logo/logo.png';
import bgImage from '../assets/images/background/20215.jpg'; // Adjust the path accordingly

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/api/auth/verify-otp', { otp: otp })
      .then((response) => {
        const role = response?.data?.data?.role;
        console.log("role in verify otp : ",role);

        toast.success("Successfully verified OTP");
        navigate(`/${role}/login`);
      })
      .catch((error) => {
        toast.error("OTP is invalid or expired");
        console.error("Error while verifying OTP:", error);
      });
  };
  
  const handleResend = (e) => {
    e.preventDefault();
    axiosInstance.post('/api/auth/re-send-otp').then((response) => {
      // Handle response if needed
    });
    setTimer(60); // Reset the timer
    setShowResend(false); // Hide the resend button
  };

  return (
    <>
      <style>
        {`
          .bgImage {
            background-image: url(${bgImage}); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
            background-size: cover; /* Ensures the image covers the entire element */
            background-position: center; /* Centers the image within the element */
            background-repeat: no-repeat; /* Prevents the image from repeating */
          }

          .button-hover-effect {
            transition: transform 0.3s ease;
          }

          .button-hover-effect:hover {
            transform: scale(1.05);
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .fade-in {
            animation: fadeIn 1.5s ease-in-out;
          }
        `}
      </style>
      <div className="bgImage absolute top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center">
        <div className='flex items-center justify-center  w-full min-h-screen bg-black bg-opacity-50 '>
          <div className="flex-col w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:text-white bg-black hover:bg-opacity-100 border hover:border-r-4 hover:border-b-4 border-redBorder button-hover-effect m-10">
            <div className="flex flex-col items-center">
              <img src={logo} alt="logo" className="h-24 mb-4" />
              <h2 className="mb-3 lg:text-4xl md:text-2xl text-lg font-semibold text-center">VERIFY OTP</h2>
              <br />
            </div>
            <form noValidate="" action="" className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <input type="text" name="otp" id="otp" placeholder="Enter OTP" value={otp} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
              </div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-green-800 hover:bg-green-600 dark:text-gray-50 button-hover-effect">Verify</button>
            </form>
            <div className="flex items-center w-full my-4">
              <hr className="w-full dark:text-gray-600" />
              <p className="px-3 dark:text-gray-400">OR</p>
              <hr className="w-full dark:text-gray-600" />
            </div>
            <div className="flex flex-col items-center">
              {showResend ? (
                 <>
                <button onClick={handleResend} className='text-textColor hover:text-white hover:underline'>
                  Resend OTP
                </button>
               </>
              ) : (
                <p>Resend OTP in {timer} seconds</p>
              )}
            </div>
            <div className="flex flex-col items-center">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosInstance/axiosInstance';
// import { toast } from 'react-toastify';
// import bgImgLogin from '../assets/images/loginBG.png';

// const VerifyOtp = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   const [timer, setTimer] = useState(60);
//   const [showResend, setShowResend] = useState(false);

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//       return () => clearInterval(countdown);
//     } else {
//       setShowResend(true);
//     }
//   }, [timer]);

//   const handleInputChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosInstance.post('/api/auth/verify-otp', { otp: otp })
//       .then((response) => {
//         const role = response?.data?.data?.role;
//         toast.success("Successfully verified OTP");
//         navigate(`/${role}/login`);
//       })
//       .catch((error) => {
//         toast.error("OTP is invalid or expired");
//         console.error("Error while verifying OTP:", error);
//       });
//   };
  

//   const handleResend = (e) => {
//     e.preventDefault();
//     axiosInstance.post('/api/auth/re-send-otp').then((response) => {
//       // Handle response if needed
//     });
//     setTimer(60); // Reset the timer
//     setShowResend(false); // Hide the resend button
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
//           }
//         `}
//       </style>
//       <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
//         <div className='text-center w-full max-w-[500px] mx-auto rounded-[30px] shadow-md p-5 md:p-20 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
//           <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>VERIFY OTP</h1>
//           <form className='py-4' onSubmit={handleSubmit}>
//             <div className='mb-5'>
//               <input
//                 type="text"
//                 placeholder='Enter OTP'
//                 name='otp'
//                 value={otp}
//                 onChange={handleInputChange}
//                 className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-black  rounded-md text-center'
//               />
//             </div>
//             <div className=''>
//               <button type='submit' className='w-3/4 border-2 border-redBorder rounded-lg text-textColor text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow' style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
//                 Verify
//               </button>
//             </div>
//           </form>
//           <div className='text-textColor text-[16px] mb-[15px]'>
//             {showResend ? (
//               <button onClick={handleResend} className='text-textColor hover:text-white'>
//                 Resend OTP
//               </button>
//             ) : (
//               <p>Resend OTP in {timer} seconds</p>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default VerifyOtp;
