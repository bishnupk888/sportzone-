const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const authUser = require('../middlewares/authUser')


userRouter.get('/',userController.getAllUsers)
userRouter.get('/:id',authUser,userController.getUser) 
userRouter.put('/:id',userController.updateUser)


module.exports = userRouter
