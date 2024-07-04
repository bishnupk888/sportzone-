import React, { useContext, useEffect, useState } from 'react';
import ChatComponent from './ChatComponent';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance/axiosInstance';
import chatImg from '../../assets/images/chatImage1.jpg'
import { format } from 'date-fns';
import { useSocket } from '../../context/SocketContext.jsx';


const ChatList = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const { messages,setMessages } = useSocket();
  


  const { userRole, userId } = useSelector((state) => state.user);
  console.log(userId, userRole);
  
 

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("fetching chats");
        // Fetch chats based on user role and user ID
        axiosInstance.get(`/api/chat/messages/${userRole}/${userId}`)
          .then((response) => {
            console.log(response.data.allChats);
            setAllChats(Array.isArray(response.data.allChats) ? response.data.allChats : []);
          })
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    if (userId && userRole) {
      fetchChats();
    }
  }, [userId, userRole,messages]);

 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  

  const handleClickOnSingleChat = (chatId, data) => {

    setChatId(chatId);
    setReceiverData(data);
    setViewChat(true);

  };


  const handleCloseChat = () => {
    setViewChat(false);
  };



  // Inline styles for scrollbar and dropdown menu
  const scrollContainerStyle = {
    overflowY: 'auto',
    height: 'calc(100vh - 9rem)',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none',  /* IE 10+ */
  };

  return (
    <>
      <div className="flex max-h-screen">
        <div className="ml-10 w-1/4 min-w-[300px]">
          {/* Sidebar Header */}
          <header className="p-4 border-b border-gray-500 flex justify-between items-center text-white">
            <h1 className="text-2xl font-semibold py-2">MESSAGES</h1>
          </header>

          {/* Contact List */}
          <div style={scrollContainerStyle}>
            {allChats.length ? (
              allChats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleClickOnSingleChat(chat._id, userRole === 'user' ? chat.trainer : chat.user)}
                  className="flex h-[80px] items-center mb-4 cursor-pointer hover:bg-zinc-800 p-2 rounded-md hover:border-b-2 hover:border-redBorder"
                >
                  <div className="w-12 h-12 rounded-full mr-3">
                    <img src={userRole === 'user' ? chat.trainer.profileImage : chat.user.profileImage} alt="User Avatar" className="w-12 h-12 rounded-full" />
                  </div>
                  <div className="flex-1 ">
                    <h2 className="text-lg text-gray-100 font-semibold pt-4">
                      {userRole === 'user' ? chat.trainer.username : chat.user.username}
                    </h2>
                    <p className="text-gray-400">
                      {chat.lastMessage.content.length > 30
                        ? chat.lastMessage.content.slice(0, 20) + '...'
                        : chat.lastMessage.content}
                    </p>
                    <p className='flex text-[10px] text-textColor justify-end'>{format(new Date(chat.lastMessage.createdAt), 'hh:mm a')}</p>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-white flex p-4">No Chats To Display !!</h3>
            )}
          </div>
        </div>
        {viewChat ? <ChatComponent chatId={chatId} receiverData={receiverData} handleClose={handleCloseChat} /> :
          <div className="flex-1 mr-4 ml-4 mb-4 justify-center items-center flex flex-col h-[85vh] bg-zinc-950 rounded-lg border border-gray-400">
              <img src={chatImg} alt="" className='max-w-[50%] opacity-65' />
              <p className='text-highlightTextColor  text-4xl font-bold lg:text-[30px] '> Start Conversation</p>
          </div>}
      </div>
    </>   
  );
};

export default ChatList;



