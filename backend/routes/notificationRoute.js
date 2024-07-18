const express = require('express')
const authenticate = require('../middlewares/authUser')
const notificationController = require('../controller/notificationController')

const notificationRouter = express.Router()


notificationRouter.get('/:userId',authenticate,notificationController.getNotifications)
notificationRouter.put('/:userId',authenticate,notificationController.markAsReadNotifications)




module.exports = notificationRouter