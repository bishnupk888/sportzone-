import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgImage from '../assets/images/background/20215.jpg';
import apiServices from '../apiServices/apiServices';
import logo from '../assets/images/logo/logo.png';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword:'',
        role: '', 
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
        } else if (!formData.role) {
            toast.error('Please select a role.');
        } else {
            
            apiServices.resetPassword(formData)
                .then((response) => {
                    toast.success( response.data.message); 
                    navigate('/reset-password/verify-otp',{state:{ ...formData }} )
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
                    .bgImage {
                        background-image: url(${bgImage});
                        background-size: cover;
                        background-position: center top;
                        background-repeat: no-repeat;
                    }

                    .button-hover-effect {
                        transition: transform 0.3s ease;
                    }

                    .form-container {
                        max-width: 500px;
                        width: 100%;
                        height: 100%;
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
                        border: 2px solid white;
                        border-radius: 50%;
                        margin-right: 10px;
                        position: relative;
                        transition: background-color 0.3s ease;
                    }

                    .radio-label input:checked + .custom-radio {
                        background-color: green;
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

            <div className="bgImage fixed top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center" style={{ zIndex: 1000 }}>
                <div className='flex items-center justify-center w-full min-h-screen bg-black bg-opacity-50 '>
                    <div className="flex-col w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:text-white bg-black hover:bg-opacity-100 border hover:border-r-4 hover:border-b-4 border-redBorder transform transition-transform duration-300 m-10">
                        <div className="flex flex-col items-center mb-4">
                            <img src={logo} alt="logo" className="h-24 mb-4" />
                            <h2 className="mb-3 lg:text-4xl md:text-2xl text-lg font-semibold text-center">Reset Password</h2>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <div className="space-y-1">
                                    <label htmlFor="email" className="block text-sm">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="password" className="text-sm">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter New Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="confirmPassword" className="text-sm">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div className="radio-container">
                                    <label className="radio-label">
                                        <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleInputChange} />
                                        <div className={`custom-radio ${formData.role === 'user' ? 'bg-green-500' : ''}`}></div>
                                        <span>User</span>
                                    </label>
                                    <label className="radio-label ml-2">
                                        <input type="radio" name="role" value="trainer" checked={formData.role === 'trainer'} onChange={handleInputChange} />
                                        <div className={`custom-radio ${formData.role === 'trainer' ? 'bg-green-500' : ''}`}></div>
                                        <span>Trainer</span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform duration-300 transform hover:scale-105">Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
