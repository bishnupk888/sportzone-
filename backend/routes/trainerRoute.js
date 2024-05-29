const express = require('express')
const trainerRouter = express.Router()
const trainerController = require('../controller/trainerController')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')


trainerRouter.get('/',trainerController.getAllTrainers)
trainerRouter.get('/:id', trainerController.getTrainer)
trainerRouter.put('/:id', trainerController.updateTrainer)


 module.exports =  trainerRouter