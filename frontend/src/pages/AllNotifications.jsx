import React, { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi'; 
import { useSelector } from 'react-redux';
import apiServices from '../apiServices/apiServices';

const AllNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    window.scrollTo(0, 0);

    apiServices.getNotifications(userId)
      .then((response) => {
        setNotifications(response.data.data);
      });
  }, [userId]);

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black">
      <h1 className="text-3xl font-semibold text-gray-100 mt-10 mb-8">All Notifications</h1>
      <div className="max-w-[80%] w-full shadow-md rounded-lg" style={{ overflow: 'hidden' }}>
        <div
          style={{
            height: '600px',
            overflowY: 'auto',
            scrollbarWidth: 'none', /* For Firefox */
            msOverflowStyle: 'none' /* For Internet Explorer and Edge */
          }}
          onScroll={(e) => e.currentTarget.style.scrollbarWidth = 'none'} // Hide scrollbar
        >
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="relative flex items-start bg-buttonBgColor rounded-lg p-4 mb-4 hover:bg-neutral-950 hover:border-b-2 hover:border-r-2 border-redBorder"
            >
              <div className="flex-shrink-0">
                <BiBell className="w-6 h-6 text-gray-400 mr-4" />
              </div>
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
    </div>
  );
};

export default AllNotifications;
