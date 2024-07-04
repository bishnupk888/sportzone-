
const Notification  =  require('../model/notificationModel')


const createNotification = async(req,res)=>{

    const {recipientType, content, recipientId} = req.body
    try {
        const newNotification = new Notification({
          type,
          content,
          recipient: recipientId,
        });
    
        const savedNotification = await newNotification.save();
        console.log('Notification saved:', savedNotification);
        return savedNotification;
      } catch (error) {
        console.error('Error creating notification:', error);
        throw error; // Handle or propagate the error as needed
      }
}



module.exports = {
    createNotification,
    
}
