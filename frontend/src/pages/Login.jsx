import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { setUserData } from '../Redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import bgImgLogin from '../assets/images/loginBG.png' 

const Login = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: role,
  });

  const userRole = useSelector((state) => state.user.userRole);

  useEffect(() => {
    if (userRole) {
      navigate('/home');
    }
  }, [userRole, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
      toast.error('Need to fill all fields');
    } else {
      axiosInstance.post('/api/auth/login', formData).then((response) => {
        console.log('data = ', response.data.data);
        dispatch(setUserData(response.data.data));
        toast.success('Successfully logged in');
        navigate('/home');
      }).catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
        navigate(`/${role}/login`);
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
      <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
        <div className='text-center w-full max-w-[500px] mx-auto rounded-[30px] shadow-md p-5 md:p-20  bg-cover bg-center bg-no-repeat border border-redBorder glow' style={{backgroundImage: `url(${bgImgLogin})`}}>
          <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>LOGIN</h1>
          <form className='py-4'>
            <div className='mb-5'>
              <input
                type="email"
                placeholder='Enter Your Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>

            <div className='mb-5'>
              <input
                type="password"
                placeholder='Enter Your Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md'
              />
            </div>

            <div className='border-2 border-redBorder rounded-lg'>
              <button
                type='submit'
                className='w-full text-textColor text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover-glow'
                onClick={(e) => handleLogin(e)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
              >
                Submit
              </button>
            </div>
          </form>
          <div className='text-textColor text-[16px] mb-[15px] text-center'>
            <p>
              <Link to='/reset-password'>
                <span className='text-textColor hover:text-white'>forgot password</span>
              </Link> | 
              <span> new user? <Link to={'/register'}><span className='text-textColor hover:text-white'>register</span></Link></span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
