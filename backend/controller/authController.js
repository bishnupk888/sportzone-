
const User = require('../model/userModel')
const Trainer = require('../model/trainerModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken =(user)=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_USER,{
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
      if (role === 'user') {
      
        user = new User({
          username: name,
          email,
          phone,
          password: hashedPassword,
          role,
        });
      } else if (role === 'trainer') {

        user = new Trainer({
          username:name,
          email,
          phone,
          password: hashedPassword,
          role,
        });
      }
      
      const savedUser = await user.save();
      res.status(200).json({ message: "Successfully registered user", data: savedUser });
    } catch (error) {
      res.status(500).json({ message: "Server error, registration failed" });
    }
  };
  

const login = async(req,res)=>{
    const {email,password,role} = req.body

    try {
        let user =null
        if(role === 'user'){
            user = await User.findOne({email})
        }
        if(role === 'trainer'){
            user = await Trainer.findOne({email})
        }
        if(!user){
           return res.status(404).json({message:"user not found "})
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch){
            return res.status(400).json({status:false, message:"invalid credentials"})
        }
        const expireIn = Date.now() + (1000 * 60 * 60 * 24 * 10);
        const token  = generateToken(user)

        res.cookie('jwtUser', token, {
            expires: new Date(expireIn),
            httpOnly: true,
            sameSite: 'lax'
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: " server error Login failed " });
    }
}
 const logout =async  (req, res) => {
        res.clearCookie('jwtUser', {
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(200).json({ message: 'Logout successful' });
    }

module.exports = {
    register,
    login, 
    logout
}