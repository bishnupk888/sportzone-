const express = require('express')
const router = express.Router()
const trainerController = require('../controller/trainerController')
const requireAuth = require('../middlewares/requireAuthTrainer')
router.get(['/', '/home'],(req,res)=>{
    res.send('home trainer')
})

router.get('/login',(req,res)=>{
    res.send('login trainer')
})
router.post('/login', trainerController.loginTrainer)

router.get('/register',(req,res)=>{
    res.send('register trainer')
})
router.post('/register',trainerController.registerTrainer)

router.get('/logout',trainerController.logoutTrainer)
router.get('/check-auth',requireAuth,trainerController.checkAuthTrainer)


module.exports = router