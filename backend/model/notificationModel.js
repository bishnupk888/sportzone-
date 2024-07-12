const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    receiverId: { 
        type: Schema.Types.ObjectId, 
        required: true 
    },
    sender:{ 
        type:String,  
        required:true
    },
    content: { 
        type: String, 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    }
    
},{
    timestamps:true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;