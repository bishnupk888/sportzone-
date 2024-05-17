import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    phone:'',
    password: '',
    confirmPassword:''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto border border-red'>
        <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-10 bg-bgColorComponennt'>
          <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>SIGN UP</h1>
          <form className='py-4 px-4 '>
          <div className='mb-5'>
              <input
                type="text"
                placeholder='Enter Your Name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md text-center '
              />
            </div>
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
                type="text"
                placeholder='Enter Your Phone'
                name='phone'
                value={formData.phone}
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
            <div className='mb-5'>
              <input
                type="password"
                placeholder='Re-Enter Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-solid border-redBorder focus:outline-none text-xl md:text-2xl leading-7 text-white bg-transparent rounded-md text-center'
              />
            </div>
            

            <div className='border-2 border-redBorder rounded-lg'>
              <button type='submit' className='w-full bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3'>
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
