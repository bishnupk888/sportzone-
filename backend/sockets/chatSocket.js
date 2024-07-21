const Chat = require('../model/chatModel');
const chatController = require('../controller/chatController');
const Notification = require('../model/notificationModel');
  
const connectedUsers = new Map()


const chatSocket = (io) => {
    io.on('connection', async(socket) => {
        console.log('A client connected.');
    
        // Example event listener for 'connect' event from frontend
        socket.on('register', async (id) => {
            connectedUsers.set(id,socket.id)
        });


        socket.on('newMessage', async (data, callback) => {
            try {
              
              const { userId, trainerId, message } = data;

              console.log('newMessage in socket : ', message)

              const senderId = message.senderId;
              const senderType = message.senderType;
              console.log('senderId = ', senderId);
          
              let recieverId = null;
              if (senderType === 'user') {
                recieverId = trainerId;
              } else if (senderType === 'trainer') {
                recieverId = userId;
              }
          
              const newMessage = {
                senderType,
                senderId,
                content: message.content,
                image:message.image,
                video:message.video,
                audio:message.audio,
                createdAt: Date.now()
              };
          
              // Find an existing chat between the user and trainer
              const existingChat = await Chat.findOne({ user: userId, trainer: trainerId });
          
              let updatedChat;
              if (!existingChat) {
                const newChat = new Chat({
                  user: userId,
                  trainer: trainerId,
                  messages: [newMessage],
                  lastMessage: newMessage
                });
          
                updatedChat = await newChat.save();
              } else {
                // Update the existing chat with the new message
                updatedChat = await Chat.findByIdAndUpdate(
                  existingChat._id,
                  {
                    $push: { messages: newMessage },
                    $set: { lastMessage: newMessage }
                  },
                  { new: true }
                );
              }
          
              // Find the receiver's socket ID
              const recieverSocketId = connectedUsers.get(recieverId);
              console.log('recieverId on listening message = ', recieverId);
              console.log('recieverSocketId on listening message = ', recieverSocketId);
          
              // Emit the new message to the receiver if they're connected
              if (recieverSocketId) {
                socket.to(recieverSocketId).emit('newMessage', newMessage);
              }
          
              // Send the new message back to the client as a callback
              callback(newMessage);
            } catch (error) {
              console.error('Error processing new message:', error);
            }
          });

        socket.on("notification",async(data)=>{
          // const {receiverId,sender,content} = data
          console.log('Listening to notification = ',data)
          const notification = new Notification(data)
          const savedNotification = await notification.save()
          console.log('savedNotification === ', savedNotification);
          const recieverSocketId = connectedUsers.get(data.receiverId)
          console.log('recieverSocketId--',recieverSocketId);
          socket.to(recieverSocketId).emit('notification',savedNotification)
        })

        socket.on('typing', (data) => {
          const { userId, chatId, isTyping } = data;
          socket.to(chatId).emit('typing', { userId, isTyping });
      });
        // Add more event listeners as needed
    
        // Example disconnect event handler
        socket.on('disconnect', () => {
            console.log('A client disconnected.');
        });
    });

};

module.exports = chatSocket;
