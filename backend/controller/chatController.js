const Chat = require('../model/chatModel');
const chatSocket = require('../sockets/chatSocket');

// Create a new chat

const newMessage =async(data)=>{
           
    try {
      console.log("newMessage backend");
        console.log(data);
        // const existingChat = Chat.findOne({})
    } catch (error) {
        
    }
}

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

    if (!allChats || allChats.length === 0) {
      return res.status(404).json({ message: "Chats not found" });
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
    console.log('getChat: ',userId,trainerId );
  try {
    const chat = await Chat.findOne({ user: userId, trainer: trainerId });
    if (chat) {
    console.log(chat);

      const chatId = chat._id;
      res.status(200).json({ message: "chat Id found.", chatId });
    } else {
      console.log('no chat found');
      res.status(400).json({ message: "chat not found.." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error chat not found" });
  }
};





const createChat = async (req, res) => {
  const { user, trainer, message } = req.body;

  console.log('message',message);

  const newMessage = {
    senderType: message[0].senderType,
    senderId: message[0].senderId,
    content: message[0].content,
    createdAt: new Date()
  };

  console.log('newMessage : ',newMessage);

  try {
    const newChat = new Chat({
      user: user,
      trainer: trainer,
      messages: [newMessage], // Initialize messages array with newMessage
      lastMessage: newMessage // Set lastMessage to newMessage
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

  

module.exports = {
    createChat,
    getChatById,
    sendMessage,
    newMessage,
    getChatByUserAndTrainerId,
    getAllChatsByUserId

}