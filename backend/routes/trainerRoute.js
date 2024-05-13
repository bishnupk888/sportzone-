const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.send('home trainer')
})
router.get('/home',(req,res)=>{
    res.send('home trainer')
})

router.get('/login',(req,res)=>{
    res.send('login trainer')
})
router.post('/login',(req,res)=>{
    
})

router.get('/register',(req,res)=>{
    res.send('register trainer')
})
router.post('/register',(req,res)=>{
    
})



module.exports = router