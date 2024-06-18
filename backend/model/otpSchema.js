const mongoose = require('mongoose')

const OTPSchema = new mongoose.Schema({
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60, // OTP will automatically be deleted after 60 seconds
    },
  });


const OTP = mongoose.model('OTP', OTPSchema) 

module.exports = OTP;