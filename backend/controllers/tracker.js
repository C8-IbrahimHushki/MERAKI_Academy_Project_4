const trackerModel = require("../models/tracker");

const updateTrackerData = (req, res) => {
  const { weightProgress, dailyCalorieIntake, dailyProteinIntake } = req.body;
  
  
};

module.exports = { updateTrackerData };