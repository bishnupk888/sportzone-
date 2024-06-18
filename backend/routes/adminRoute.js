const express = require('express')
const adminController = require('../controller/adminController')
const adminRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const adminBookingHelper = require('../helpers/adminHelpers/bookingHelper')



adminRouter.post('/login',adminController.adminLogin)
adminRouter.post('/logout',adminController.logout)
adminRouter.patch('/:id/block-user',authAdmin,adminController.handleblockUser)
adminRouter.patch('/block-trainer/:id',authAdmin,adminController.handleblockTrainer)
adminRouter.patch('/:id/trainer-approval/',authAdmin,adminController.handleApprovalTrainer)
adminRouter.get('/trainers',authAdmin,adminController.getAllTrainers)
adminRouter.get('/users',authAdmin,adminController.getAllUsers)
adminRouter.get('/bookings',authAdmin,adminBookingHelper.getAllBookings)


// adminRouter.get()





module.exports = adminRouter