// import React, { createContext, useContext, useState, useEffect } from 'react';
// import socket from '../utils/socket';

// const SocketContext = createContext();

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [onlineStatus, setOnlineStatus] = useState({});
//   const [typingStatus, setTypingStatus] = useState({});

//   useEffect(() => {
//     // Listen for new messages
//     socket.on('newMessage', (data) => {
//       console.log('newMessage listening = ', data);
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     // Listen for user status updates
//     socket.on('userStatus', (data) => {
//       console.log('userStatus listening = ', data);
//       setOnlineStatus((prevStatus) => ({
//         ...prevStatus,
//         [data.userId]: data.status
//       }));
//     });

//     // Listen for typing status updates
//     socket.on('typing', (data) => {
//       console.log('typing status = ', data);
//       setTypingStatus((prevStatus) => ({
//         ...prevStatus,
//         [data.chatId]: { userId: data.userId, isTyping: data.isTyping }
//       }));
//     });

//     // Cleanup listeners on component unmount
//     return () => {
//       socket.off('newMessage');
//       socket.off('userStatus');
//       socket.off('typing');
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ messages, setMessages, onlineStatus, typingStatus }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };



// src/context/SocketContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../utils/socket';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false)


  useEffect(() => {
    socket.on('newMessage', async(data) => {
        console.log('newMessage listening   = ',data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('typing', (data) => {
            console.log('typing status = ', data);
            setTypingStatus(true)
          });
    return () => {
      socket.off('newMessage');
      socket.off('typing');
    };
  }, []);


  

  return (
    <SocketContext.Provider value={{ messages, setMessages, typingStatus }}>
      {children}
    </SocketContext.Provider>
  );
};
