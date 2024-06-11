const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');

const checkBlocked = async (req, res, next) => {
    
  try {
    // Check if jwtUser token exists in cookies
    if (!req.cookies.jwtUser) {
      return next(); // If jwtUser token is not present, move to the next middleware or route handler
    }
    const token = req.cookies.jwtUser;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_USER);
    console.log(decodedToken.role);
    if (decodedToken.role === 'trainer') {
      const user = await Trainer.findById(decodedToken.id).select('-password');
      if (!user) {
        console.log("user not found");
        throw new Error('trainer not found.');
      }
      if (user.isBlocked) {
        console.log("blocked trainer");
        throw new Error('blocked trainer.');
      }
      req.authUser = user; // Attach user data to request object
    } else if (decodedToken.role === 'user') {
      const user = await User.findById(decodedToken.id).select('-password');
      if (!user) {
        throw new Error('User not found.');
      }
      if (user.isBlocked) {
        console.log("blocked user");
        return res.status(400).json({message:"blocked user"})   
      }
      req.authUser = user; // Attach user data to request object
    } else {
      throw new Error('Invalid role.');
    }

    next(); 
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = checkBlocked;
