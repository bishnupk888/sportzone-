import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import bgImgLogin from '../assets/images/loginBG.png';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email) {
            toast.error('Email is required');
        } else if (!passwordRegex.test(formData.password)) {
            toast.error("Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.");
        } else if (formData.password === '' || formData.confirmPassword === '') {
            toast.error('Both fields are required');
        } else if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            axiosInstance.post('/api/auth/reset-password', formData)
                .then((response) => {
                    toast.success('Password successfully reset', response.data);
                    navigate('/login');
                })
                .catch((error) => {
                    toast.error('Error resetting password');
                    console.error('Error while resetting password:', error);
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
            transition: box-shadow 0.3s ease, transform 0.3s ease;
            transform: scale(1.05);
          }
        `}
            </style>
            <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
                <div className='text-center w-full max-w-[500px] mx-auto rounded-[30px] shadow-md p-5 md:p-20 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
                    <h1 className='text-textColor text-4xl md:text-4xl leading-9 font-bold py-[25px]'>RESET PASSWORD</h1>
                    <form className='py-4' onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <input
                                type="email"
                                placeholder='Enter Your Email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-black rounded-md'
                            />
                        </div>
                        <div className='mb-5'>
                            <input
                                type="password"
                                placeholder='Enter New Password'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-black rounded-md'
                            />
                        </div>
                        <div className='mb-5'>
                            <input
                                type="password"
                                placeholder='Confirm New Password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-black rounded-md'
                            />
                        </div>
                        <div className=''>
                            <button type='submit' className='w-3/4 text-textColor text-lg border-2 border-redBorder rounded-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow' style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;
