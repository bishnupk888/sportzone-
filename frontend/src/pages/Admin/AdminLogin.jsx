import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bgImgLogin from '../../assets/images/loginBG.png'; // Adjust the import path as necessary
import {setAdminData} from '../../Redux/features/adminSlice'
import { useSelector , useDispatch } from 'react-redux';


const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

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
      <section className='px-5 lg:px-0 bg-black min-h-screen flex items-center justify-center'>
        <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-20 bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{ backgroundImage: `url(${bgImgLogin})` }}>
          <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>ADMIN LOGIN</h1>
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
