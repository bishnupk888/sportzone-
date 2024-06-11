const express = require('express')
const trainerRouter = express.Router()
const trainerController = require('../controller/trainerController')
const authTrainer = require('../middlewares/authUser')
const checkBlocked = require('../middlewares/checkBlocked')



// trainerRouter.get('/',trainerController.getAllTrainers)
trainerRouter.get('/:id',authTrainer,checkBlocked,trainerController.getTrainer)
trainerRouter.put('/:id',authTrainer,checkBlocked, trainerController.updateTrainer)
trainerRouter.patch('/:id/profile-image',authTrainer,checkBlocked,trainerController.updateProfileImage)

 module.exports =  trainerRouter 