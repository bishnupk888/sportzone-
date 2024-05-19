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
        required:true
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
    fee:{
        type:Number,
    },
    location:{
        type:String,
    },
    certificate:{
        type:String
    },
    profileImage:{
        type:String,
        default:'default_profile.jpg'
    },
    experience: [{
        institution: {
            type: String,  
        },
        start_date: {
            type: Date,
        },
        end_date: {
            type: Date
        }
    }],
    isVerified:{
        type:String,
        enum:['verified','pending','rejected'],
        default:'pending'
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