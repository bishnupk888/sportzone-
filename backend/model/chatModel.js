const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  messages: [
    {
      senderType: {
        type: String,
        enum: ['user', 'trainer'],
        required: true
      },
      senderId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      content: {
        type: String,
        // required: true
        default:''
      },
      image:{
        type: String,
        default:''
      },
      video:{
        type: String,
        default:''
      },
      isRead:{
        type:Boolean,
        required:true,
        default:false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  lastMessage: {
    senderType: {
      type: String,
      enum: ['user', 'trainer'],
      required: true
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    content: {
      // text:{
      //   type: String,
      //   default:''
      // },
      // image:{
      //   type: String,
      //   default:''
      // },
      // video:{
      //   type: String,
      //   default:''
      // }
      type: String,
      required: true
    },
    isRead:{
      type:Boolean,
      required:true,
      default:false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }
  }
},{
  timestamps:true
});

chatSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
