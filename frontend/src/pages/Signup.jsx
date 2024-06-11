import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import bgImgLogin from '../assets/images/loginBG.png';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name) {
      toast.error("Name is required.");
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address.");
    }

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be 10 digits.");
    }

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
    }

    if (!formData.role) {
      toast.error("Please select a role.");
    }

    if (
      formData.name &&
      emailRegex.test(formData.email) &&
      phoneRegex.test(formData.phone) &&
      passwordRegex.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      formData.role
    ) {
      axiosInstance.post('/api/auth/register', formData)
        .then((response) => {
          console.log(response);
          toast.success("OTP sent to your email");
          navigate('/verify-otp');
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.error("Error during signup request", err);
        });
    }
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
            transform: scale(1.05);
          }
        `}
      </style>
      <div className='absolute top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center'>

      {/* <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'> */}
        <div className='text-center w-full max-w-[500px] mx-auto rounded-[30px] shadow-md p-5 md:p-10 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
          <h1 className='text-textColor text-4xl md:text-4xl leading-9 font-bold pb-[20px]'>SIGN UP</h1>
          <form className='py-3 ' onSubmit={handleSignup}>
            <div className='mb-3'>
              <input
                type="text"
                placeholder='Enter Your Name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>
            <div className='mb-3 '>
              <input
                type="email"
                placeholder='Enter Your Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>
            <div className='mb-3'>
              <input
                type="text"
                placeholder='Enter Your Phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>
            <div className='mb-3'>
              <input
                type="password"
                placeholder='Enter Your Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>
            <div className='mb-3'>
              <input
                type="password"
                placeholder='Re-Enter Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className='w-3/4 px-4 py-3 border border-solid border-redBorder focus:outline-none text-lg md:text-xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>
            <div className='mb-3 flex justify-center px-[20px]' >
              <p className='text-textColor px-[20px] text-[18px]'>Register as: </p>
              <label className='text-textColor mr-4 flex items-center'>
                <input
                  type="radio"
                  name="role"
                  value="trainer"
                  checked={formData.role === 'trainer'}
                  onChange={handleInputChange}
                  className='appearance-none h-5 w-5 border-2 border-redBorder rounded-full checked:bg-redBorder checked:border-white focus:outline-none'
                />
                <span className='ml-2'>Trainer</span>
              </label>
              <label className='text-textColor flex items-center'>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleInputChange}
                  className='appearance-none h-5 w-5 border-2 border-redBorder rounded-full checked:bg-redBorder checked:border-white focus:outline-none'
                />
                <span className='ml-2'>User</span>
              </label>
            </div>
              <button type='submit' className=' border-2 border-redBorder rounded-lg w-2/4 text-textColor text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow' style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                SUBMIT
              </button>
          </form>
        </div>
      {/* </section> */}
      </div>
    </>
  );
};

export default Signup;
