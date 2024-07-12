const express = require('express')
const authenticate = require('../middlewares/authUser')
const notificationController = require('../controller/notificationController')

const notificationRouter = express.Router()


notificationRouter.get('/:userId',authenticate,notificationController.getNotifications)
// notificationRouter.post('/wallet-payment',authenticate,notificationController.walletBooking)


module.exports = notificationRouter