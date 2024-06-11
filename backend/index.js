const express = require('express')
const app = express()
const connectDb = require('./config/connectDb')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoute')
const trainerRoute = require('./routes/trainerRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const checkBlocked = require('./middlewares/checkBlocked')

if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

app.use(express.json());
app.use(cookieParser())

app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from this origin
    credentials: true,               // Allow credentials (cookies, authorization headers, etc.)
  }));
app.use('/api/auth',authRoute)
app.use('/api/users', userRoute);
app.use('/api/admin',adminRoute)
app.use('/api/trainers',trainerRoute)

// connect database
connectDb();

// server 
app.listen(process.env.PORT, () => {
    console.log(`server connected in port ${process.env.PORT}`)
});
