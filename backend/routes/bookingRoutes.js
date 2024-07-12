const express = require('express')
const authenticate = require('../middlewares/authUser')
const bookingController = require('../controller/bookingController')

const bookingRouter = express.Router()


bookingRouter.post('/checkout-session',authenticate,bookingController.getCheckoutSession)
bookingRouter.post('/wallet-payment',authenticate,bookingController.walletBooking)


module.exports = bookingRouter