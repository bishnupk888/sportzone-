import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
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
    // Add your OTP verification logic here
  };

  const handleResend = () => {
    // Add your resend OTP logic here
    setTimer(30); // Reset the timer
    setShowResend(false); // Hide the resend button
  };

  return (
    <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
      <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-20 bg-bgColorComponennt border border-redBorder'>
        <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>VERIFY OTP</h1>
        <form className='py-4 px-4' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <input
              type="text"
              placeholder='Enter OTP'
              name='otp'
              value={otp}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md text-center'
            />
          </div>

          <div className='border-2 border-redBorder rounded-lg'>
            <button type='submit' className='w-full bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3'>
              Verify
            </button>
          </div>
        </form>
        <div className='text-textColor text-[16px] mb-[15px]'>
          {showResend ? (
            <button onClick={handleResend} className='text-textColor hover:text-white '>
              Resend OTP
            </button>
          ) : (
            <p>Resend OTP in {timer} seconds</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
