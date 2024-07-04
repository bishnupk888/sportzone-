import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bgImgLogin from '../../assets/images/loginBG.png'; // Adjust the import path as necessary
import { setAdminData } from '../../Redux/features/adminSlice';
import { useSelector, useDispatch } from 'react-redux';
import logoImg from '../../assets/images/logo/logo.png'

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.admin.adminRole);
  console.log(userRole);
  useEffect(() => {
    if (userRole) {
      navigate('/admin/dashboard');
    }
  }, [userRole]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });

  const handleInputChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      toast.error('All fields are required')
    }
    else{

   
    axiosInstance.post('/api/admin/login', formData)
      .then((response) => {
        dispatch(setAdminData(response.data.data)); // redux store
        toast.success("Successfully logged in");
        navigate('/admin/dashboard');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to login');
      });
    }
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
      <section className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50'>
        <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-20 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
        <div className="flex flex-col items-center">
              <img src={logoImg} alt="logo" className="h-24 mb-4" />
              <h2 className="mb-3 text-4xl  font-bold text-center text-highlightTextColor">Admin Login</h2>
              <br />
            </div>
          <form className='py-4 px-4' onSubmit={handleAdminLogin}>
            <div className='mb-5'>
              <input
                type="email"
                placeholder='Enter Your Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md glow-input'
              />
            </div>

            <div className='mb-5'>
              <input
                type="password"
                placeholder='Enter Your Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md glow-input'
              />
            </div>

            <div className='border-2 border-redBorder rounded-lg'>
              <button type='submit' className='w-full bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
