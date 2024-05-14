
const Admin = require('../model/adminModel')


const adminLogin = async(req,res)=>{
    const {username,password} =req.body
    try {
        const admin = await Admin.findOne({username:username})
        console.log(admin);
        if(!admin){
            res.status(400).json({message:"invalid credentials"})
        }else if(admin.password == password){
            res.status(200).json({admin:admin,message:"successfully logged in"})
        }else{
            res.status(400).json({message:"invalid credentials"})
        }
        

    } catch (error) {
        res.status(400).json({message:"server error"})
    }

}


module.exports ={
    adminLogin
}

