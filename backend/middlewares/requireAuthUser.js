const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requireAuthUser = async(req,res,next)=>{
    try {
        // get token from cookkies
        const token = req.cookies.jwtUser
        // decode token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET_USER)
        // get user from token// added userid in token as sub //

        // check expirration for  the token
        if(decoded.expire_in < Date.now()){
            return res.sendStatus(401)
        }
        const user = await User.findById(decoded.sub)
        if(!user){
           return res.sendStatus(401)
        }
        req.user = user
        next() 
    } catch (error) {
        res.sendStatus(401)
    }

}

module.exports = requireAuthUser