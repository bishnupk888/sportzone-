const jwt = require('jsonwebtoken')
const Trainer = require('../model/trainerModel')

const requireAuthTrainer = async(req,res,next)=>{
    try {
        // get token from cookies
        const token = req.cookies.jwtTrainer
        // decode token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET_TRAINER)
        // get trainer from token// added trainer-id in token as sub //

        // check expirration for  the token
        if(decoded.expire_in < Date.now()){
            return res.sendStatus(401)
        }
        const trainer = await Trainer.findById(decoded.sub)
        console.log(trainer,"in auth midleware");
        if(!trainer){
           return res.sendStatus(401)
        }
        req.trainer = trainer
        next() 
    } catch (error) {
        res.sendStatus(401)
    }

}

module.exports = requireAuthTrainer