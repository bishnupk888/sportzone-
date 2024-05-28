const express = require('express')
const adminController = require('../controller/adminController')
const adminRouter = express.Router()


adminRouter.post('/login',adminController.adminLogin)
adminRouter.post('/logout',adminController.logout)
adminRouter.post('/block-user/:id',adminController.handleblockUser)
adminRouter.post('/block-trainer/:id',adminController.handleblockTrainer)
adminRouter.post('/trainer-approval/:id',adminController.handleApprovalTrainer)





module.exports = adminRouter