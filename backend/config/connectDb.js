const mongoose = require('mongoose');
const dns = require('dns');

// Overriding DNS server to resolve MongoDB SRV records correctly when local DNS (127.0.0.1) fails
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDb() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1); // Exit in production if DB connection fails
    } else {
      console.warn("WARNING: Server running WITHOUT a database connection (dev mode).");
    }
  }
}

module.exports = connectDb