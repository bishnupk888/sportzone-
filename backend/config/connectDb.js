const mongoose = require('mongoose')

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
    process.exit(1); // Exit if DB connection fails
  }
}

module.exports = connectDb