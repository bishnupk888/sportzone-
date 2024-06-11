const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const Trainer = require('../model/trainerModel')


const authUser = async(req,res,next)=>{
    try {

    const token = req.cookies.jwtUser
    
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_USER)
    if(decodedToken.exp < Date.now()){
        return res.status(400).json({message:"token expired"})
    }
    let user =null
    if(decodedToken.role === 'trainer'){
        user = await Trainer.findById(decodedToken.id).select('-password')
    }
    if(decodedToken.role === 'user'){
        user = await User.findById(decodedToken.id).select('-password')
    }
    if(!user){
        return res.status(400).json({message:"authentication failed"})
    }

    req.user = user

    next()
    } catch (error) {
        res.status(400).json({message:"authentication failed"})
    }
}

module.exports = authUser