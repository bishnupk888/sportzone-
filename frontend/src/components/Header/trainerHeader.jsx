import { useRef, useEffect } from 'react';
import Logo from '../../assets/images/logo/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import LoginDropdown from './LoginDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../Redux/features/userSlice'; 
import axiosInstance from '../../axiosInstance/axiosInstance';
import {toast} from 'react-toastify'
import defaultImage from '../../assets/images/userImage.jpg'
import TrainerProfileDropDown from './TrainerProfileDropDown';


const navLinks = [
  { path: '/home', display: 'Home' },
  { path: 'trainer/bookings', display: 'Bookings' },
  { path: 'trainer/experience', display: 'Experience' },
  { path: 'trainer/slots', display: 'Slots' },
];

const Header = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.userRole);
  const userImage = useSelector((state) => state.user.userImage);
  const userName = useSelector((state) => state.user.userName);
  
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };
  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle('show_menu');
  };

  const handleLogout = () => {
    axiosInstance.post('/api/auth/logout').then((response)=>{
      console.log(response.data)
      toast.success("successfully logged out")
      navigate('/home')
      
    }).catch((err)=>{
      console.log(err)
      toast.error("failed to logout")})
    
    dispatch(clearUserData());
  };

  return (
    <>
      <header className="header flex items-center" ref={headerRef}>
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
            {userRole !== '' && (
                <div className="hidden lg:block md:hidden">
                    <h3 className='text-white text-[14px] md:text-[16px] leading-7 font-[600] border-b-2 border-redBorder'>Welcome, <span>{userName?userName:'Trainer'}</span></h3>
                </div>
            )}
              {userRole !== '' && (
                <TrainerProfileDropDown/>
              )}
              {userRole !== '' ?(
                <button
                  onClick={handleLogout}
                  className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px]"
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







{/*import { useRef, useEffect } from 'react';
import Logo from '../../assets/images/logo/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import LoginDropdown from './LoginDropdown';
import { useSelector } from 'react-redux';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/trainers', display: 'Find A Trainer' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const userRole = useSelector((state) => state.user.userRole);
  const userImage = useSelector((state) => state.user.userImage);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader =()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky_header')
        console.log("added sticky")
      }else{
        headerRef.current.classList.remove('sticky_header')
        console.log("removed sticky")

      }
    })
  }
  useEffect(()=>{
    
    handleStickyHeader()

    return ()=>window.removeEventListener('scroll',handleStickyHeader)
  })

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  return (
    <>
     
    <header className="header flex items-center" ref={headerRef}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/">
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
            {userRole !== '' && userImage && (
              <div>
                <Link to="/">
                  <figure className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                    <img
                      src={userImage}
                      alt="User"
                      className="w-full rounded-full cursor-pointer"
                    />
                  </figure>
                </Link>
              </div>
            )}
            <LoginDropdown />
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






{isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px]"
                >
                  Logout
                </button>
              ) : (
                <LoginDropdown />
              )}


*/}

