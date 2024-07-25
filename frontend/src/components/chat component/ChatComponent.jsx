import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../utils/socket.js";
import { useSocket } from "../../context/SocketContext.jsx";
import apiServices from "../../apiServices/apiServices.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debounce from 'lodash/debounce';
import {
  faImage,
  faSmile,
  faMicrophone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { format, isBefore, subDays } from "date-fns";
import CustomAudioPlayer from "../audioComponent/CustomAudioPlayer.jsx";

const ChatComponent = ({ handleClose, receiverData, chatId }) => {
  const [newMessage, setNewMessage] = useState("");
  const [newFile, setNewFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { userId, userRole, userImage } = useSelector((state) => state.user);
  const { messages, setMessages } = useSocket();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);

    if (isBefore(messageDate, subDays(now, 1))) {
      return format(messageDate, "MM/dd/yyyy");
    } else {
      return format(messageDate, "hh:mm a");
    }
  };

  const fetchChatMessages = () => {
    if (chatId) {
      apiServices
        .getChat(chatId)
        .then((response) => {
          setMessages(response.data.messages);
        })
        .catch((error) => {
          toast.error("Error fetching chat");
        });
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    setNewMessage("");
    fetchChatMessages();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchChatMessages();
  }, [receiverData]);

  const handleEmoji = async (e) => {
    setNewMessage((prev) => prev + e.emoji);
    setIsEmojiOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !newFile) return;

    const message = {
      chatId,
      senderType: userRole,
      senderId: userId,
      content: newMessage,
      image: fileType === "image" ? newFile : "",
      video: fileType === "video" ? newFile : "",
      audio: fileType === "audio" ? newFile : "",
    };

    const chatData = {
      userId: userRole === "user" ? userId : receiverData._id,
      trainerId: userRole === "trainer" ? userId : receiverData._id,
      message,
    };

    try {
      socket.emit("newMessage", chatData, async (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
    setNewFile("");
    setFileType("");
  };

  const handleFileUpload = async (e) => {
    const fileType = e.target.name;

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const uploadUrl =
      fileType === "image"
        ? `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
        : fileType === "video"
        ? `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`
        : `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setNewFile(data.secure_url);
        const url = data.secure_url;

        const message = {
          chatId,
          senderType: userRole,
          senderId: userId,
          content: newMessage || "",
          image: fileType === "image" ? url : "",
          video: fileType === "video" ? url : "",
          audio: fileType === "audio" ? url : "",
        };

        const chatData = {
          userId: userRole === "user" ? userId : receiverData._id,
          trainerId: userRole === "trainer" ? userId : receiverData._id,
          message,
        };

        try {
          socket.emit("newMessage", chatData, async (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
          });
        } catch (error) {
          console.error("Error emitting new message:", error);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setNewMessage("");
    setNewFile("");
    setFileType("");
  };

  const handleStopTyping = () => {
        socket.emit('stopTyping', { userId, recieverId: receiverData._id });
    };

    const debounceStopTyping = useRef(
        debounce(handleStopTyping, 1000)
    ).current;

    useEffect(() => {
        debounceStopTyping(); 

        return () => {
            debounceStopTyping.cancel(); 
        };
    }, [newMessage]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value)
    socket.emit('typing',{userId,recieverId:receiverData._id})
  };
   
   
  return (
    <div className="flex-1 mr-4 ml-4 mb-4 p-2 sm:p-4 justify-between flex flex-col h-[85vh] bg-zinc-950 rounded-lg border border-gray-400">
      <div className="flex sm:items-center justify-between border-b border-gray-500">
        <div className="relative flex items-center space-x-4">
          <div className="relative pb-2">
            <img
              src={receiverData?.profileImage}
              alt="trainer image"
              className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-100 mr-3">
                {receiverData?.username}
              </span>
            </div>
            <span className="text-md text-textColor pb-2">
              {receiverData?.department} {userRole === "user" ? "trainer" : ""}
            </span>
          </div>
        </div>
        <button
          className="text-white mb-4 hover:text-red-700 hover:font-bold"
          onClick={() => handleClose()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto h-full "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="chat-message p-2">
            <div
              className={`flex items-end ${
                message.senderId === userId ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex flex-col space-y-2 text-lg max-w-xs mx-2 ${
                  message.senderId === userId
                    ? "order-1 items-end"
                    : "order-2 items-start"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    message.senderId === userId ? "items-end" : "items-start"
                  }`}
                >
                  {message.image && (
                    <div className="relative">
                      <img
                        src={message.image}
                        alt="Message"
                        className="max-w-[400px] max-h-[300px] object-cover rounded-lg mb-2 border border-redBorder"
                      />
                      <span
                        className="absolute right-2 bottom-1 text-white text-[8px]"
                        style={{ transform: "translateY(100%)" }}
                      >
                        {formatDate(new Date(message.createdAt))}
                      </span>
                    </div>
                  )}
                  {message.video && (
                    <div className="relative">
                      <video
                        src={message.video}
                        controls
                        className="max-w-[400px] max-h-[300px] rounded-lg mb-2 border border-redBorder"
                      />
                      <span
                        className="absolute right-2 bottom-1 text-white text-[8px]"
                        style={{ transform: "translateY(100%)" }}
                      >
                        {formatDate(new Date(message.createdAt))}
                      </span>
                    </div>
                  )}
                  {message.audio && <CustomAudioPlayer src={message.audio} />}
                  {message.content && (
                    <span
                      className={`relative px-4 py-2 rounded-lg inline-block max-w-[400px] min-w-[100px] break-words ${
                        message.senderId === userId
                          ? "rounded-br-none bg-gray-900 text-gray-100 border border-red-700"
                          : "rounded-bl-none bg-gray-700 text-gray-100 border border-red-700"
                      }`}
                    >
                      {message.content}
                      <span
                        className="absolute right-2 bottom-1 text-white text-[8px]"
                        style={{ transform: "translateY(100%)" }}
                      >
                        {formatDate(new Date(message.createdAt))}
                      </span>
                    </span>
                  )}
                </div>
              </div>
              <img
                src={
                  message.senderId === userId
                    ? userImage
                    : receiverData?.profileImage
                }
                alt="Profile"
                className={`w-6 h-6 rounded-full border border-redBorder ${
                  message.senderId === userId ? "order-2" : "order-1"
                }`}
              />
            </div>
          </div >
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-2">
        <div className="relative flex">
          <div className="absolute left-2 items-center inset-y-0 flex m-2 space-x-2">
            <label
              className="text-gray-500 hover:text-red-700 mt-1"
              htmlFor="image-upload"
            >
              <FontAwesomeIcon icon={faImage} className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="image-upload"
              name="image"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              className="text-gray-500 hover:text-red-700 mt-1"
              htmlFor="audio-upload"
            >
              <FontAwesomeIcon icon={faMicrophone} className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="audio-upload"
              name="audio"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              className="text-gray-500 hover:text-red-700 mt-1"
              htmlFor="video-upload"
            >
              <FontAwesomeIcon icon={faVideo} className="w-5 h-5" />
            </label>
            <input
              type="file"
              id="video-upload"
              name="video"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <input
            type="text"
            placeholder="Type your message.."
            className="w-full px-36 focus:outline-none focus:placeholder-gray-300 text-gray-100 placeholder-zinc-400 bg-zinc-900 hover:bg-zinc-800 rounded-md py-3 border border-redBorder"
            value={newMessage}
            onChange={ handleTyping }
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex m-2">
            <div className="emoji mr-2 mt-1">
              <button
                type="button"
                onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                className={`text-gray-500 hover:text-red-700 ${
                  isEmojiOpen ? "text-red-700" : ""
                }`}
              >
                <FontAwesomeIcon icon={faSmile} className="w-5 h-5" />
              </button>
              {isEmojiOpen && (
                <EmojiPicker
                  className="emojiPicker"
                  onEmojiClick={handleEmoji}
                />
              )}
            </div>
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
