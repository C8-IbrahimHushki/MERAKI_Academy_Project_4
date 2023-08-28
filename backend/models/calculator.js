const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  goalWeight: { type: Number},
  goal: { type: String, required: true },
  bodyBuilding: { type: Boolean },
  activity: { type: String, required: true },
  calorieIntake: { type: Number },
  proteinIntake: { type: Number },
});

module.exports = mongoose.model("Calculator", calculatorSchema);
