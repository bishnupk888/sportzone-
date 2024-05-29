import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user && user.userRole && user.userId) {
            axiosInstance.get(`/api/users/${user.userId}`)
                .then((response) => {
                    console.log(response);
                    setUserData(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    toast.error("Failed to fetch user data");
                });
        }
    }, [user]);

    return (
        <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
            <div className='text-center w-full max-w-[80%] mx-auto rounded-[30px] shadow-md md:p-20 bg-bgColorComponent border border-redBorder'>
                <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold pt-[40px] lg:py-[30px] md:py-[30px]'>
                    {userData.username ?? 'User'}'s Profile
                </h1>
                <div className='py-4 px-4'>
                    <div className='flex flex-col md:flex-row items-start'>
                        <div className='relative mb-2 md:mr-2 w-52 h-52 flex items-center justify-center'>
                            <img
                                src={userData?.profileImage || defaultImage}
                                alt='user-image'
                                className='lg:absolute top-0 w-32 h-32 md:w-40 md:h-40 rounded-full border border-redBorder'
                            />
                        </div>
                        <div className='flex-1 mb-6 md:ml-[30px] md:mt-0 w-full md:w-[70%]'>
                            <div className='mb-5 flex items-start'>
                                <label className='text-white text-xl md:text-2xl w-[25%]'>Full Name:</label>
                                <p className='text-white text-lg md:text-xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.username}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-white text-xl md:text-2xl w-[25%]'>Email:</label>
                                <p className='text-white text-lg md:text-xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.email}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-white text-xl md:text-2xl w-[25%]'>Phone:</label>
                                <p className='text-white text-lg md:text-xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.phone}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-white text-xl md:text-2xl w-[25%]'>Age:</label>
                                <p className='text-white text-lg md:text-xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.age}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-white text-xl md:text-2xl w-[25%]'>Gender:</label>
                                <p className='text-white text-lg md:text-xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.gender}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-white text-xl md:text-2xl w-[25%]'>Interests:</label>
                                <p className='text-white text-lg md:text-xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.interests}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-4'>
                        <Link to='/edit-userprofile'>
                            <button className='max-w-[300px] bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 border-2 border-redBorder'>
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
