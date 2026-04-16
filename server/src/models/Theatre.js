const mongoose = require("mongoose");

const seatLayoutSchema = new mongoose.Schema(
  {
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    vipRows: { type: Number, required: true },
    premiumRows: { type: Number, required: true },
  },
  { _id: false }
);

const theatreSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, index: true },
    screens: { type: Number, required: true },
    experienceScore: { type: Number, required: true },
    screenQuality: { type: Number, required: true },
    soundQuality: { type: Number, required: true },
    seatingComfort: { type: Number, required: true },
    seatLayout: { type: seatLayoutSchema, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theatre", theatreSchema);
