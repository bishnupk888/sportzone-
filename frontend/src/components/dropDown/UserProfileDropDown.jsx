import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/userImage.jpg';
import { useSelector } from 'react-redux';


const UserProfileDropDown = () => {
    const userRole = useSelector((state) => state.user.userRole);
    const userImage = useSelector((state) => state.user.userImage);
    const userName = useSelector((state) => state.user.userName);
    const dropdownRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleUserProfile = () => {
        navigate('/user/profile')
        setIsOpen(!isOpen);
    }
    const handleWallet = () => {
        navigate('/user/wallet')
        setIsOpen(!isOpen);
    }
    const handleBookings = () => {
        navigate('/user/my-bookings')
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <style>
                {`
          .glow {
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
            transform: scale(1.05);
            font-size: 1.25rem; /* Adjust as needed */
            transition: box-shadow 0.3s ease, transform 0.3s ease, font-size 0.3s ease;
          }
          

        `}
            </style>
            <div className="relative inline-block text-left" ref={dropdownRef}>
                <figure className="w-[35px] h-[35px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]" onClick={toggleDropdown}>
                    <img
                        src={userImage ? userImage : defaultImage}
                        alt="User"
                        className="w-full rounded-full cursor-pointer"
                    />
                </figure>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md text-white shadow-lg bg-black ring-1 ring-white ring-opacity-100">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                            <button onClick={handleUserProfile}
                                className="block px-4 py-2 text-sm text-textColor hover:text-white w-full text-left"
                                role="menuitem"
                            >
                                Profile
                            </button>

                            <hr />

                            <button onClick={handleBookings}
                                className="block px-4 py-2 text-sm text-textColor hover:text-white w-full text-left"
                                role="menuitem"
                            >
                                My Bookings
                            </button>
                            <hr />

                            <button onClick={handleWallet}
                                className="block px-4 py-2 text-sm text-textColor hover:text-white w-full text-left"
                                role="menuitem"
                            >
                                Wallet
                            </button>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserProfileDropDown;
