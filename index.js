const express = require('express')
require("dotenv").config()
const app = express()



// server
app.listen(process.env.PORT,()=>{
  console.log("connected to server")
})