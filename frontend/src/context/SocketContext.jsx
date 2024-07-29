


import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../utils/socket';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(false)


  useEffect(() => {
    socket.on('newMessage', async(data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('typing', (data) => {
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
