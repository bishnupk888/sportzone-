import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { setUserData } from '../Redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Login = ({role}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:role,
  });
   
  const userRole = useSelector((state)=>state.user.userRole)
  
  useEffect(()=>{
    if(userRole){
      navigate('/home')
    }
  },[])
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = (e)=>{
    e.preventDefault()
    axiosInstance.post('/api/auth/login', formData).then((response)=>{
      console.log('data = ',response.data.data)
      dispatch(setUserData(response.data.data))
      toast.success("succefully logged in")
      navigate('/home')
      
    }).catch((err)=>{console.log(err)

    toast.error(err?.response?.data?.message)
    navigate(`/${role}/login`)
    } 
  )
    
  }
  return (
    <>
      <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
        <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-20 bg-bgColorComponennt border border-redBorder'>
          <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>LOGIN</h1>
          <form className='py-4 px-4 '>
            <div className='mb-5'>
              <input
                type="email"
                placeholder='Enter Your Email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md text-center'
              />
            </div>

            <div className='mb-5'>
              <input
                type="password"
                placeholder='Enter Your Password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md text-center'
              />
            </div>

            <div className='border-2 border-redBorder rounded-lg'>
              <button type='submit' className='w-full bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3' onClick={(e)=>handleLogin(e)}>
                Submit
              </button>
            </div>
          </form>
          <div className='text-textColor text-[16px] mb-[15px]'>
          <p > <Link to=''><span className='text-white'>forgot password</span> </Link> | <span> new user? <Link to={'/register'} ><span className='text-white'>register</span></Link> </span></p>
        </div>
        </div>
      </section>
    </>
  );
};

export default Login;
