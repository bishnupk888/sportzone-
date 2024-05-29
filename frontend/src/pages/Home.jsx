import React from 'react';
import hero2Img from '../assets/images/messi.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const userRole = useSelector((state) => state.user.userRole);

  return (
    <>
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          20%, 80% { transform: scale(1.02); }
        }

        .heartbeat-effect {
          display: inline-block;
          animation: heartbeat 1.0s ease-in-out infinite;
        }
      `}</style>

      <section className='hero_section pt-[60px] xl:h-[800px]'>
        <div className='container mx-auto px-4 lg:max-w-screen-xl'>
          <div className='flex flex-col lg:flex-row gap-[30px] lg:gap-[90px] items-center justify-between'>
            {/* Hero contents */}
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[900px] p-[30px] lg:px-[50px] lg:py-[10px]'>
                <h1 className='text-[40px] leading-[56px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[80px] lg:leading-[110px]'>
                  “Elevate Your Game, <span className=' heartbeat-effect lg:text-[100px] text-redBorder '> Dominate </span> the Field!”
                </h1>
                <p className='text_para lg:w-[800px] lg:leading-[50px] mt-[55px] text-[26px]'>
                  Calling all sports enthusiasts and professionals! Register with us to <span className='text-bold text-white'>connect, learn, and grow</span>.
                </p>
                {userRole === '' && (
                  <Link to='/register'>
                    <button className='btn text-textColor mt-[30px] lg:ml-[400px] lg:mt-[40px] border-redBorder border-[2px] rounded-[10px] bg-transparent hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] hover:scale-105 text-lg'>
                      <span className=''>JOIN NOW</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero section end */}

      <section className='hero_section2 bg-black pt-[60px] xl:h-[800px]'>
        <div className='container mx-auto px-4 lg:max-w-screen-xl'>
          <div className='flex flex-col lg:flex-row  items-center justify-between'>
            {/* Hero image */}
            <div className='relative max-h-[500px] h-auto lg:h-[500px] w-auto md:h-[450px] md:mt-[50px] sm:h-[450px] sm:mt-[20px] flex items-center justify-center mt-[150px]'>
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <img src={hero2Img} alt="" className='w-full h-full object-cover lg:w-auto lg:h-full blend-overlay' />
            </div>

            {/* Hero contents */}
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[800px] p-[30px] lg:px-[50px] lg:py-[100px]'>
                <h1 className='mt-[50px] text-[40px] leading-[46px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[70px] lg:leading-[110px]'>
                  “Be The <span className=' text-redBorder'>Greatest</span> Of Your Game”
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
