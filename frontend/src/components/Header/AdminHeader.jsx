import { useRef, useEffect } from 'react';
import Logo from '../../assets/images/logo/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../Redux/features/userSlice'; 
import axiosInstance from '../../axiosInstance/axiosInstance';
import defaultImage from '../../assets/images/userImage.jpg';

const navLinks = [
    { path: '/admin/dashboard', display: 'Dashboard' },
    { path: '/admin/trainers', display: 'Trainers' },
    { path: '/admin/users', display: 'Athletes' },
    { path: '/admin/bookings', display: 'Bookings' },
    { path: '/admin/Services', display: 'Services' },
];

const Header = () => {
    const dispatch = useDispatch();
    const userRole = localStorage.getItem('adminData');
    const navigate = useNavigate();

    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const handleStickyHeader = () => {
        if (window.scrollY > 80) {
            headerRef.current.classList.add('sticky_header');
        } else {
            headerRef.current.classList.remove('sticky_header');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleStickyHeader);
        return () => window.removeEventListener('scroll', handleStickyHeader);
    }, []);

    const toggleMenu = () => {
        menuRef.current.classList.toggle('show_menu');
    };

    const handleLogout = (e) => {
        e.preventDefault();
        axiosInstance.post('/api/auth/logout')
            .then((response) => {
                localStorage.removeItem('adminData');
                toast.success("Successfully logged out");
                navigate('/admin/login');
            })
            .catch((err) => {
                console.log(err, " admin header error");
                toast.error("Failed to logout");
            });
    };

    return (
        <>
            <header className="header flex items-center" ref={headerRef}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Link to="/admin/dashboard">
                            <div className="flex justify-center items-center ml-[10px] sm:ml-[20px] md:ml-[50px]">
                                <img src={Logo} alt="logo" className="logo h-12 w-auto md:h-16" />
                            </div>
                        </Link>
                        <div className="navigation md:block" ref={menuRef} onClick={toggleMenu}>
                            <ul className="menu flex items-center gap-6 md:gap-[2.7rem]">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'text-white text-[14px] md:text-[16px] leading-7 font-[600] border-b-2 border-redBorder'
                                                    : 'text-textColor text-[14px] md:text-[16px] leading-7 font-[500] hover:text-white'
                                            }
                                        >
                                            {link.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-4">
                            {userRole !== null && userRole !== undefined && (
                                <div className="hidden lg:block md:hidden">
                                    <h3 className='text-white text-[14px] md:text-[16px] leading-7 font-[600] border-b-2 border-redBorder'>Welcome, <span>{'Admin'}</span></h3>
                                </div>
                            )}
                            {userRole !== null && userRole !== undefined && (
                                <div>
                                    <Link to="/profile">
                                        <figure className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                                            <img
                                                src={defaultImage}
                                                alt="User"
                                                className="w-full rounded-full cursor-pointer"
                                            />
                                        </figure>
                                    </Link>
                                </div>
                            )}
                            {userRole !== null && userRole !== undefined ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px]"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/admin/login')}
                                    className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px]"
                                >
                                    Login
                                </button>
                            )}
                            <span className="md:hidden" onClick={toggleMenu}>
                                <BiMenu className="w-6 h-6 cursor-pointer text-white" aria-label="Toggle Menu" />
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
