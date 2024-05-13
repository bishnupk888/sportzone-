const express = require('express')
const app = express()
const connectDb = require('./config/connectDb')
const Admin = require('./model/adminModel')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoute')
const trainerRoute = require('./routes/trainerRoute')
if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users', userRoute);
app.use('/admin',adminRoute)
app.use('/trainer',trainerRoute)

// connect database
connectDb();

// server 
app.listen(process.env.PORT, () => {
    console.log(`server connected in port ${process.env.PORT}`)
});
