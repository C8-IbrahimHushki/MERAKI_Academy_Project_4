const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  weightProgress: [{ type: Number }],
  dailyCalorieIntake: [{ type: Number }],
  dailyProteinIntake: [{ type: Number }],
});
