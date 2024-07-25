import React, { useEffect, useState } from 'react';
import hero2Img from '../assets/images/messi.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BouncingBallLoader from '../components/loader/BouncingBallLoader';
import apiServices from '../apiServices/apiServices';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const userRole = useSelector((state) => state.user.userRole);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loaderActive, setLoaderActive] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await apiServices.fetchAllTrainers();
        setUserData(response.data.data);
        setLoaderActive(false);
      } catch (error) {
        console.error(error);
        setLoaderActive(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          20%, 80% { transform: scale(1.02); }
        }
        .button-hover-effect {
          transition: transform 0.3s ease;
        }
        .button-hover-effect:hover {
          transform: scale(1.00);
        }
        .heartbeat-effect {
          display: inline-block;
          animation: heartbeat 1.0s ease-in-out infinite;
        }
      `}</style>
    {loaderActive ? <BouncingBallLoader/> : 
      <> 
      <section className='hero_section pt-[60px] xl:h-[800px]'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-[30px] lg:gap-[90px] items-center justify-between'>
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[900px] p-[30px] lg:px-[50px] lg:py-[10px]'>
                <h1 className='text-[40px] leading-[56px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[80px] lg:leading-[110px]'>
                  “Elevate Your Game, <span className=' heartbeat-effect bg-gradient-to-b from-red-600 via-red-800 to-black inline-block text-transparent bg-clip-text'> Dominate </span> the Field!”
                </h1>
                <div className='lg:mt-28'>
                <p className='text-neutral-500 lg:w-[800px] lg:leading-[50px] mt-[55px] text-[26px]'>
                  Calling all sports enthusiasts and professionals! Register with us to connect, learn, and grow.
                </p>
                {userRole === '' && (
                  <Link to='/register'>
                    <button className='btn scale-95 text-white mt-[30px] lg:ml-[550px] lg:mt-[0px] border-redBorder hover:border rounded-[10px] bg-gradient-to-r from-red-950 via-red-800 via-red-600 via-red-500 to-red-950 hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]  button-hover-effect   '>
                      <span>JOIN NOW</span>
                    </button>
                  </Link>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {userRole === 'trainer' ? '' : (
        <section className="py-6 dark:bg-black dark:text-textColor mt-10">
          <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-4">
            <p className="p-2 text-sm lg:text-2xl font-medium tracking-wider text-center uppercase"> our Experts </p>
            <h1 className="lg:text-[60px] font-bold leading-none text-center text-4xl lg:mb-10">Talented Trainers With Us</h1>
            <div className="flex flex-row flex-wrap-reverse justify-center mt-10">
              {userData && Array.isArray(userData) && userData.filter((data) => data.isVerified === true).slice(0, 6).map((trainer) => (
                <div key={trainer._id} onClick={() => {
                  if (userRole) {
                    navigate(`/user/view-trainer/${trainer._id}`, { state: { trainer: trainer } });
                  } else {
                    toast.warning('Login for more');
                  }
                }} className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 h-40 lg:w-80 xl:w-64 dark:bg-neutral-900  dark:text-gray-300 cursor-pointer hover:bg-neutral-950 hover:scale-105 hover:border border-redBorder">
                  <img alt="" className="self-center flex-shrink-0 w-28 h-28 -mt-12 bg-center bg-cover rounded-full dark:bg-gray-500 border-2 border-redBorder" src={trainer.profileImage} />
                  <div className="flex-1 my-4">
                    <p className="text-xl font-semibold leading-snug">{trainer.username}</p>
                    <p className='text-gray-500'>{trainer.department ? trainer.department : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section ref={ref} className="p-10 dark:bg-black dark:text-gray-300  rounded-2xl">
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3 mt-20">
          <div className="flex flex-col justify-start p-10 border-b-2 border-redBorder lg:mx-6 rounded-lg">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <><CountUp end={500} duration={2.5} /><span className='text-redBorder'>+</span></>}
            </p>
            <p className="text-lg text-textColor">ATHLETES REGISTERED</p>
          </div>
          <div className="flex flex-col justify-start p-10 border-b-2 border-redBorder lg:mx-6 rounded-lg">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <><CountUp end={100} duration={2.5} /><span className='text-redBorder'>+</span></>}
            </p>
            <p className="text-lg text-textColor">VERIFIED TRAINERS</p>
          </div>
          <div className="flex flex-col justify-start p-10 border-b-2 border-redBorder lg:mx-6 rounded-lg">
            <p className="text-4xl font-bold leading-none lg:text-6xl">
              {inView && <><CountUp end={300} duration={2.5} /><span className='text-redBorder'>+</span></>}
            </p>
            <p className="text-lg text-textColor">SUCCESSFUL BOOKINGS</p>
          </div>
        </div>
      </section>
      <section className='hero_section2 bg-black xl:h-[800px]'>
        <div className='container bg-black mx-auto px-4 overflow-hidden h-[90%] items-center justify-between'>
          <div className='flex flex-col lg:flex-row items-center justify-between'>
            <div className='relative max-h-[500px] h-auto lg:h-[500px] w-auto md:h-[450px] sm:h-[450px] flex items-center justify-center mt-[150px]'>
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <img src={hero2Img} alt="" className='w-full h-full object-cover lg:w-auto lg:h-full blend-overlay' />
            </div>

            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[800px] p-[30px] lg:px-[50px] lg:py-[100px]'>
                <h1 className='mt-[50px] text-[40px] leading-[46px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[70px] lg:leading-[110px]'>
                  “Be The <span className='text-redBorder'>Greatest</span> Of Your Game”
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
      }
      
    </>
  );
};

export default Home;
