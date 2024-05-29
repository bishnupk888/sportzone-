import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo/logo.png';
import { FaBars, FaUserFriends, FaCalendarAlt, FaCog } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import { clearAdminData } from '../../Redux/features/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

const navLinks = [
    { path: '/admin/dashboard', display: 'Dashboard', icon: <RiDashboardLine /> },
    { path: '/admin/trainers', display: 'Trainers', icon: <GiTeacher /> },
    { path: '/admin/users', display: 'Athletes', icon: <FaUserFriends /> },
    { path: '/admin/bookings', display: 'Bookings', icon: <FaCalendarAlt /> },
    { path: '/admin/services', display: 'Services', icon: <FaCog /> },
];

const AdminSidebar = ({ setIsSidebarOpen, isSidebarOpen }) => {
    const userRole = useSelector((state) => state.admin.adminRole);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userLoggedin, setUserLoggedin] = useState(!!userRole); // Initial state based on userRole existence

    useEffect(() => {
        setUserLoggedin(!!userRole); // Update userLoggedin when userRole changes
    }, [userRole]);

    const handleLogin = () => {
        navigate('/admin/login');
    };

    const handleLogout = () => {
        axiosInstance.post('/api/admin/logout')
            .then(() => {
                setUserLoggedin(false); // Update state
                toast.success("Successfully logged out");
                navigate('/admin/login');
            })
            .catch((err) => {
                console.error("Failed to logout", err);
                toast.error("Failed to logout");
            });

        dispatch(clearAdminData()); // Dispatch action to clear admin data from Redux store
    };

    const toggleMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <aside className={`fixed top-0 left-0 h-screen ${isSidebarOpen ? 'w-64 glow' : 'w-20'} transition-all duration-300 ease-in-out overflow-y-auto bg-black border-r border-redBorder shadow-sm`} style={{ boxShadow: '0 0 30px rgba(255, 0, 0, 0.5)', transition: 'box-shadow 0.3s ease' }}>
            <nav className="h-full flex flex-col">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {isSidebarOpen ? (
                        <img src={Logo} className="w-32" alt="logo" />
                    ) : (
                        <div className="w-32 h-12"></div>
                    )}
                    <button className="text-white text-4xl rounded-lg bg-textColor bg-opacity-10 hover:bg-opacity-30 hover:text-white" onClick={toggleMenu}>
                        {isSidebarOpen ? <IoClose /> : <FaBars />}
                    </button>
                </div>
                <div className={`${isSidebarOpen ? 'flex' : 'hidden'} flex-col items-center w-full px-5 py-10`}>
                    <ul className="w-full">
                        {navLinks.map((link, index) => (
                            <li key={index} className="relative flex items-center py-5 px-5 my-1 font-medium rounded-md cursor-pointer">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white text-[16px] md:text-[18px] leading-7 font-[500] border-b-2 border-redBorder'
                                            : 'text-textColor text-[14px] md:text-[16px] leading-7 font-[500] hover:text-white'
                                    }
                                >
                                    <div className="flex items-center">
                                        <span className='text-xl'>{link.icon}</span>
                                        {isSidebarOpen && <span className="ml-3">{link.display}</span>}
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`${!isSidebarOpen ? 'flex' : 'hidden'} flex-col items-center w-full px-2 py-10`}>
                    <ul className="w-full">
                        {navLinks.map((link, index) => (
                            <li key={index} className="relative flex items-center py-5 px-5 my-1 font-medium rounded-md cursor-pointer">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-white text-3xl leading-7 font-[500] border-b-2 border-redBorder'
                                            : 'text-textColor text-2xl leading-7 font-[500] hover:text-white'
                                    }
                                >
                                    <div className="flex items-center">
                                        <span className=''>{link.icon}</span>
                                    </div>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto bg-black py-10 px-2">
                    <h1 className="text-white text-xl px-1 py-5">Admin</h1>
                    {userLoggedin ? (
                        <button
                            onClick={handleLogout}
                            className={`bg-black border-redBorder border-[2px] py-1 text-white font-[600] flex items-center rounded-[10px] ${isSidebarOpen ? 'h-[60px] sm:h-[40px] md:h-[44px] w-[100px] px-5' : 'h-[40px] w-[64px]'}`}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className={`bg-black border-redBorder border-[2px] py-1 sm:py-2 md:py-2 text-white font-[600] flex items-center rounded-[10px] ${isSidebarOpen ? 'h-[60px] sm:h-[40px] md:h-[44px] w-[100px] px-5' : 'h-[40px] w-[64px] px-2'}`}
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
