import React, { useState } from 'react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
        <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-20 bg-bgColorComponennt border border-redBorder'>
          <h1 className='text-textColor text-4xl md:text-5xl leading-9 font-bold py-[25px]'>ADMIN LOGIN</h1>
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
              <button type='submit' className='w-full bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3'>
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