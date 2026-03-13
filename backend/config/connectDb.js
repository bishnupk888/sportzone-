const mongoose = require('mongoose')
require('dotenv').config()


async function connectDb(){
   try {
    console.log("connecting.. to db");
    
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri)
    console.log("connected to db");
   } catch (error) {
     console.error(error)
   }
}

module.exports = connectDb