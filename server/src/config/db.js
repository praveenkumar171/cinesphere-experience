const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");
const { theatres } = require("../data/store");
const Theatre = require("../models/Theatre");

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    const error = "❌ MONGODB_URI is not configured. Please set it in environment variables.";
    console.error(error);
    throw new Error(error);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
};

const seedTheatresIfEmpty = async () => {
  const theatreCount = await Theatre.countDocuments();
  if (theatreCount > 0) return;

  await Theatre.insertMany(theatres);
  console.log(`Seeded ${theatres.length} theatres into MongoDB.`);
};

module.exports = {
  connectToDatabase,
  seedTheatresIfEmpty,
};
