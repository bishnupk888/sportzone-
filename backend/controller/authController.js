
const User = require('../model/userModel')
const Trainer = require('../model/trainerModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const otpHelper = require('../helpers/otpHelper')
const OTP = require('../model/otpSchema')



const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_USER, {
    expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30)
  })
}

const register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
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
    console.log(" in authcontroller send otp: ",otp);
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

const googleSignUp = async (req, res) => {
  
  const { name, email, password, role } = req.body;
  try {
    let user = null;

    if (role === 'user') {
      user = await User.findOne({ email });
    } else if (role === 'trainer') {
      user = await Trainer.findOne({ email });
    }
    if(user) {
      return res.status(400).json({ message: "email  already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = await otpHelper.generateOtp(email)
    console.log(" in authcontroller send otp: ",otp);
    await otpHelper.sendOtp(email, otp); //sends email with otp
    if (role === 'user') {
      user = new User({
        username: name,
        email,   
        password: hashedPassword,
        role
      });
    } else if (role === 'trainer') {
      user = new Trainer({
        username: name,
        email,
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

  console.log("body  :  ",req.body);

  const { email, password, role  } = req.body

  try {
    
    let user = null;
    if (role === 'user') {
      user = await User.findOne({email:email});

    } else if (role === 'trainer') {
      user = await Trainer.findOne({email:email})
    } 
    console.log("user in login:",user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });   
    }
    
    if (user.isBlocked) {
      return res.status(400).json({ message: "Blocked user" });  
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }
    
    const expireIn = Date.now() + (1000 * 60 * 60 * 24 * 10);
    const token = generateToken(user);     

    res.cookie('jwtUser', token, {
      expires: new Date(expireIn),
      httpOnly: true,
      sameSite: 'lax'
    });
    
    const { _id, profileImage, username } = user;
    res.status(200).json({ message: "Login successful", data: { _id, profileImage, role, username } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(400).json({ message: "Server error: Login failed" });
  }
}; 

const googleSignIn = async (req, res) => {
  const { email,role  } = req.body;
  console.log( "in google sign in, role : ",role, email);
  try {
    if (role === 'user') {

      user = await User.findOne({email:email});

      console.log("user found :",user);

    } else if (role === 'trainer') {

      user = await Trainer.findOne({email:email})

      console.log("trainer found :",user);
    } 
    console.log("user in login:",user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });   
    }
    
    if (user.isBlocked) {
      return res.status(400).json({ message: "Blocked user" });  
    }
    
    const expireIn = Date.now() + (1000 * 60 * 60 * 24 * 10);
    const token = generateToken(user);     

    res.cookie('jwtUser', token, {
      expires: new Date(expireIn),
      httpOnly: true,
      sameSite: 'lax'
    });
    const { _id, profileImage, username } = user;
    res.status(200).json({ message: "Login successful", data: { _id, profileImage, role, username } });
  } catch (error) {
    console.error('Error during google sign in:', error);
    res.status(400).json({ message: "Server error: Login failed" });
  }
}; 
 

const resetPassword = async(req,res)=>{
  res.status(200).json({message:"reset password"})
  console.log("reset password");
  const otp = await otpHelper.generateOtp(email)
  await otpHelper.sendOtp(email, otp);
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
  resetPassword,
  googleSignIn,
  googleSignUp
}