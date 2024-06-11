import React from 'react';
import { useLocation } from 'react-router-dom';
import defaultProfileImage from '../../assets/images/userImage.jpg'
const experience = [{}, {}]

const ViewTrainerDetails = () => {
    const location = useLocation();
    const { trainer } = location.state || "no data";
    console.log("in view trainer", trainer);
    return (
        <div className='px-4 md:px-10 '>
            <div className="flex flex-col  lg:flex-row lg:space-x-8 ">
                {/* Left Section */}
                <div className="max-w-md   md:max-w-2xl p-6  bg-buttonBgColor text-textColor rounded-[20px] w-full lg:w-1/2 my-4 ">
                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="flex-shrink-0 w-44 h-44 sm:h-48 sm:w-48">
                            <img src={trainer.profileImage ? trainer.profileImage : defaultProfileImage} alt="Profile" className="object-contain object-center w-full h-full rounded-[20px] bg-white border-2 border-redBorder" />
                        </div>
                        <div className="flex flex-col space-y-5 sm:ml-4  w-full mt-6 sm:mt-0">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-semibold">{trainer.username}</h2>
                                <span className="text-lg md:text-lg text-textColor">{trainer.department ? trainer.department : 'not updated'}</span>
                            </div>
                            <div className="space-y-2 md:space-y-3 text-sm md:text-sm" >
                                <span className="flex items-center space-x-3 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-5 h-5 md:w-6 md:h-6 ">
                                        <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                                    </svg>
                                    <span className=" text-sm md:text-sm text-textColor">{trainer.email}</span>
                                </span>
                                <span className="flex items-center space-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-5 h-5 md:w-6 md:h-6">
                                        <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                                    </svg>
                                    <span className="text-sm md:text-sm text-textColor">{trainer.phone}</span>
                                </span>
                                <span className="flex items-center space-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-label="Location" className="w-5 h-5 md:w-6 md:h-6">
                                        <path  stroke="currentColor" stroke-width="38" d="M172.268 501.67c9.373 15.846 32.09 15.844 41.46 0C275.667 451.57 384 327.275 384 234.667 384 104.5 297.5 0 192 0 86.496 0 0 104.5 0 234.667c0 92.612 108.326 216.903 172.268 267.003zM192 272c-39.764 0-72-32.236-72-72s32.236-72 72-72 72 32.236 72 72-32.236 72-72 72z" />
                                    </svg>

                                    <span className="text-sm md:text-sm text-textColor">{trainer.phone}</span>
                                </span>
                                <hr className='p-4' />
                            </div>


                        </div>

                    </div>
                    <div className='flex flex-row border space-x-4 '>

                        <div className='flex flex-col w-48 border space-y-2 justify-start '>
                            <button className='btn rounded-[10px] w-full border border-redBorder bg-black scale-90 hover:scale-95'>Message</button>
                            <button className='btn rounded-[10px] w-full border border-redBorder bg-black scale-90 hover:scale-95 '>Videocall</button>
                        </div>
                        <div className='border-2  '>
                            <span className="flex items-center space-x-3">
                                <span className="text-sm md:text-lg text-textColor">Age:{trainer.age ? trainer.age : 'not '}</span><span className="pl-4 lg:pl-12 text-sm md:text-lg text-textColor">Gender:{trainer.gender ? trainer.gender : ''}</span>
                            </span>
                            <span className="flex items-center space-x-3">

                            </span>
                            <span className="flex items-center space-x-3">
                                <span className="text-sm md:text-lg text-textColor">Gender:</span>
                            </span>
                            <span className="flex items-center space-x-3">
                                <span className="text-sm md:text-lg text-textColor">Gender:</span>
                            </span>
                        </div>
                    </div>



                </div>

                {/* Right Section */}
                <div className="max-w-md md:max-w-2xl p-4 md:p-8 bg-buttonBgColor text-textColor rounded-[20px] w-full lg:w-1/2 my-4 ">
                    <div className="space-y-2">
                        <div>
                            <h2 className="text-2xl md:text-2xl font-semibold">About</h2>
                        </div>
                        <div className="space-y-2 md:space-y-4">
                            <span className="flex items-center space-x-2">
                                <span className="text-sm md:text-sm text-textColor">Additional info here Additional info here Additional info here Additional info here  here Additional info here Additional info here</span>
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-2xl font-semibold">Experience</h2>
                        </div>
                        <div className="space-y-2 md:space-y-4">
                            <span className="flex items-center space-x-2">
                                <span className="text-md md:text-md text-textColor">Additional info here Additional info here</span>
                            </span>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTrainerDetails;
