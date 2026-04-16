const dotenv = require("dotenv");

// Only load .env file in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const requiredVars = ["MONGODB_URI"];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingVars.join(", "));
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dxig2wfai",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "433296327131327",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "TZoom3kSh7v_apJZJXZK7frYIAw",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};
