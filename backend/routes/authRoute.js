const express = require('express')
const authRouter = express.Router()
const otpHelper = require('../helpers/otpHelper')

const authController = require('../controller/authController')


authRouter.post('/login',authController.login)

authRouter.post('/register',authController.register)
authRouter.post('/verify-otp',otpHelper.verifyOtp)
authRouter.post('/re-send-otp',otpHelper.resendOtp)
authRouter.post('/logout',authController.logout)
authRouter.post('/reset-password',authController.resetPassword)


module.exports = authRouter
