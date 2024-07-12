
const Admin = require('../model/adminModel')
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');
     

const generateToken = (admin) => {
    return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET_USER, {
      expiresIn: Date.now() + (1000 * 60 * 60 * 24 * 30)
    })
  }

  const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Email and password received:", email, password);
    console.log("In admin login backend", email, password);
  
    try {
      const admin = await Admin.findOne({ email });
      console.log("Admin found:", admin);
  
      if (!admin) {
        return res.status(400).json({ message: "No user found" });
      }
  
      // Use bcrypt to compare passwords
      const passwordMatch = (password === admin.password);
      console.log("Password match:", passwordMatch);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const expireIn = Date.now() + (1000 * 60 * 60 * 24 * 5);
      const token = generateToken(admin);
      res.cookie('jwtAdmin', token, {
        expires: new Date(expireIn),
        httpOnly: true,
        sameSite: 'lax'
      });
  
      const { _id, email: adminEmail, role } = admin; // Destructure correctly
      console.log({ _id, adminEmail, role });
  
      res.status(200).json({ message: "Login successful", data: { _id, email: adminEmail, role } });
  
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

const logout = async (req, res) => {
    res.clearCookie('jwtAdmin', {
      httpOnly: true,
      sameSite: 'lax'
    });
    res.status(200).json({ message: 'Logout successful' });
  }

const handleblockUser = async (req,res)=>{
  console.log("in block user");
    const {id} = req.params
   try {
    const user = await User.findByIdAndUpdate(id)
    console.log("block user",user);
    user.isBlocked = (!user.isBlocked)
    user.save().then((response)=>{
      return res.status(200).json({message:"success"})
    }).catch((err)=>{
      console.log("failed to handle block");
    })
   } catch (error) {
    res.status(400).json({message:"server error"})
   }

}

const handleblockTrainer = async (req,res)=>{
  const {id} = req.params
 try {
  const user = await Trainer.findByIdAndUpdate(id)
  console.log("block user",user);
  user.isBlocked = (!user.isBlocked)
  user.save().then((response)=>{
    return res.status(200).json({message:"success"})
  }).catch((err)=>{
    console.log("failed to handle block");
  })
 } catch (error) {
  res.status(400).json({message:"server error"})
 }

}

const handleApprovalTrainer = async (req, res) => {
  console.log("in handle approval");
  const { id } = req.params;
  try {
    const trainer = await Trainer.findById(id);
    if (trainer) {

      trainer.isVerified = true;
      await trainer.save();
      res.status(200).json({ message: "Trainer approved successfully" });
    } else {
      res.status(404).json({ message: "Trainer not found" });
    }
  } catch (error) {
    console.error("Error approving trainer:", error);
    res.status(400).json({ message: "Failed to approve trainer" });
  }
};

const handleRejectTrainer = async (req, res) => {
  console.log("in handle reject");
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const trainer = await Trainer.findById(id);
    if (trainer) {
      console.log("trainer found");
      trainer.isVerified = false;
      trainer.rejectionReason = reason; // Assuming you have a field to store the rejection reason
      await trainer.save();
      console.log("trainer rejected:", trainer);
      res.status(200).json({ message: "Trainer rejected successfully" });
    } else {
      console.log("trainer not found");
      res.status(404).json({ message: "Trainer not found" });
    }
  } catch (error) {
    console.error("Error rejecting trainer:", error);
    res.status(400).json({ message: "Failed to reject trainer" });
  }
};



const getAllTrainers = async (req, res) => {
  try {
      const trainers = await Trainer.find({}).select('-password')
      if (trainers.length>0) {
          return res.status(200).json({ data: trainers, message: "trainer found", success: true })
      } else {
          return res.status(404).json({ message: "trainers not found" })
      }
  } catch (error) {
      res.status(404).json({ message: "server error" })
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



module.exports ={
    adminLogin,
    logout,
    handleblockUser,
    handleblockTrainer,
    handleApprovalTrainer,
    handleRejectTrainer,
    getAllTrainers,
    getAllUsers
}

