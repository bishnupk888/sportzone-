import React, { useEffect, useState } from 'react';
import hero2Img from '../assets/images/messi.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../axiosInstance/axiosInstance';
import { toast } from 'react-toastify';
import BouncingBallLoader from '../components/Loader/BouncingBallLoader';

// import'../'
const Home = () => {
  const userRole = useSelector((state) => state.user.userRole)
  const navigate = useNavigate()
  const [userData,setUserData] = useState([])
  const [loaderActive,setLoaderActive] = useState(false) 
  useEffect(()=>{
    try {
      setLoaderActive(true)
      axiosInstance.get('/api/users/get-trainers').then((response)=>{
        setUserData(response.data.data)
     
        setLoaderActive(false)

      }).catch((error)=>{

        console.error(error);
        setLoaderActive(false)

      })
    } catch (error) {
      console.error(error);
    }
  },[])
  if(loaderActive){
    return <BouncingBallLoader/>
  }
   
  return (
    <>
  <style>{`
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
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-[30px] lg:gap-[90px] items-center justify-between'>
            {/* _______hero contents _____*/}
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[900px] p-[30px] lg:px-[50px] lg:py-[10px]'>
                <h1 className='text-[40px] leading-[56px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[80px] lg:leading-[110px]'>
                  “Elevate Your Game, <span className=' heartbeat-effect lg:text-[100px] text-redBorder '> Dominate </span> the Field!”
                </h1>
                <p className='text_para  lg:w-[800px] lg:leading-[50px] mt-[55px] text-[26px]'>
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
      {/* hero section end*/}    
{userRole ==='trainer'?'':<section className="py-6 dark:bg-black dark:text-textColor mt-10">       
	<div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-4">
		<p className="p-2 text-sm font-medium tracking-wider text-center uppercase"> our Experts </p>
		<h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Talented Trainers With Us</h1>
		<div className="flex flex-row flex-wrap-reverse justify-center mt-8">

    {userData.filter((data)=>data.isVerified===true).slice(0,6).map((trainer, index) => (
        <div key={trainer._id} onClick={()=>{
          if(userRole){
            navigate('/user/view-trainer', { state: { trainer: trainer } })
          }else{
            toast.warning('Login for more')
          }
          }} className="flex flex-col justify-center w-full px-8 mx-6 my-12 text-center rounded-md md:w-96 lg:w-80 xl:w-64 dark:bg-buttonBgColor dark:text-gray-100 cursor-pointer">
				<img alt="" className="self-center flex-shrink-0 w-24 h-24 -mt-12 bg-center bg-cover rounded-full dark:bg-gray-500 border-2 border-redBorder" src={trainer.profileImage} />
				<div className="flex-1 my-4">
					<p className="text-xl font-semibold leading-snug">{trainer.username}</p>
					<p>{trainer.department?trainer.department:''}</p>
				</div>	
			</div>
       
      ))}
		</div>
	</div>
</section>}
      <section className='hero_section2 bg-black   xl:h-[800px]'>
        <div className='container bg-black mx-auto px-4   overflow-hidden h-[90%] items-center justify-between'>
          <div className='flex flex-col lg:flex-row  items-center justify-between' >
            {/* _______hero image _____*/}
            <div className='relative max-h-[500px]  h-auto lg:h-[500px] w-auto md:h-[450px]  sm:h-[450px] flex items-center justify-center mt-[150px]'>
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <img src={hero2Img} alt="" className='w-full h-full object-cover lg:w-auto lg:h-full blend-overlay' />
            </div>


            {/* _______hero contents _____*/}
            <div className='w-full lg:w-auto'>
              <div className='w-full lg:w-[800px] p-[30px] lg:px-[50px] lg:py-[100px]'>
                <h1 className='mt-[50px] text-[40px] leading-[46px] text-textColor font-[800] md:text-[50px] md:leading-[60px] lg:text-[70px] lg:leading-[110px]'>
                  “Be The <span className=' text-redBorder'>Greatest</span> Of Your Game”
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
