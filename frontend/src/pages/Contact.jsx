import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiServices from '../apiServices/apiServices';

const Contact = () => {
  window.scrollTo(0, 0);
  const userRole = useSelector((state) => state.user.userRole);
  const navigate = useNavigate();
  const [contactFormData, setContactFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!userRole) {
      navigate('/home');
      toast.info('Please login for more');
    }
  }, [userRole, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!contactFormData.fullname) {
      formErrors.fullname = 'Full name is required';
    } else if (!nameRegex.test(contactFormData.fullname)) {
      formErrors.fullname = 'Full name can only contain letters and spaces';
    }
    if (!contactFormData.email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(contactFormData.email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (contactFormData.message.length > 500) {
      formErrors.message = 'Message cannot exceed 500 characters';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error('Please fix the errors in the form');
    } else {
      apiServices.sendContactUsEmail(contactFormData)
      .then((response)=>{
          console.log("response : " ,response)
          toast.success(response.data.message);
          setContactFormData({
            fullname: '',
            email: '',
            message: ''
          });
          setErrors({});
      })
      .catch((err)=>{
        console.error(err)
      })
      
    }
  };

  return (
    <div>
      <section className="py-6 bg-black text-white m-10">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x divide-redBorder">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span>Kochi, Kerala</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>1234567890</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>sportzone.sportsapp@gmail.com</span>
              </p>
            </div>
          </div>
          <form noValidate="" onSubmit={handleSubmit} className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
            <label className="block">
              <span className="mb-1">Full name</span>
              <input
                type="text"
                name="fullname"
                onChange={handleInputChange}
                value={contactFormData.fullname}
                placeholder="Enter Your Name"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-red-600 bg-black text-white border border-gray-700 px-10 py-4 hover:border-gray-400"
              />
              {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={contactFormData.email}
                placeholder="Enter Your Email"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-red-600 bg-black text-white border border-gray-700 px-10 py-4 hover:border-gray-400"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                rows="3"
                name="message"
                onChange={handleInputChange}
                value={contactFormData.message}
                className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-red-600 bg-black text-white border-gray-700 border py-6 hover:border-gray-400"
              ></textarea>
              {errors.message && <p className="text-red-500">{errors.message}</p>}
            </label>
            <button type="submit" className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 bg-red-600 text-white focus:ring-red-600 hover:ring-red-600">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
