import { useRef, useEffect } from 'react';
import Logo from '../../assets/images/logo/logo.png';
import { NavLink, Link } from 'react-router-dom';
import userImage from '../../assets/images/userImage.jpg';
import { BiMenu } from 'react-icons/bi';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/trainers', display: 'Find A Trainer' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleScroll = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  return (
    <header className="header flex items-center" ref={headerRef}>
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <div className="flex justify-center items-center ml-[10px] sm:ml-[20px] md:ml-[50px]">
          <img src={Logo} alt="logo" className="logo h-12 w-auto md:h-16" />
        </div>
      </Link>

      {/* Navigation */}
      <div className="navigation hidden md:block" ref={menuRef}>
        <ul className="menu flex items-center gap-6 md:gap-[2.7rem]">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-white text-[14px] md:text-[16px] leading-7 font-[600]'
                    : 'text-textColor text-[14px] md:text-[16px] leading-7 font-[500]'
                }
              >
                {link.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile and Menu Toggle */}
      <div className="flex items-center gap-4">
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
        <Link to="/login">
          <button className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px]">
            Login
          </button>
        </Link>
        <span className="md:hidden" onClick={toggleMenu}>
          <BiMenu className="w-6 h-6 cursor-pointer text-white" aria-label="Toggle Menu" />
        </span>
      </div>
    </div>
  </div>
</header>

  );
};

export default Header;
