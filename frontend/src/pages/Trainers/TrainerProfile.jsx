import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import defaultcertficateImage from '../../assets/images/certification-placeholder.png'
import axiosInstance from '../../axiosInstance/axiosInstance';

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user && user.userRole && user.userId) {
            axiosInstance.get(`/api/trainers/${user.userId}`)
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
            <div className='text-center w-full max-w-[80%] mx-auto rounded-[30px] shadow-md md:p-20 bg-bgColorComponennt border border-redBorder'>
                <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold pt-[40px] lg:py-[30px] md:py-[30px]'>{userData.userName ?? 'Trainer'}'s Profile</h1>
                <div className='py-4 px-4'>
                    <div className='flex flex-col md:flex-row items-start'>
                        {/* Current Profile Image */}
                        <div className='relative mb-2 md:mr-2 w-52 h-52 flex items-center justify-center'>
                            <img
                                src={userData?.profileImage || defaultImage}
                                alt='user-image'
                                className='lg:absolute top-0 w-32 h-32 md:w-40 md:h-40 rounded-[15px] border border-redBorder'
                            />
                            {/* Edit Image Button */}
                            <button className='absolute bottom-0 bg-buttonBgColor p-1 rounded-[10px] border border-redBorder text-textColor'>
                                Edit Image
                            </button>
                        </div>

                        {/* User Information */}
                        <div className='flex-1 mb-6 md:ml-[30px] md:mt-0 w-full md:w-[70%]'>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Name:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.username}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Email:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.email}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Age:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.age}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Gender:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.gender}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Phone:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.phone}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Experience:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.experience}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Fee/Session:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.feePerSession}
                                </p>
                            </div>
                            <div className='mb-5 flex items-start'>
                                <label className='text-textColor text-xl md:text-2xl w-[25%]'>Location:</label>
                                <p className='text-textColor text-xl md:text-2xl leading-7 mt-2 md:ml-4 md:w-[75%] overflow-wrap break-word'>
                                    {userData.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Image Section */}
                    <div className='relative mb-2 md:mr-2 w-52 h-10 mt-4 md:mt-0'>
                        <div className='relative'>
                            <img
                                src={userData?.certificateImage || defaultcertficateImage}
                                alt='certificate-image'
                                className='w-full h-[50px] rounded-[5px] border border-redBorder '
                                style={{ objectFit: 'fill' }}
                            />
                            {/* Edit Certificate Image Button */}
                            <button className='absolute bottom-[-50px] left-0 w-full bg-buttonBgColor p-1 rounded-[5px] border border-redBorder text-textColor'>
                                Add Certificate
                            </button>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className='flex justify-end mt-4'>
                        <Link to='#'>
                            <button className='max-w-[300px] bg-buttonBgColor text-textColor text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 border-2 border-redBorder'>
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
