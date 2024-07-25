import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiBell } from 'react-icons/bi';
import apiServices from '../../apiServices/apiServices';


const NotificationsPanel = ({ notifications, setViewNotification, viewNotification, userRole, userId , setUnreadNotificationCount }) => {
  const navigate = useNavigate()
  const transformDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const today = new Date();
    const inputDateFormatted = inputDate.toISOString().split('T')[0];
    const todayFormatted = today.toISOString().split('T')[0];
  
    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, '0');
    const timeStr = `${hoursStr}:${minutes} ${ampm}`;
  
    if (inputDateFormatted === todayFormatted) {
      // If the date is today, return only the time
      return timeStr;
    } else {
      // Otherwise, return the date with time
      return `${inputDateFormatted} ${timeStr}`;
    }
  };
  useEffect(() => {
    const markAsRead = async () => {
      try {
        await apiServices.markNotificationsAsRead(userId).then((response)=>{
          setUnreadNotificationCount(0)
        })
  
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    };

    markAsRead();
  }, [userId,userRole]);
  

  return (
    <div className="relative inline-block text-left z-1000 mr-[10%] cursor-pointer">
      {viewNotification && (
        <div
          className="fixed right-10 w-80 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50 max-h-[400px] overflow-y-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className='flex justify-between items-center'>
            <h1 className="text-start text-white text-lg font-semibold p-3">Notifications</h1>
            <button onClick={() => {
              navigate(`/${userRole}/notifications`)
              setViewNotification(false)
            }} className='text-white flex flex-col top-3 border border-redBorder rounded-md mr-14 px-4 py-1 hover:scale-95 hover:border-red-600'>
              show all
            </button>
          </div>
          <button
            type="button"
            className="absolute top-3 right-3 bg-buttonBgColor justify-center items-center flex-shrink-0 text-gray-100 hover:text-red-600 rounded-lg hover:scale-105  p-1.5 hover:bg-black hover:border-redBorder inline-flex h-8 w-8"
            onClick={() => setViewNotification(false)}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          <div className="py-1" role="none">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  onClick={() =>{
                    navigate(`/${userRole}/notifications`)
                    setViewNotification(false)
                  }}
                  id={`toast-notification-${index}`}
                  className="w-full max-w-xs p-2 text-textColor bg-buttonBgColor rounded-lg shadow mb-2 hover:bg-neutral-950 hover:border-b-2  border-redBorder hover:border "
                  role="alert"
                >
                  <div className="flex items-center mb-1">
                    <BiBell className="mr-2" />
                    <span className="text-sm font-semibold text-gray-100">
                      Notification From {notification.sender}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="ms-3 text-sm font-normal">
                      <div className="text-sm font-semibold text-gray-900">
                        {notification?.username}
                      </div>
                      <div className="text-sm font-normal text-textColor">
                        {notification?.content}
                      </div>
                      <span className="text-xs font-medium text-red-900">
                        {transformDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500 text-center">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
