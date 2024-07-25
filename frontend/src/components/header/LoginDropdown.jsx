import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUserLogin = ()=>{
    navigate('/user/login')
    setIsOpen(!isOpen);
  }
  const handleTrainerLogin =()=>{
    navigate('/trainer/login')
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
      <button 
        className="bg-black border-redBorder border-[2px] py-1 px-4 sm:py-2 sm:px-5 md:py-2 md:px-6 text-white font-[600] h-[36px] sm:h-[40px] md:h-[44px] flex items-center rounded-[10px] hover-glow"
        onClick={toggleDropdown}
      >
        Login
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md text-white shadow-lg bg-black ring-1 ring-white ring-opacity-100">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
            <button onClick={handleUserLogin}
              className="block px-4 py-2 text-sm text-textColor hover:text-white w-full text-left"
              role="menuitem"
            >
              Login as Athlete
            </button>
         
            <hr />
            
            <button onClick={handleTrainerLogin}
              className="block px-4 py-2 text-sm text-textColor hover:text-white w-full text-left"
              role="menuitem"
            >
              Login as Trainer
            </button>
            
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default LoginDropdown;
