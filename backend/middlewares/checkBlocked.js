const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Trainer = require('../model/trainerModel');

const checkBlocked = async (req, res, next) => {
  try {
    if (!req.cookies.jwtUser) {
      return next(); 
    }
    const token = req.cookies.jwtUser;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_USER);
    if (decodedToken.role === 'trainer') {
      const user = await Trainer.findById(decodedToken.id).select('-password');
      if (!user) {
        throw new Error('trainer not found.');
      }
      if (user.isBlocked) {
        throw new Error('blocked trainer.');
      }
      req.authUser = user; 
    } else if (decodedToken.role === 'user') {
      const user = await User.findById(decodedToken.id).select('-password');
      if (!user) {
        throw new Error('User not found ');
      }
      if (user.isBlocked) {
        return res.status(403).json({message:"blocked user"})   
      }
      req.authUser = user; 
    } else {
      throw new Error('Invalid role.');
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};

module.exports = checkBlocked;
