const User = require('../model/userModel')
const Trainer = require('../model/trainerModel')


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

const updateProfileImage = async (req, res) => {
  console.log("in update profile");
    const { id } = req.params;
    const { imageUrl } = req.body; 
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.profileImage = imageUrl;

      await user.save();

      res.status(200).json({ message: 'Profile image updated successfully', user });
    } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).json({ message: 'Failed to update profile image', error });
    }
  };

  const getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({isBlocked:false}).select('-password')
        if (trainers.length>0) {
            return res.status(200).json({ data: trainers, message: "trainer found", success: true })
        } else {
            return res.status(404).json({ message: "trainers not found" })
        }
    } catch (error) {
        res.status(404).json({ message: "server error" })
    }
}

const getTrainer = async (req, res) => {
  const { id } = req.params
  try {
      const trainer = await Trainer.findById(id).select('-password')
      if(trainer){
        return  res.status(200).json({ data: trainer, message: "trainer found", success: true })
      }else{
       return res.status(404).json({ message: "trainer not found" })
      }
      
  } catch (error) {
      res.status(404).json({ message: "server error" })
  }
}

const getServices =  async (req, res) => {
  console.log("in services");
  try {
    const departments = await Trainer.distinct('department', { isVerified: true });

      res.json({ success: true, data: departments });
  } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};



   
module.exports={
    updateUser,
    getUser,
    updateProfileImage,
    getAllTrainers,
    getTrainer,  
    getServices,
}   