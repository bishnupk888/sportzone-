// src/components/Chat/ChatComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { format } from 'date-fns';
import socket from '../../utils/socket.js';
import { useSocket } from '../../context/SocketContext.jsx';

const ChatComponent = ({  handleClose, receiverData ,chatId }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { userId, userRole, userImage } = useSelector((state) => state.user);
  // const { sendMessage } = useSocket();
  const {messages, setMessages} = useSocket()
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (chatId) {
      axiosInstance.get(`/api/chat/${chatId}`)
        .then((response) => {
          setMessages(response.data.messages);
        })
        .catch((error) => {
          toast.error('error fetching chat');
        });
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const message = {
      chatId,
      senderType: userRole,
      senderId: userId,
      content: newMessage,
    };

    const chatData = {
      userId: userRole === 'user' ? userId : receiverData._id,
      trainerId: userRole === 'trainer' ? userId : receiverData._id,
      message
    };
    console.log('chatData == ',chatData);
    try {
        socket.emit('newMessage', chatData, async (data) => {
          console.log('Sending message on ChatComponent = ',data)
          setMessages((prevMessages) => [...prevMessages, data]);
        });

    } catch (error) {
      console.error('Error sending message:', error);
    }

    setNewMessage('');
  };

  return (
    <div className="flex-1 mr-4 ml-4 mb-4 p-2 sm:p-4 justify-between flex flex-col h-[85vh] bg-zinc-950 rounded-lg border border-gray-400">
      <div className="flex sm:items-center justify-between border-b border-gray-500">
        <div className="relative flex items-center space-x-4">
          <div className="relative pb-2">
            <img
              src={receiverData.profileImage}
              alt="trainer image"
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-100 mr-3">{receiverData.username}</span>
            </div>
            <span className="text-md text-textColor pb-2">{receiverData.department} {userRole === 'user' ? 'trainer' : ''}</span>
          </div>
        </div>
        <button className="text-white mb-4 hover:text-red-700 hover:font-bold" onClick={() => handleClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto h-full"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="chat-message p-2">
            <div className={`flex items-end ${message.senderId === userId ? 'justify-end' : ''}`}>
              <div
                className={`flex flex-col space-y-2 text-lg max-w-xs mx-2 ${message.senderId === userId ? 'order-1 items-end' : 'order-2 items-start'}`}
              >
                <div>
                  <span
                    className={`relative px-4 py-2 rounded-lg inline-block max-w-[400px] min-w-[100px] break-words ${message.senderId === userId
                        ? 'rounded-br-none bg-gray-900 text-gray-100 border border-red-700'
                        : 'rounded-bl-none bg-gray-700 text-gray-100 border border-red-700'}`}
                  >
                    {message.content}
                    <span
                      className='absolute right-2 bottom-1 text-white text-[8px]'
                      style={{ transform: 'translateY(100%)' }}
                    >
                      {format(new Date(message.createdAt), 'hh:mm a')}
                    </span>
                  </span>
                </div>
              </div>
              <img
                src={message.senderId === userId ? userImage : receiverData.profileImage}
                alt="Profile"
                className={`w-6 h-6 rounded-full border border-redBorder ${message.senderId === userId ? 'order-2' : 'order-1'}`}
              />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-2">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Type your message!"
            className="w-full focus:outline-none focus:placeholder-gray-300 text-gray-100 placeholder-zinc-400 pl-12 bg-zinc-900 hover:bg-zinc-800 rounded-md py-3 border border-redBorder"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex m-2">
            <button
              type="button"
              onClick={handleSendMessage}
              className="inline-flex justify-center items-center p-2 text-blue-600 rounded-lg cursor-pointer text-blue-500 hover:text-red-700 hover:bg-gray-700 hover:scale-110"
            >
              <svg
                className="w-6 h-6 transform rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;



