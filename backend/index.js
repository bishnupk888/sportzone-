// server.js
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const connectDb = require('./config/connectDb');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoute');
const trainerRoute = require('./routes/trainerRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const bookingRoute = require('./routes/bookingRoutes');
const chatSocket = require('./sockets/chatSocket');
const chatRoute = require('./routes/chatRoute');
const notificationRoute = require('./routes/notificationRoute')


if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from this origin
    credentials: true,               // Allow credentials (cookies, authorization headers, etc.)
}));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/trainers', trainerRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/chat',chatRoute)
app.use('/api/notifications',notificationRoute)

// connect database
connectDb();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CORS_ORIGIN, // Ensure this matches the client's address
        methods: ["GET", "POST"],
        credentials: true
    }
});

// socket io connection

chatSocket(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
