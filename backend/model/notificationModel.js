const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    recipientType: { 
        type: String, 
        enum: ['user', 'trainer'], 
        required: true 
    },
    recipientId: { 
        type: Schema.Types.ObjectId, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;