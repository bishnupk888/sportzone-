import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import bgImgLogin from '../assets/images/loginBG.png';

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
        toast.success("Successfully verified OTP");
        navigate(`/${role}/login`);
      })
      .catch((error) => {
        toast.error("OTP is invalid or expired");
        setTimer(0);
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
          .glow {
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.4);
            transition: box-shadow 0.3s ease;
          }

          .hover-glow:hover {
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.4);
            color: white;
            transition: box-shadow 0.3s ease, color 0.3s ease;
          }
        `}
      </style>
      <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
        <div className='text-center w-full max-w-[500px] mx-auto rounded-[30px] shadow-md p-5 md:p-20 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
          <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>VERIFY OTP</h1>
          <form className='py-4' onSubmit={handleSubmit}>
            <div className='mb-5'>
              <input
                type="text"
                placeholder='Enter OTP'
                name='otp'
                value={otp}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-black  rounded-md text-center'
              />
            </div>
            <div className=''>
              <button type='submit' className='w-3/4 border-2 border-redBorder rounded-lg text-textColor text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow' style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                Verify
              </button>
            </div>
          </form>
          <div className='text-textColor text-[16px] mb-[15px]'>
            {showResend ? (
              <button onClick={handleResend} className='text-textColor hover:text-white'>
                Resend OTP
              </button>
            ) : (
              <p>Resend OTP in {timer} seconds</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyOtp;
