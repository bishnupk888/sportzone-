const Chat = require('../model/chatModel');
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

              const senderId = message.senderId;
              const senderType = message.senderType;
          
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
          
              const recieverSocketId = connectedUsers.get(recieverId);
          
              if (recieverSocketId) {
                socket.to(recieverSocketId).emit('newMessage', newMessage);
              }
          
              callback(newMessage);
            } catch (error) {
              console.error('Error processing new message:', error);
            }
          });

        socket.on("notification",async(data)=>{
          const notification = new Notification(data)
          const savedNotification = await notification.save()
          const recieverSocketId = connectedUsers.get(data.receiverId)
          socket.to(recieverSocketId).emit('notification',savedNotification)
        })

        socket.on('typing', (data) => {
          const { userId, recieverId,  } = data;
          const recieverSocketId = connectedUsers.get(recieverId)
          if(recieverSocketId){
          socket.to(recieverSocketId).emit('typing',{userId,recieverId} );
          }
      });

      socket.on('stopTyping',(data)=>{
        const { userId, recieverId,  } = data;
        const recieverSocketId = connectedUsers.get(recieverId)
        if(recieverSocketId){
        socket.to(recieverSocketId).emit('stopTyping',{userId,recieverId} );
        }
      })

      socket.on('readMessages',(data)=>{
        const { userId, recieverId,  } = data;
        const recieverSocketId = connectedUsers.get(recieverId)
        if(recieverSocketId){
          socket.to(recieverSocketId).emit('readMessages',{userId,recieverId} );
          }
      })
    
        socket.on('disconnect', () => {
          console.log('A client disconnected.');
          connectedUsers.forEach((value, key) => {
            if (value === socket.id) {
              connectedUsers.delete(key);
            }
          });
        });
    });

};

module.exports = chatSocket;
