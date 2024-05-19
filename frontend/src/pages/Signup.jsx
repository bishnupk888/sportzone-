import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' // default value
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className='px-5 lg:px-0 bg-black min-h-screen overflow-auto'>
        <div className='text-center w-full max-w-[570px] mx-auto rounded-[30px] shadow-md md:p-10 bg-buttonBgColor border border-redBorder'>
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
            
            <div className='mb-5 flex justify-center' >
              <p className='text-textColor px-[20px] text-[20px]'>register as : </p>
              <label className='text-textColor mr-4 flex items-center'>
                <input
                  type="radio"
                  name="role"
                  value="trainer"
                  checked={formData.role === 'trainer'}
                  onChange={handleInputChange}
                  className='appearance-none h-6 w-6 border-2 border-redBorder rounded-lg checked:bg-redBorder checked:border-white focus:outline-none'
                />
                <span className='ml-2'>Trainer</span>
              </label>
              <label className='text-textColor flex items-center'>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleInputChange}
                  className='appearance-none h-6 w-6 border-2 border-redBorder rounded-lg checked:bg-redBorder checked:border-white focus:outline-none'
                />
                <span className='ml-2'>User</span>
              </label>
            </div>

            <div className='border-2 border-redBorder rounded-lg'>
              <button type='submit' className='w-full bg-buttonBgColor text-white text-lg md:text-xl leading-[30px] rounded-lg px-4 py-3 hover:text-[22px]'>
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
