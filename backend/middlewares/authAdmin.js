const jwt = require('jsonwebtoken')
const Admin = require('../model/adminModel')


const authAdmin = (req,res,next)=>{
    try {
    
    const token = req.cookies.jwtAdmin
    if(!token){
        return res.status(401).json({message:"token not found"}) 
    }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_USER)
    if(decodedToken.exp < Date.now()){
        return res.status(401).json({message:"token expired"})
    }
    let user =null
    if(decodedToken.role === 'admin'){
        user = Admin.findById(decodedToken.id).select('-password')
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

module.exports = authAdmin