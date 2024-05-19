const User = require('../model/userModel')


const updateUser = async (req,res)=>{
    const {id} =req.params
    try {
    const updatedUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
    res.status(200).json({data:updatedUser, message:"successfully updated"})

    } catch (error) {
        res.status(400).json({message:"failed to update"})
    }
}

const getUser = async (req,res)=>{
    const {id} =req.params
    try {
        
    const user = await User.findById(id).select('-password')
    res.status(200).json({data:user, message:" user found"})

    } catch (error) {
        res.status(400).json({message:"user not found"})
    }
}

const getAllUsers = async (req,res)=>{
    try {
        
    const users = await User.find({}).select('-password')
    res.status(200).json({data:users, message:"users found"})

    } catch (error) {
        res.status(400).json({message:"users not found"})
    }
}



module.exports={
    updateUser,
    getUser,
    getAllUsers,
}