
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import axiosInstance from '../../axiosInstance/axiosInstance';

export default function Example() {

    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user && user.userRole && user.userId) {
            axiosInstance.get(`/api/users/${user.userId}`)
                .then((response) => {
                    console.log("user in response is : ", response.data.data);
                    setUserData(response.data.data)
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    toast.error("Failed to fetch user data");
                });
        }
    }, [user]);


    return (
        <div className='px-[5%] py-[5%] bg-black text-white'>
            <form>
                <div className="space-y-12">
                    <div className="pb-12">
                        <h2 className=" text-[30px] text-base font-bold lg:text-[40px] leading-7 text-textColor ">Update Profile</h2>
                        <p className="mt-5 text-sm leading-6 text-textColor">
                            Complete full profile information for verification .
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-textColor">
                        <div className="col-span-full">
                                <label htmlFor="photo" className="block text-xl font-medium leading-6 text-textColor">
                                    Profile Image
                                </label>
                                <div className="mt-2 flex items-center ">
                                    <div className='relative  w-40 h-40 flex items-center justify-center'>
                                        <img
                                            src={userData?.profileImage || defaultImage}
                                            alt='user-image'
                                            className='lg:absolute top-5 w-28 h-28  rounded-full border-2 border-redBorder'
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
                                <label htmlFor="full-name" className="block text-xl font-medium leading-6">
                                    Full name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="full-name"
                                        id="full-name"
                                        placeholder={userData?.username ? userData.username : 'Enter full name'}
                                        defaultValue={userData.username}
                                        className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2"
                                    />
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
                                        placeholder={userData?.email ? userData.email : 'Enter email'}
                                        defaultValue={userData.email}
                                        className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2"
                                    />
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
                                        placeholder={userData?.age ? userData.age : 'Enter Age'}
                                        defaultValue={userData.age}
                                        className="block w-[50%] rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2"
                                    />
                                </div>
                            </div>
                             <div className="sm:col-span-3">
                                <label htmlFor="gender" className="block text-xl font-medium leading-6">
                                    Gender
                                </label>
                                <div className="mt-2" >
                                    <select
                                        id="gender"
                                        name="gender"
                                        placeholder={userData?.gender ? userData.email : 'Select gender'}
                                        defaultValue={userData.gender}
                                        className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:max-w-xs sm:text-sm sm:leading-6 px-2"
                                    >
                                        <option value="" disabled style={{ backgroundColor: 'black' }}>
                                            Select gender
                                        </option>
                                        <option style={{ backgroundColor: 'black' }} >Male</option>
                                        <option style={{ backgroundColor: 'black' }}>Female</option>
                                        <option style={{ backgroundColor: 'black' }}>Other</option>
                                    </select>
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
                                        placeholder={userData?.phone ? userData.phone : 'Enter phone number'}
                                        defaultValue={userData.phone}
                                        className="block w-full rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder lg:text-[16px] sm:text-sm sm:leading-6 px-2"
                                    />
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
                                        placeholder={(Array.isArray(userData.interests) && userData.interests.length > 0) ? userData.interests.join(', ') : 'Add your favorite sports (use comma if multiple inerests)'}
                                        className="block w-full lg:text-[16px] rounded-md border border-redBorder bg-white bg-opacity-5 py-1.5 text-textColor shadow-xl placeholder:text-textColor sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-redBorder focus:border-redBorder px-3"
                                        defaultValue={userData.interests}
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
