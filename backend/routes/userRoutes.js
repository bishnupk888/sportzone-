const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const authUser = require('../middlewares/authUser')
const checkBlocked = require('../middlewares/checkBlocked')



// userRouter.get('/',userController.getAllUsers)
userRouter.get('/trainer-profile/:id',userController.getTrainer)
userRouter.get('/get-trainers',userController.getAllTrainers)
userRouter.get('/:id',authUser,checkBlocked,userController.getUser) 
userRouter.put('/:id',authUser,checkBlocked,userController.updateUser)
userRouter.patch('/updat-image/:id',authUser,checkBlocked,userController.updateProfileImage)




module.exports = userRouter
