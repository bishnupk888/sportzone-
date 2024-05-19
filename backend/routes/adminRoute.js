const express = require('express')
const adminController = require('../controller/adminController')
const adminRouter = express.Router()


adminRouter.post('/login',adminController.adminLogin)



module.exports = adminRouter