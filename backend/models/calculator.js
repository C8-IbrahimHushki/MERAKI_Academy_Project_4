const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  goalWeight: { type: Number, required: true },
  goal: { type: String, required: true },
  bodyBuilding: { type: Boolean, required: true },
  activity: { type: String, required: true },
  calorieIntake: { type: Number, required: true },
  proteinIntake: { type: Number, required: true },
});

module.exports = mongoose.model("Calculator", calculatorSchema);
