const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
    phone:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:'https://res.cloudinary.com/sportzone-sportsapp/image/upload/v1720269805/userImage_qnxetg.jpg'
    },
    age:{
        type:Number,
        min:0,
    },
    interests:{
        type:[String],
        default:[]
    },
    gender:{
        type:String,
        enum:['male','female','other'] 
    },
    wallet:{
        type:Number,
        default:0
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    slots:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Slot'
    }],
createdAt:{
    type:Date,
    default: Date.now
}
    
})

const User = mongoose.model('User',userSchema)

module.exports = User