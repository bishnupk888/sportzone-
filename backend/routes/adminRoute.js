const express = require('express')
const adminController = require('../controller/adminController')
const adminRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')



adminRouter.post('/login',adminController.adminLogin)
adminRouter.post('/logout',adminController.logout)
adminRouter.patch('/block-user/:id',authAdmin,adminController.handleblockUser)
adminRouter.patch('/block-trainer/:id',authAdmin,adminController.handleblockTrainer)
adminRouter.patch('/trainer-approval/:id',authAdmin,adminController.handleApprovalTrainer)
adminRouter.get('/trainers',authAdmin,adminController.getAllTrainers)
adminRouter.get('/users',authAdmin,adminController.getAllUsers)


// adminRouter.get()





module.exports = adminRouter