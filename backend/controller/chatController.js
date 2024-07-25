const Chat = require('../model/chatModel');
const chatSocket = require('../sockets/chatSocket');
const cloudinary = require('../config/cloudinary'); // Assuming you have a cloudinaryConfig file
const streamifier = require('streamifier'); // To handle streams for Cloudinary



const getAllChatsByUserId = async (req, res) => {
  const { userId, userRole } = req.params;

  try {
    let allChats = null;
    if (userRole === 'user') {
      allChats = await Chat.find({ user: userId })
        .select('lastMessage user trainer')
        .populate('user', 'username profileImage department _id')
        .populate('trainer', 'username profileImage department _id')
        .sort({ 'lastMessage.createdAt': -1 }); // Sort by lastMessage.createdAt in descending order
    } else if (userRole === 'trainer') {
      allChats = await Chat.find({ trainer: userId })
        .select('lastMessage user trainer')
        .populate('user', 'username profileImage department _id')
        .populate('trainer', 'username profileImage department _id')
        .sort({ 'lastMessage.createdAt': -1 }); // Sort by lastMessage.createdAt in descending order
    }

    if (allChats.length === 0) {
      return res.status(200).json({ message: "no previous chats" });
    }
    else if(!allChats){
      return res.status(400).json({ message: " chats not found" });

    } else {
      res.status(200).json({ message: "Found chats", allChats });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


const getChatByUserAndTrainerId = async (req, res) => {
  const { userId, trainerId } = req.params; // Use req.query for GET requests
  try {
    const chat = await Chat.findOne({ user: userId, trainer: trainerId });
    if (chat) {

      const chatId = chat._id;
      res.status(200).json({ message: "chat Id found.", chatId });
    } else {
      res.status(400).json({ message: "chat not found.." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error chat not found" });
  }
};





const createChat = async (req, res) => {
  const { user, trainer, message } = req.body;


  const newMessage = {
    senderType: message[0].senderType,
    senderId: message[0].senderId,
    content: message[0].content,
    createdAt: new Date()
  };


  try {
    const newChat = new Chat({
      user: user,
      trainer: trainer,
      messages: [newMessage],
      lastMessage: newMessage 
    });

    const savedChat = await newChat.save();
    res.status(201).json({ message: 'Successfully created and saved chat', savedChat });
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat', error });
  }
};



// Get a chat by ID

const getChatById = async (req, res) => {
    const { chatId } = req.params;
    try {
      const chatMessages = await Chat.findById(chatId).select('messages');
      if (!chatMessages) {
        return res.status(404).json({ message: 'Chat not found,' });
      }
      res.status(200).json(chatMessages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching chat', error });
    }
  };

// Send a message
const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { senderType, senderId, content } = req.body;
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found....' });
      }
  
      const newMessage = {
        senderType,
        senderId,
        content,
        createdAt: new Date()
      };
  
      chat.messages.push(newMessage);
      chat.lastMessage = newMessage;
      await chat.save();
  
      res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).json({ message: 'Error sending message', error });
    }
  };



  const uploadFile = async (formData) => {
    const { file, chatId, senderType, senderId, type } = formData;
  
    try {
      const uploadStream = cloudinary.uploader.upload_stream(async (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          throw new Error('Upload failed');  
        }
  
        const message = {
          senderType,
          senderId,
          createdAt: new Date(),
        };
  
        if (type === 'image') {
          message.image = result.secure_url;
        } else if (type === 'video') {
          message.video = result.secure_url;
        } else if (type === 'audio') {
          message.audio = result.secure_url;
        }
  
        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          { $push: { messages: message }, $set: { lastMessage: message } },
          { new: true }
        );
  
        return { message: 'File uploaded successfully', chat: updatedChat };
      });
  
      // Ensure file.buffer is a valid Buffer or Uint8Array before piping
      if (Buffer.isBuffer(file.buffer) || file.buffer instanceof Uint8Array) {
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      } else {
        throw new Error('Invalid file buffer type');
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw new Error('Server error');
    }
  };
  

  
  
  

module.exports = {
    createChat,
    getChatById,
    sendMessage,
    
    getChatByUserAndTrainerId,
    getAllChatsByUserId,
    uploadFile,
    

}