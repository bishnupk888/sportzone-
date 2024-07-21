const express = require('express')
const adminController = require('../controller/adminController')
const adminRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const adminBookingHelper = require('../helpers/adminHelpers/bookingHelper')



adminRouter.post('/login',adminController.adminLogin)
adminRouter.post('/logout',adminController.logout)
adminRouter.patch('/:id/block-user',authAdmin,adminController.handleblockUser)
adminRouter.patch('/block-trainer/:id',authAdmin,adminController.handleblockTrainer)
adminRouter.patch('/:id/trainer-approval',authAdmin,adminController.handleApprovalTrainer)
adminRouter.patch('/:id/trainer-rejection',authAdmin,adminController.handleRejectTrainer)

adminRouter.get('/trainers',authAdmin,adminController.getAllTrainers)
adminRouter.get('/users',authAdmin,adminController.getAllUsers)
adminRouter.get('/bookings',authAdmin,adminBookingHelper.getAllBookings)
adminRouter.get('/dashboard-data',authAdmin,adminController.getDashBoardDatas)
adminRouter.get('/chart-data/user',authAdmin,adminController.getUserChartDatas)
adminRouter.get('/chart-data/trainer',authAdmin,adminController.getTrainerChartDatas)
adminRouter.get('/barchart-data',authAdmin,adminController.getBarChartData)
adminRouter.get('/booking-chart-data',authAdmin,adminController.getBookingChartData)
adminRouter.get('/trainer-chart-data/trainer',authAdmin,adminController.getTrainerIsVerifiedData)
adminRouter.get('/revenuechart-data',authAdmin,adminController.getTotalRevenueChartData)












// /chart-data/${role}/?period=${period}




// adminRouter.get()





module.exports = adminRouter