const User = require('../model/userModel')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const getRegisterUser = async (req,res)=>{
    res.send("register")
}

const postRegisterUser = async (req,res)=>{
   try {
    const {username,email,phone,password,confirmPassword} = req.body
    if(!username || !email || !phone || ! password || !confirmPassword){
       return res.status(400).json({message:"all fields are required"})
    }
    if(password != confirmPassword){
       return res.status(400).json({message:"passwords do not match"})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"user already exists"})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        username,
        email,
        phone,
        password:hashedPassword
    })

    const savedUser = await newUser.save()
    res.status(200).json({user:savedUser,message:"successfully registered"})
    
   } catch (error) {
     res.status(400).json({message:"error!! registration failed"})
   }
    
}

const getLoginUser= (req,res)=>{

}
const postLoginUser=  async(req,res)=>{
    try {
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
       return res.status(400).json({message:"no user found with this email"})
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        return res.status(400).json({message:"invalid credential"})
    }
    //jwt token 
    const expire_in =  Date.now() + (1000 * 60 * 60 * 24 * 30)

    const token =  jwt.sign({sub:user._id,exp:expire_in},process.env.JWT_SECRET_USER)

    res.cookie("jwtUser",token,{
        expires:new Date(expire_in),
        httpOnly:true,
        sameSite:'lax'
    })

    res.status(200).json({message:"login successful"})

    } catch (error) {
       res.status(500).json({message:"server error"}) 
    }
}
const userHome=(req,res) =>{
    const {id}= req.query
    try {
        const user = User.findById(id)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({message:"server error"})
    }
}
const logoutUser=(req,res)=>{
    res.clearCookie('jwtUser')
    res.status(200).json({message:"loggedout successfully"})
}

const checkAuthUser = async (req,res)=>{
    
    res.sendStatus(200)
}

module.exports={
    getRegisterUser,
    postRegisterUser,
    postLoginUser,
    logoutUser,
    getLoginUser,
    userHome,
    checkAuthUser,
    

}