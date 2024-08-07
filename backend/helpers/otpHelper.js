
const crypto = require('crypto')
const OTP = require('../model/otpSchema')
const User = require('../model/userModel')
const Trainer =require('../model/trainerModel')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


const generateOtp = async (email) => {
 
  const otp = crypto.randomInt(100000, 999999).toString();
  
  const otpDocument = new OTP({
    otp,
    email,
  });

  try {
    // Save the OTP document to the database
    const savedOtp = await otpDocument.save();
  } catch (err) {
    console.error("Error saving OTP:", err);
    throw new Error('Failed to save OTP');
  }

  return otp;
};

const sendOtp = async (email, otp) => {
  console.log('otp send : ',otp)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASS,

    },
  });


  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: email,
    subject: 'SportZone - OTP',
    text: `Your OTP for SportZone verification is : ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    
    return { message: 'OTP sent to your email' };
  } catch (error) {
    console.error("Error sending email:", error);
    return new Error({ message: 'Failed to send OTP' })
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const email = req.cookies.email;
  const role = req.cookies.role

  let user = null;
  if (role === 'user') {
    user = await User.findOne({ email })

  } else if (role === 'trainer') {
    user = await Trainer.findOne({ email })
  }
  const otpDocument = await OTP.findOne({ email })
  if (!otpDocument) {
    return res.status(400).json({ message: "OTP has expired or is invalid" });
  }
  if (otpDocument.otp === otp) {
    user.isOtpVerified = true;
    try {
      const data = await user.save();
      res.clearCookie('email');
      res.clearCookie('role');
      return res.status(200).json({ message: "OTP verified successfully", data });
    } catch (error) {
      console.error("Error updating user document:", error);
      return res.status(500).json({ message: "Server error, OTP verification failed" });
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};


const verifyOtpResetPassword = async (req, res) => {
  
  const { otp, email, role, password } = req.body.data;
  let user = null;
  if(role === 'user') {
    user = await User.findOne({ email:email })
  }
  if(role === 'trainer') {
    user = await Trainer.findOne({ email:email })
  }   
  if(!user){
    return res.status(404).json({ message: "user not found" });
  }
  const otpDocument = await OTP.findOne({ email:email })
  if (!otpDocument) {
    return res.status(400).json({ message: "OTP has expired or is invalid" });
  }
  if (otpDocument.otp === otp) {
   
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword
      const data = await user.save();
      return res.status(200).json({ message: "OTP verified successfully and password reset successfully", data });
    } catch (error) {
      console.error("Error updating user document:", error);
      return res.status(500).json({ message: "Server error, OTP verification failed" });
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

const resendOtp = async (req,res)=>{
  try {
   
    const email = req.cookies.email
    const otp = await generateOtp(email)
    const otpSend = await sendOtp(email,otp)

    res.status(200).json({message:"OTP re-send successfully"})
  } catch (error) {
      res.status(500).json({message:"internal server error otp re-sending failed"})
  }
}


module.exports ={
  generateOtp,
  sendOtp,
  verifyOtp,
  resendOtp,
  verifyOtpResetPassword
}