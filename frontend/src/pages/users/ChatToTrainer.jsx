import React, { useEffect, useState } from 'react';
import ChatComponent from "../../components/chat component/ChatComponent";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosInstance/axiosInstance';

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
                const response = await axiosInstance.get(`/api/chat/getchat/${trainer._id}/${userId}`);
                console.log("response when direct message", response);

                if (response.data.chatId) {
                    setChatId(response.data.chatId);
                } else {
                    console.log("No chat found...");
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

    console.log('receiverData tr: ', trainerData);

    return (
        <div className='mx-10 mb-10'>
            {trainerData && <ChatComponent handleClose={handleClose} receiverData={trainerData} chatId={chatId}  />}
        </div>
    );
};

export default ChatToTrainer;     
      