import { useRef, useEffect } from 'react';
import Logo from '../../assets/images/logo/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import LoginDropdown from './LoginDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../Redux/features/userSlice'; 
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import defaultImage from '../../assets/images/userImage.jpg';
import UserProfileDropDown from '../dropDown/UserProfileDropDown';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/user/findtrainers', display: 'Find A Trainer' },
  { path: '/user/services', display: 'Services' },
  { path: '/user/contact', display: 'Contact' },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.user.userRole);
  const userImage = useSelector((state) => state.user.userImage);
  const userName = useSelector((state) => state.user.userName);
  // const isBlocked = useSelector((state) => state.user.isBlocked);

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

  // const checkIsBlocked = () => {
    
  //   if(isBlocked) {
  //     navigate('/home');
  //     toast.warning("You are blocked. Redirecting to home...");
  //   }
  // };
  const handleWarning = ()=>{
    toast.warning('please login for more.')
  }

  const handleLogout = () => {
    axiosInstance.post('/api/auth/logout')
      .then((response) => {
        console.log(response.data);
        toast.success("Successfully logged out");
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to logout");
      });

    dispatch(clearUserData());
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
            transition: box-shadow 0.3s ease, color 0.3s ease;
          }
        `}
      </style>
      <header className="header flex items-center z-" ref={headerRef}   style={{ zIndex: 1000 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/home">
              <div className="flex justify-center items-center ml-[10px] sm:ml-[20px] md:ml-[50px]">
                <img src={Logo} alt="logo" className="logo h-12 w-auto md:h-16" />
              </div>
            </Link>
            <div className="navigation md:block" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu flex items-center gap-6 md:gap-[2.7rem]">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    {userRole ? (
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
      ) : (
        <span
          onClick={handleWarning}
          className="cursor-pointer text-textColor text-[14px] md:text-[16px] leading-7 font-[500] hover:text-white"
        >
          {link.display}
        </span>
      )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              {userRole !== '' && (
                <div className="hidden lg:block md:hidden">
                  <h3 className='text-white text-[14px] md:text-[16px] leading-7 font-[600] border-b-2 border-redBorder'>Welcome, <span>{userName ? userName : 'user'}</span></h3>
                </div>
              )}
              {userRole !== '' && (
                <UserProfileDropDown/>
              )}
              {userRole !== '' ? (
                <button
                  onClick={handleLogout}
                  className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px] hover-glow"
                >
                  Logout
                </button>
              ) : (
                <LoginDropdown />
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
