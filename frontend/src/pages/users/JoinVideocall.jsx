
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/images/logo/logo.png';
import bgImage from '../../assets/images/background/20215.jpg'; 

const JoinVideocall = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');


  const handleInputChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!roomId.length){
      toast.error("enter room Id")
    }
    else{
      navigate('/user/videocall',{state:roomId})
    }
    // axiosInstance.post('/api/videocall/join-room', { roomId: roomId })
    //   .then((response) => {
    //     toast.success("Successfully joined the room");
    //     navigate(`/videocall/room/${roomId}`);
    //   })
    //   .catch((error) => {
    //     toast.error("Invalid Room ID or room does not exist");
    //     console.error("Error while joining room:", error);
    //   });
  };

  return (
    <>
      <style>
        {`
          .bgImage {
            background-image: url(${bgImage}); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
            background-size: cover; /* Ensures the image covers the entire element */
            background-position: center; /* Centers the image within the element */
            background-repeat: no-repeat; /* Prevents the image from repeating */
          }

          .button-hover-effect {
            transition: transform 0.3s ease;
          }

          .button-hover-effect:hover {
            transform: scale(1.05);
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .fade-in {
            animation: fadeIn 1.5s ease-in-out;
          }
        `}
      </style>
      <div className="bgImage absolute top-0 bottom-0 bg-black h-screen w-screen flex justify-center items-center">
        <div className='flex items-center justify-center w-full min-h-screen bg-black bg-opacity-50 '>
          <div className="flex-col w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:text-white bg-black hover:bg-opacity-100 border hover:border-r-4 hover:border-b-4 border-redBorder button-hover-effect m-10">
            <div className="flex flex-col items-center">
              <img src={logo} alt="logo" className="h-24 mb-4" />
              <h2 className="mb-3 lg:text-4xl md:text-2xl text-lg font-semibold text-center">JOIN SESSION</h2>
              <br />
            </div>
            <form noValidate="" action="" className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <input type="text" name="roomId" id="roomId" placeholder="Enter Room ID" value={roomId} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md bg-black text-white hover:scale-95 focus:scale-100" />
                </div>
              </div>
              <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-green-800 hover:bg-green-600 dark:text-gray-50 button-hover-effect">Join Session</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinVideocall;