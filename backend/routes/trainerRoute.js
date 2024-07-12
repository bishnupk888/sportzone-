const express = require('express')
const trainerRouter = express.Router()
const trainerController = require('../controller/trainerController')
const trainerSlotHelper = require('../helpers/trainerHelpers/slotHelpers')
const trainerBookingHelper = require('../helpers/trainerHelpers/bookingHelper')
const authTrainer = require('../middlewares/authUser')
const checkBlocked = require('../middlewares/checkBlocked')
const trainerTransactionHelper = require('../helpers/trainerHelpers/transactionHelper')



// trainerRouter.get('/',trainerController.getAllTrainers)
trainerRouter.get('/:id',authTrainer,checkBlocked,trainerController.getTrainer)
trainerRouter.put('/:id',authTrainer,checkBlocked, trainerController.updateTrainer)
trainerRouter.patch('/:id/profile-image',authTrainer,checkBlocked,trainerController.updateProfileImage)
trainerRouter.patch('/:id/certificate',authTrainer,checkBlocked,trainerController.updateCertificate)
trainerRouter.post('/slots/add-slot',authTrainer,checkBlocked,trainerSlotHelper.addSlots)
trainerRouter.get('/:id/slots',authTrainer,checkBlocked,trainerSlotHelper.getTrainerSlots)
trainerRouter.delete('/slots/delete-slot/:id',authTrainer,checkBlocked,trainerSlotHelper.deleteSlot)
trainerRouter.put('/slots/edit-slot/:slotId',authTrainer,checkBlocked,trainerSlotHelper.editSlot)
trainerRouter.get('/bookings/:id',authTrainer,checkBlocked,trainerBookingHelper.getAllBookings)
trainerRouter.get('/booking-details/:bookingId',authTrainer,checkBlocked,trainerBookingHelper.getBookingDetails)
trainerRouter.get('/transactions/:userId',authTrainer,checkBlocked,trainerTransactionHelper.getAllTransactions)



 module.exports =  trainerRouter 