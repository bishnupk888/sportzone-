
const Notification  =  require('../model/notificationModel')
const User = require('../model/userModel'); // Adjust the path according to your project structure
const Trainer = require('../model/trainerModel'); // Adjust the path according to your project structure

const createNotification = async(req,res)=>{

    const {content,recipientId,sender} = req.body
    try {
        const newNotification = new Notification({
          recipientId,
          sender,
          content
        });
    
        const savedNotification = await newNotification.save();
        console.log('Notification saved:', savedNotification);
        return savedNotification;
      } catch (error) {
        console.error('Error creating notification:', error);
        throw error; // Handle or propagate the error as needed
      }
}

// const getNotifications = async(req,res)=>{
//   const {id,userRole} = req.query
//   const senderType = userRole==='user'?'trainer':'user'
//   if(userRole==='user')
//  let  Notification.find({recipientId:id}).populate('trainer', 'username profileImage')
// }



const getNotifications = async (req, res) => {
  const { userId } = req.params;
  console.log('get notifications ', userId);
  try {
   
    const notifications = await Notification.find({ receiverId: userId });

    console.log('notifications : ', notifications);


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



module.exports = {
    createNotification,
    getNotifications,
    
}
