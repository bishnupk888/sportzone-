import React from 'react';
import { useNavigate } from 'react-router-dom';


const TrainerCard = ({ trainer }) => {
	
    const navigate = useNavigate()
  return (
    
    <>
	<style>
        {`

          .card-hover-effect {
            transition: transform 0.4s ease;
          }

          .card-hover-effect:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    <div onClick={() => navigate(`/user/view-trainer/${trainer._id}`, { state: { trainer } })} className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-buttonBgColor dark:text-textColor hover:bg-transparent hover:border card-hover-effect border-redBorder cursor-pointer">
	<img src={trainer.profileImage} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
	<div className="space-y-4 text-center divide-y dark:divide-gray-300">
		<div className="my-2 space-y-1">
			<h2 className="text-xl font-semibold sm:text-2xl">{trainer?.username}</h2>
			<p className="px-5 text-xs sm:text-base dark:text-textColor">{trainer?.department} specialist</p>
		</div>
		<div className="flex justify-center pt-2 space-x-4 align-center">
		</div>
	</div>
</div>
    </>
  );
};

export default TrainerCard;
