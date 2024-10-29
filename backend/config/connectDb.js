const mongoose = require('mongoose')
require('dotenv').config()

async function connectDb(){
   try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to db");
   } catch (error) {
     console.error(error)
   }
}
module.exports = connectDb