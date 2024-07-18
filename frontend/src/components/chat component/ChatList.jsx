import React, { useEffect, useState } from 'react';
import ChatComponent from './ChatComponent';
import { useSelector } from 'react-redux';
import chatImg from '../../assets/images/chatImage1.jpg';
import { format, differenceInHours } from 'date-fns';
import { useSocket } from '../../context/SocketContext';
import apiServices from '../../apiServices/apiServices';

const ChatList = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [receiverData, setReceiverData] = useState(null);

  const { messages, markMessageAsRead } = useSocket(); // Access context values

  const { userRole, userId } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("fetching chats");
        const response = await apiServices.getAllChat(userRole,userId) ;
        console.log(response.data.allChats);
        setAllChats(Array.isArray(response.data.allChats) ? response.data.allChats : []);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    if (userId && userRole) {
      fetchChats();
    }
  }, [userId, userRole, messages]); // Include messages in dependencies to update chats on new messages arrival

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOnSingleChat = async (chatId, data) => {
    setChatId(chatId);
    setReceiverData(data);
    setViewChat(true);
  };

  const handleCloseChat = () => {
    setViewChat(false);
  };

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
          <header className="p-4 border-b border-gray-500 flex justify-between items-center text-white">
            <h1 className="text-2xl font-semibold py-2">MESSAGES</h1>

          </header>
          <div style={scrollContainerStyle}>
            {allChats.length ? (
              allChats.map((chat, index) => {
                const lastMessageDate = new Date(chat.lastMessage.createdAt);
                const now = new Date();
                const hoursDifference = differenceInHours(now, lastMessageDate);
                const formattedDate = hoursDifference > 24
                  ? format(lastMessageDate, 'yyyy-MM-dd')
                  : format(lastMessageDate, 'hh:mm a');

                return (
                  <div
                    key={index}
                    onClick={() => handleClickOnSingleChat(chat._id, userRole === 'user' ? chat?.trainer : chat?.user)}
                    className={`flex h-[80px] items-center mb-4 cursor-pointer p-2 rounded-md ${chat?.lastMessage?.isRead ? 'bg-gray-200' : 'hover:bg-zinc-800 hover:border-b-2 hover:border-redBorder'}`}
                  >
                    <div className="w-12 h-12 rounded-full mr-3">
                      
                      <img
                        src={userRole === 'user' ? chat?.trainer?.profileImage : chat?.user?.profileImage}
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg text-gray-100 font-semibold pt-4">
                        {userRole === 'user' ? chat?.trainer?.username : chat?.user?.username}
                      </h2>
                      <p className={`text-gray-400 mb-2 ${chat?.lastMessage?.isRead ? "text-gray-400" : "text-white font-semibold "}`}>
                        {chat.lastMessage.content.length > 30
                          ? chat?.lastMessage?.content.slice(0, 20) + '...'
                          : chat?.lastMessage?.content}
                      </p>
                      <div className="flex items-center justify-end mb-4">
                        <div className="flex items-center">
                          {/* {!chat.lastMessage.isRead && (
                            <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                          )} */}
                          <p className="text-[10px] text-textColor">{formattedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className="text-white flex p-4">No Chats To Display !!</h3>
            )}
          </div>
        </div>
        {viewChat ? (
          <ChatComponent chatId={chatId} receiverData={receiverData} handleClose={handleCloseChat} />
        ) : (
          <div className="flex-1 mr-4 ml-4 mb-4 justify-center items-center flex flex-col h-[85vh] bg-zinc-950 rounded-lg border border-gray-400">
            <img src={chatImg} alt="" className='max-w-[50%] opacity-65' />
            <p className='text-highlightTextColor text-4xl font-bold lg:text-[30px]'>Start Conversation</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatList;