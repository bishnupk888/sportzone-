
const User = require('../model/userModel')
const Trainer = require('../model/trainerModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userHelper = require('../helpers/userHelpers')
const otpHelper = require('../helpers/otpHelper')
const OTP = require('../model/otpSchema')



const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_USER, {
    expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30)
  })
}

const register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  console.log('In register');
  try {
    let user = null;

    if (role === 'user') {
      user = await User.findOne({ email });
    } else if (role === 'trainer') {
      user = await Trainer.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = await otpHelper.generateOtp(email)
    console.log(" in authcontroller returned otp",otp);
    await otpHelper.sendOtp(email, otp); //sends email with otp
    if (role === 'user') {
      user = new User({
        username: name,
        email,
        phone,
        password: hashedPassword,
        role
      });
    } else if (role === 'trainer') {
      user = new Trainer({
        username: name,
        email,
        phone,
        password: hashedPassword,
        role
      });
    }
    user.save().then(() => {
      res.cookie('email', email, { httpOnly: true });
      res.cookie('role', role, { httpOnly: true });

      res.status(200).json({ message: "Successfully registered user" });
    }).catch((err) => {
      res.status(500).json({ message: "Server error, user creation failed", error: err });
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Server error, registration failed" });
  }
}


const login = async (req, res) => {
  console.log("in login");
  const { email, password, role } = req.body
  console.log(email, password, role);
  try {
    let user = null;
   if (role === 'user') {
  console.log("Role is user:", role);
  user = await User.findOne({ email });
} else if (role === 'trainer') {
  console.log("Role is trainer:", role);
  user = await Trainer.findOne({ email });
} 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ status: false, message: "invalid credentials" })
    }
    const expireIn = Date.now() + (1000 * 60 * 60 * 24 * 10);
    const token = generateToken(user)

    res.cookie('jwtUser', token, {
      expires: new Date(expireIn),
      httpOnly: true,
      sameSite: 'lax'
    });
    const { _id, profileImage, username } = user
    res.status(200).json({ message: "Login successful", data: { _id, profileImage, role, username } },);
  } catch (error) {
    res.status(400).json({ message: " server error Login failed " });
  }
} 

const resetPassword = (req,res)=>{
  

  res.status(200).json({message:"reset password"})
  console.log("reset password");
}


const logout = async (req, res) => {
  res.clearCookie('jwtUser', {
    httpOnly: true,
    sameSite: 'lax'
  });
  res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
  register,
  login,
  logout,
  resetPassword
  
}