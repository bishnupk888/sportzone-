const express = require('express')
const authRouter = express.Router()
const otpHelper = require('../helpers/otpHelper')

const authController = require('../controller/authController')


authRouter.post('/login',authController.login)
authRouter.post('/google-sign-in',authController.googleSignIn)


authRouter.post('/register',authController.register)
authRouter.post('/google-sign-up',authController.googleSignUp)

authRouter.post('/verify-otp',otpHelper.verifyOtp)
authRouter.post('/re-send-otp',otpHelper.resendOtp)
authRouter.post('/logout',authController.logout)
authRouter.post('/reset-password',authController.resetPassword)
authRouter.post('/reset-password/verify-otp',otpHelper.verifyOtpResetPassword)


module.exports = authRouter
     