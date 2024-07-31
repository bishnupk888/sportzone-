// server.js
const express = require('express');
const  path = require('path')
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

const corsOrigins = process.env.CORS_ORIGIN.split(',');

const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir);

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: corsOrigins, 
    credentials: true,               
}));

app.use('/api/auth', authRoute);
app.use('/api/users',  userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/trainers', trainerRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/chat',chatRoute)
app.use('/api/notifications',notificationRoute)

if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
    const __dirname = path.resolve();
    app.use(express.static(path.join(parentDir, "/frontend/dist")));
    app.get("*", (req, res) =>res.sendFile(path.resolve(parentDir, "frontend", "dist", "index.html")))
}



 
// connect database
connectDb();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: corsOrigins, // Ensure this matches the client's address
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
