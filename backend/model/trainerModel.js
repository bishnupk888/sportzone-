const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
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
        default:'trainer'
    },
    department: {
        type:String,
    },
    gender:{
        type:String,
        enum:['male','female','other'] 
    },
    age:{
        type:Number,
    },
    fee:{
        type:Number,
        
    },
    location:{
        type:String,
    },
    certificate:{
        type:String
    },
    about:{
        type:String, //added latest make other changes
    },
    profileImage:{
        type:String,
        default:''
    },
    experience: [{
        institution: {
            type: String,  
        },
        duration:{
            type: String
        }
    }],
    wallet:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})


const Trainer = mongoose.model('Trainer',trainerSchema)
module.exports = Trainer