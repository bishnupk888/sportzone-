
const User = require('../model/userModel')
const Trainer = require('../model/trainerModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userHelper = require('../helpers/userHelpers')
const otpHelper = require('../helpers/otpHelper')
const nodemailer = require('nodemailer')
const OTP = require('../model/otpSchema')


const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_USER, {
    expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30)
  })
}

const generateOtp = () => {
  return crypto.randomBytes(6).toString('hex');
};

const sendOtp = async (email, otp) => {
  console.log("in send otp");
  console.log( "node mailer :", process.env.SENDER_EMAIL_PASS,process.env.SENDER_EMAIL);
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_EMAIL_PASS,

      },
  });
  
  console.log("Transporter created successfully");

  const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: 'Your OTP',
      text: `Your OTP for Sportzone is : ${otp}`,
  };
  console.log("Mail options created");

  try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      console.log("in send otp info:", info);
      
      return { message: 'OTP sent to your email' };
  } catch (error) {
      console.error("Error sending email:", error);
      return new Error({ message: 'Failed to send OTP' })
  }
};



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
    const otp = generateOtp();
    const otpDocument = new OTP({
      otp,
      email,
    });
    otpDocument.save().then((data)=>{console.log("otp Stored",data );})
    .catch((err)=>console.log("error saving otp"))

    await sendOtp(email, otp); //sends email with otp
      if (role === 'user') {
          user = new User({
              username: name,   
              email,
              phone,
              password:hashedPassword,
              role
          });
      } else if (role === 'trainer') {
          user = new Trainer({
              username: name,
              email,
              phone,
              password:hashedPassword,
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


const verifyOtp = async (req, res) => {
  
  console.log('In verifyotp');
  const { otp } = req.body;
  const email = req.cookies.email;
  const role = req.cookies.role
  console.log("otp,role and email in req.body:",otp,email,role);
  let user =null;
  if(role === 'user'){
    user = await User.findOne({email})
 }else if(role === 'trainer'){
   user= Trainer.findOne({email}) 
 }
  const otpDocument = await OTP.findOne({email})
  console.log(otpDocument);
  if (!otpDocument) {
      return res.status(400).json({ message: "OTP has expired or is invalid" });
  }
  if (otpDocument.otp === otp) {
    user.isOtpVerified = true;
    
    // Save the user document with the updated flag
    user.save()
        .then(data => {
            res.clearCookie('email')
            res.clearCookie('role')
            
            return res.status(200).json({ message: "OTP verified successfully",data });
        })
        .catch(error => {
            console.error("Error updating user document:", error);
            return res.status(500).json({ message: "Server error, OTP verification failed" });
        });
} else {
    res.status(400).json({ message: "Invalid OTP" });
}
};


const login = async (req, res) => {
  const { email, password, role } = req.body

  try {
    let user = null
    if (role === 'user') {
      user = await User.findOne({ email })
    }
    if (role === 'trainer') {
      user = await Trainer.findOne({ email })
    }
    if (!user) {
      return res.status(404).json({ message: "user not found " })
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
  verifyOtp
}