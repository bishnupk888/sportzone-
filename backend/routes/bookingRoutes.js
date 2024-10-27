const express = require('express')
const authenticate = require('../middlewares/authUser')
const bookingController = require('../controller/bookingController')
const paymentController =  require('../controller/paymentController')

const bookingRouter = express.Router()


bookingRouter.post('/checkout-session',authenticate,bookingController.getCheckoutSession)
bookingRouter.post('/verify-payment',authenticate, paymentController.verifyPayment);
bookingRouter.post('/payment-webhook',authenticate,bookingController.walletBooking)
bookingRouter.post('/wallet-payment',authenticate,bookingController.walletBooking)
bookingRouter.post('/booking-success',authenticate,bookingController.bookingSuccess)



module.exports = bookingRouter