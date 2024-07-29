import React, { useEffect, useState } from 'react';
import ChatComponent from "../../components/chat component/ChatComponent";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiServices from '../../apiServices/apiServices';

const ChatToTrainer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [trainerData, setTrainerData] = useState(null);
    const [chatId, setChatId] = useState(null);
    const { userId, userRole } = useSelector((state) => state.user);

    

    const handleClose = () => {
        navigate(-1);
    };

    const trainer = location.state;

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await apiServices.getChatByUserIdAndTrainerId(trainer._id,userId) 
                if (response.data.chatId) {
                    setChatId(response.data.chatId);
                } 
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        if (userId && userRole) {
            fetchChat();
        }
    }, [userId, userRole, trainer._id]);

    useEffect(() => {
        if (trainer && userId) {
            setTrainerData(trainer);
        }
    }, [userId, trainer]);



    return (
        <div className='mx-10 mb-10'>
            {trainerData && <ChatComponent handleClose={handleClose} receiverData={trainerData} chatId={chatId}  />}
        </div>
    );
};

export default ChatToTrainer;     
      