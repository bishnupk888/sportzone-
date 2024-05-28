const express = require('express')
const trainerRouter = express.Router()
const trainerController = require('../controller/trainerController')

const authAdmin = require('../middlewares/authAdmin')

trainerRouter.get('/',authAdmin,trainerController.getAllTrainers)
trainerRouter.get('/:id', trainerController.getTrainer)
trainerRouter.put('/:id', trainerController.updateTrainer)


 module.exports =  trainerRouter