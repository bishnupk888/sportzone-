import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import { toast } from 'react-toastify';


import {setUserData} from '../../redux/features/userSlice';
import apiServices from '../../apiServices/apiServices';
 
export default function Example() {
    const user = useSelector((state) => state.user);
    const [localUserData, setLocalUserData] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user && user.userRole && user.userId) {
            apiServices.getUser(user.userId)
                .then((response) => {
                    setLocalUserData(response.data.data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    toast.error("Failed to fetch user data");
                });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalUserData({
            ...localUserData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!localUserData.username) newErrors.username = "Full name is required";
        if (!localUserData.email) newErrors.email = "Email address is required";
        if (!localUserData.age) newErrors.age = "Age is required";
        if (!localUserData.gender) newErrors.gender = "Gender is required";
        if (!localUserData.phone) newErrors.phone = "Phone number is required";
        if (!localUserData.interests) newErrors.interests = "Interests are required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        apiServices.updateUserData(user.userId,localUserData)
            .then((response) => {
                toast.success("User data updated successfully");
                dispatch(setUserData(localUserData));
                navigate('/user/profile');
            })
            .catch((error) => {
                console.error('Error updating user data:', error);
                toast.error("Failed to update user data");
            });
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className='px-[5%] py-[5%] bg-black text-white'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="pb-12">
                        <h2 className="text-[30px] text-base font-bold lg:text-[40px] leading-7 text-textColor">Update Profile</h2>
                        <p className="mt-5 text-sm leading-6 text-textColor">
                            Complete full profile information for verification. 
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-textColor">
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-xl font-medium leading-6 text-textColor">
                                    Profile Image
                                </label>
                                <div className="mt-2 flex items-center">
                                    <div className='relative w-40 h-40 flex items-center justify-center'>
                                        <img
                                            src={localUserData?.profileImage || defaultImage}
                                            alt='user-image'
                                            className='lg:absolute top-5 w-28 h-28 rounded-full border-2 border-redBorder'
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-md bg-transparent px-2.5 py-1.5 text-sm font-semibold text-textColor shadow-sm ring-1 ring-inset ring-redBorder hover:bg-redBorder"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="username" className="block text-xl font-medium leading-6">
                                    Full name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder='Enter full name'
                                        value={localUserData.username || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.username && <span className="text-red-500">{errors.username}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-xl font-medium leading-6">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='Enter email'
                                        value={localUserData.email || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="age" className="block text-xl font-medium leading-6">
                                    Age
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder='Enter Age'
                                        value={localUserData.age || ''}
                                        onChange={handleInputChange}
                                        className={`block w-[50%] rounded-md border ${errors.age ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.age && <span className="text-red-500">{errors.age}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="gender" className="block text-xl font-medium leading-6">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={localUserData.gender || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.gender ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:max-w-xs sm:text-sm sm:leading-6 px-2`}
                                    >
                                        <option value="" disabled style={{ backgroundColor: 'black' }}>
                                            Select gender
                                        </option>
                                        <option style={{ backgroundColor: 'black' }} value="Male">Male</option>
                                        <option style={{ backgroundColor: 'black' }} value="Female">Female</option>
                                        <option style={{ backgroundColor: 'black' }} value="Other">Other</option>
                                    </select>
                                    {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="phone" className="block text-xl font-medium leading-6">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        placeholder='Enter phone number'
                                        value={localUserData.phone || ''}
                                        onChange={handleInputChange}
                                        className={`block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-redBorder'} bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2`}
                                    />
                                    {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="interests" className="block text-xl font-medium leading-6">
                                    Interests
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="interests"
                                        name="interests"
                                        rows={3}
                                        placeholder={(Array.isArray(localUserData.interests) && localUserData.interests.length > 0) ? localUserData.interests.join(', ') : 'Add your favorite sports (use comma if multiple inerests)'}
                                        className="block w-full lg:text-[16px] rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder px-3"
                                        defaultValue={localUserData.interests}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-xl font-semibold leading-6 text-textColor hover:text-redBorder">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-transparent border border-redBorder px-3 py-2 text-xl font-semibold text-textColor shadow-sm hover:bg-redBorder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redBorder"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}




{/*
import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function Profile() {
    const [profile, setProfile] = useState({
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        age: 30,
        gender: "Male",
        interests: "Reading, Traveling, Coding",
        profileImage: "" // URL or base64 string of profile image
    });

    return (
        <div className='px-[5%] py-[5%] bg-black text-white'>
            <div className="space-y-12">
                <div className="border-b border-textColor pb-12">
                    <h2 className="text-base font-bold lg:text-[40px] leading-7 text-textColor">Profile</h2>
                    <p className="mt-5 text-sm leading-6 text-textColor">
                        This information is displayed publicly.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-textColor">
                        <div className="sm:col-span-3">
                            <label className="block text-xl font-medium leading-6">
                                Full name
                            </label>
                            <div className="mt-2">
                                <p className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl lg:text-[16px] sm:text-sm sm:leading-6">
                                    {profile.fullName}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label className="block text-xl font-medium leading-6">
                                Email address
                            </label>
                            <div className="mt-2">
                                <p className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl lg:text-[16px] sm:text-sm sm:leading-6">
                                    {profile.email}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-xl font-medium leading-6">
                                Phone
                            </label>
                            <div className="mt-2">
                                <p className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl lg:text-[16px] sm:text-sm sm:leading-6">
                                    {profile.phone}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-xl font-medium leading-6">
                                Age
                            </label>
                            <div className="mt-2">
                                <p className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl lg:text-[16px] sm:text-sm sm:leading-6">
                                    {profile.age}
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-xl font-medium leading-6">
                                Gender
                            </label>
                            <div className="mt-2">
                                <p className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl lg:text-[16px] sm:text-sm sm:leading-6">
                                    {profile.gender}
                                </p>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-xl font-medium leading-6">
                                Interests
                            </label>
                            <div className="mt-2">
                                <p className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl lg:text-[16px] sm:text-sm sm:leading-6">
                                    {profile.interests}
                                </p>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-xl font-medium leading-6 text-textColor">
                                Profile Image
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                {profile.profileImage ? (
                                    <img src={profile.profileImage} alt="Profile" className="h-28 w-28 rounded-full" />
                                ) : (
                                    <UserCircleIcon className="h-28 w-28 text-gray-300" aria-hidden="true" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    onClick={() => window.location.href = '/update-profile'} // Adjust the URL as per your routing setup
                    className="rounded-md bg-transparent border border-redBorder px-3 py-2 text-xl font-semibold text-textColor shadow-sm hover:bg-redBorder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redBorder"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

export default Profile;

*/}
