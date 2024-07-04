// src/context/SocketContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../utils/socket';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('newMessage', async(data) => {
        console.log('newMessage listening   = ',data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);


  

  return (
    <SocketContext.Provider value={{ messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
};
