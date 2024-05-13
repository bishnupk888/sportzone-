const express = require('express')
const Admin = require('../model/adminModel')
const adminController = require('../controller/adminController')
const router = express.Router()


router.post('/login',adminController.adminLogin)



module.exports = router