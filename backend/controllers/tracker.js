const trackerModel = require("../models/tracker");

const updateTrackerData = async (req, res) => {
  const { weightProgress, dailyCalorieIntake, dailyProteinIntake } = req.body;
  const userId = req.userId;

await trackerModel.findOne({ user: userId }).then().catch();

};

module.exports = { updateTrackerData };