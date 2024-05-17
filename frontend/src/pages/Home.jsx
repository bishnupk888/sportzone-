import React from 'react';
import hero2Img from '../assets/images/messi.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className='hero_section pt-[60px] xl:h-[800px]'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-[30px] lg:gap-[90px] items-center justify-between'>
            {/* _______hero contents _____*/}
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[800px] p-[30px] lg:px-[50px] lg:py-[100px]'>
                <h1 className='text-[40px] leading-[46px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[60px] lg:leading-[70px]'>
                  "Elevate Your Game, Dominate the Field!"
                </h1>
                <p className='text_para lg:w-[600px] mt-[20px]'>
                  Calling all sports enthusiasts and professionals! Register with us to connect, learn, and grow.
                </p>
                <Link to='/register'>
                <button className='btn text-textColor mt-[20px] lg:ml-[450px] border-redBorder border-[2px] rounded-[10px]'>
                  Join now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* hero section end*/}

      <section className='hero_section2 bg-black pt-[60px] xl:h-[800px]'>
      <div className='container bg-black mx-auto px-4   overflow-hidden h-[90%] items-center justify-between'>
          <div className='flex flex-col lg:flex-row  items-center justify-between' >
            {/* _______hero image _____*/}
         <div className='relative max-h-[500px] h-auto lg:h-[500px] w-auto md:h-[450px] md:mt-[50px] sm:h-[450px] sm:mt-[20px] flex items-center justify-center mt-[150px]'>
          <div className="absolute inset-0 bg-black opacity-25"></div>
               <img src={hero2Img} alt="" className='w-full h-full object-cover lg:w-auto lg:h-full blend-overlay' />
          </div>


            {/* _______hero contents _____*/}
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[800px] p-[30px] lg:px-[50px] lg:py-[100px]'>
                <h1 className='text-[40px] leading-[46px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[60px] lg:leading-[70px]'>
                  “Be the greatest of your game”
                </h1>
                {/* <div className='border-redBorder border-[2px] text-white'>
                  <h1>expert trainers</h1>
                  <h1>2</h1>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
