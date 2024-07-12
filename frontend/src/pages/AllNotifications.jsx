import React, { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi'; 
import { useSelector } from 'react-redux';
import apiServices from '../apiServices/apiServices';

const AllNotifications = () => {
  const [notifications,setNotifications] = useState([])
  const userId = useSelector((state) => state.user.userId)


  useEffect(()=>{
    window.scrollTo(0, 0);
    apiServices.getNotifications(userId)
    .then((response)=>{
      setNotifications(response.data.data)
      
    })
  },[userId])

  const transformDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const today = new Date();

    const inputDateFormatted = inputDate.toISOString().split('T')[0];
    const todayFormatted = today.toISOString().split('T')[0];

    if (inputDateFormatted === todayFormatted) {
        let hours = inputDate.getHours();
        const minutes = inputDate.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const hoursStr = hours.toString().padStart(2, '0');
        return `${hoursStr}:${minutes} ${ampm}`;
    } else {
        return inputDateFormatted;
    }
};

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black">
      <h1 className="text-3xl font-semibold text-gray-100 mt-10 mb-8">All Notifications</h1>
      <div className="max-w-[80%] w-full">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="relative flex items-start bg-buttonBgColor shadow-md rounded-lg p-4 mb-4"
          >
            {/* BiBell Icon */}
            <div className="flex-shrink-0">
              <BiBell className="w-6 h-6 text-gray-400 mr-4" />
            </div>
            {/* Notification Content */}
            <div className="flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-highlightTextColor">
                 Notification from {notification?.sender}
                </span>
                
              </div>
              <div className="text-sm font-normal text-textColor mb-2">
                <span className="font-semibold">{notification?.username} </span>
                {notification?.content}
              </div>
            </div>
            {/* Absolute positioning for time */}
            <div className="absolute bottom-2 right-3 text-xs text-gray-500">
              {transformDate(notification?.createdAt)}
            </div>
          </div>
        ))}
        {notifications?.length === 0 && (
          <div className="p-4 text-gray-500 text-center">
            No notifications available
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotifications;
