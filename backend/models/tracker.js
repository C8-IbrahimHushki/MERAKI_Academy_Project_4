const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  weightProgress: [{ type: Number }],
  dailyCalorieIntake: [{ type: Number }],
  dailyProteinIntake: [{ type: Number }],
});

module.exports = mongoose.model("Tracker", trackerSchema);