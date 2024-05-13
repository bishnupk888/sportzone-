const express = require('express')
const bcrypt  = require('bcrypt')
const router = express.Router()
const User = require('../model/userModel')
const userController = require('../controller/userController')

router.get('/register',userController.getRegisterUser)
router.post('/register',userController.postRegisterUser)

router.get('/login',userController.getLoginUser)
router.post('/login',userController.postLoginUser)

router.get('/logout',userController.logoutUser)

router.get('/home',userController.userHome)




module.exports = router
