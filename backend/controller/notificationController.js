
const Notification  =  require('../model/notificationModel')
const User = require('../model/userModel'); 
const Trainer = require('../model/trainerModel'); 

const createNotification = async(req,res)=>{

    const {content,recipientId,sender} = req.body
    try {
        const newNotification = new Notification({
          recipientId,
          sender,
          content
        });
    
        const savedNotification = await newNotification.save();
        return savedNotification;
      } catch (error) {
        console.error('Error creating notification:', error);
        throw error; 
      }
}



const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
   
    const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const markAsReadNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
      const updatedNotifications = await Notification.updateMany(
          { receiverId: userId, isRead: false },
          { $set: { isRead: true } }
      );
      res.status(200).json({ message: 'Notifications marked as read', updatedNotifications });
  } catch (error) {
      res.status(500).json({ message: 'Error marking notifications as read', error });
  }
};



module.exports = {
    createNotification,
    getNotifications,
    markAsReadNotifications,
    
}
