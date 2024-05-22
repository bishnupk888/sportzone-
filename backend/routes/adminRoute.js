const express = require('express')
const adminController = require('../controller/adminController')
const adminRouter = express.Router()


adminRouter.post('/login',adminController.adminLogin)
adminRouter.post('/logout',adminController.logout)



module.exports = adminRouter