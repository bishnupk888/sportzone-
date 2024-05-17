const Trainer = require('../model/trainerModel') 
const jwt =  require('jsonwebtoken')
const  bcrypt = require('bcrypt')


const registerTrainer = async(req,res)=>{
    const {username,email,phone,password,confirmPassword} = req.body
    try {
    if(!username || !email || !phone || !password || !confirmPassword){
       return res.status(400).json({message:"all fields are required"})
    }
    if(password !== confirmPassword){
        return res.status(400).json({message:"passwords do not match"})
    }
    const existingTrainer = await Trainer.findOne({email:email})
    console.log(existingTrainer)
    if(existingTrainer){
        return res.status(400).json({message:"user already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(hashedPassword);
    const newTrainer = new Trainer({
        username,
        email,
        phone,
        password: hashedPassword
    })

    savedTrainer  = await newTrainer.save()
    res.status(200).json({trainer:savedTrainer,message:"successfully registered trainer"})
    
    } catch (error) {
        res.status(400).json({message:"internal error"})
    }
} 
const loginTrainer = async (req, res) => {
    const { email, password } = req.body;
    try {
        const trainer = await Trainer.findOne({ email: email });
        if (!trainer) {
            return res.status(400).json({ message: "User not found" });
        }

        const passwordMatch = bcrypt.compareSync(password, trainer.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const expire_in = Date.now() + (1000 * 60 * 60 * 24 * 30);
        const token = jwt.sign({ sub: trainer._id, exp: expire_in }, process.env.JWT_SECRET_TRAINER);

        res.cookie('jwtTrainer', token, {
            expires: new Date(expire_in),
            httpOnly: true,
            sameSite: 'lax'
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: "Internal error, login failed" });
    }
}


const logoutTrainer = async(req,res)=>{
    res.clearCookie('jwtTrainer')
    // res.clearCookie('jwtUser')
    res.status(200).json({message:"logged out trainer"})
}

const checkAuthTrainer= async(req,res)=>{
        res.status(200).json({message:"authorization successful"})
}

module.exports = {
    registerTrainer,
    loginTrainer,
    logoutTrainer,
    checkAuthTrainer
}
