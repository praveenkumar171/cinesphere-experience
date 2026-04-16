const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");
const { theatres } = require("../data/store");
const Theatre = require("../models/Theatre");

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
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
