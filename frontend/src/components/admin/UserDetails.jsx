import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ConfirmationModal from '../popupComponents/ConfirmationModal';
import CustomModal from '../popupComponents/imageViewerModal';

const UserDetails = ({ user, setViewUserDetails }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [profileUrl, setProfileUrl] = useState('');

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmReject = () => {
        rejectUser(user._id, rejectReason);
        setModalOpen(false);
    };

    const openProfileModal = (url) => {
        setProfileUrl(url);
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setProfileUrl('');
        setIsProfileModalOpen(false);
    };

    if (!user) {
        return <div>No user details found</div>;
    } else {
        console.log(user)
    }

    return (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-black border border-gray-200 rounded-lg shadow-md p-10 text-white w-full max-w-3xl">
                <button onClick={() => setViewUserDetails(false)} className="absolute top-4 left-4 bg-black border border-red-600 text-white px-4 py-2 rounded hover:scale-105 flex items-center">
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>

                <h1 className="text-white lg:text-4xl md:text-3xl text-3xl py-4 font-bold text-center">USER DETAILS</h1>

                <div className="flex items-center mb-6">
                    <div className="relative h-20 w-20 border border-redBorder rounded-full">
                        <img
                            className="h-full w-full rounded-full object-cover object-center"
                            src={user?.profileImage}
                            alt=""
                        />
                    </div>
                    <div className="ml-4 text-textColor">
                        <h2 className="text-2xl font-bold text-highlightTextColor">{user?.username}</h2>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>
                </div>
                <div className='text-lg text-textColor'>
                    <p>Phone : <span>{user?.phone ? user?.phone : ' not updated'}</span></p>
                    <p>Age : <span>{user?.age ? user?.age : ' not updated'}</span></p>
                    <p>Gender : <span>{user?.gender ? user?.gender : ' not updated'}</span></p>
                    <p>Interests:
                        <span>
                            {user?.interests?.length ?
                                user.interests.map((el, index) => (
                                    <span key={index} className="inline-block bg-gray-200 text-black rounded px-2 py-1 mx-1">
                                        {el}
                                    </span>
                                )) :
                                ' not updated'
                            }
                        </span>
                    </p>
                    <p> Verification Status (OTP) : <span className={`${user?.isOtpVerified ? 'text-green-500' : 'text-red-500'}`}>{user.isOtpVerified ? 'Verified' : 'Unverified'}</span> </p>

                </div>
            </div>
        </div>
    );
};

export default UserDetails;
