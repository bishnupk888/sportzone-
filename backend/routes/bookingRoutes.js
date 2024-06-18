const express = require('express')
const authenticate = require('../middlewares/authUser')
const bookingController = require('../controller/bookingController')

const bookingRouter = express.Router()


bookingRouter.post('/checkout-session',authenticate,bookingController.getCheckoutSession)


module.exports = bookingRouter