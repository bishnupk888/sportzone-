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
    const newUser = await new User({
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

const getLoginUser= ()=>{

}
const postLoginUser=  async(req,res)=>{
    try {
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    if(!user){
       return res.status(400).json({message:"no user found with this email"})
    }
    console.log("password :",user.password)
    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        return res.status(400).json({message:"invalid credential"})
    }
    //jwt token 
    const token_expire =  Date.now() + (1000 * 60 * 60 * 24 * 30)

    const token =  jwt.sign({sub:user._id,exp:token_expire},process.env.JWT_SECRET)
    
      res.status(200).json({token,user:user,message:"login successful"})
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
const logoutUser=()=>{

}


module.exports={
    getRegisterUser,
    postRegisterUser,
    postLoginUser,
    logoutUser,
    getLoginUser,
    userHome
    

}