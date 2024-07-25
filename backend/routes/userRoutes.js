const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const authUser = require('../middlewares/authUser')
const userHelpers = require('../helpers/userHelpers/slotsHelper')
const checkBlocked = require('../middlewares/checkBlocked')
const userBookingHelper =require('../helpers/userHelpers/bookingHelper')
const userTransactionHelper  = require('../helpers/userHelpers/transactionHelper')

userRouter.get('/trainer-profile/:id',userController.getTrainer)
userRouter.get('/get-trainers',userController.getAllTrainers)
userRouter.get('/services/list',userController.getServices)

userRouter.get('/:id',authUser,checkBlocked,userController.getUser) 
userRouter.put('/:id',authUser,checkBlocked,userController.updateUser)
userRouter.patch('/:id/profile-image',authUser,checkBlocked,userController.updateProfileImage)
userRouter.get('/available-slots/:id',authUser,checkBlocked,userHelpers.getTrainerSlots)

userRouter.post('/bookSlot',authUser,checkBlocked,userHelpers.bookSlot)
userRouter.get('/mybookings/:id',authUser,checkBlocked,userBookingHelper.getAllUserBookings)
userRouter.post('/cancel-booking/:bookingId',authUser,checkBlocked,userBookingHelper.cancelUserBooking)
userRouter.get('/booking-details/:bookingId',authUser,checkBlocked,userBookingHelper.getBookingDetails)
userRouter.get('/transactions/:userId',authUser,checkBlocked,userTransactionHelper.getAllTransactions)
userRouter.post('/contact-us/send-email',authUser,checkBlocked,userController.sendEmail)








// userRouter.get('/services-list',(req,res,next)=>{console.log("gets call"); next()},authUser,checkBlocked,userController.helloworld)






module.exports = userRouter  
