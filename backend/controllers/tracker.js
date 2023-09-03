const trackerModel = require("../models/tracker");

const updateTrackerData =  (req, res) => {
  const userId = req.token.userId;
  const { weightProgress, dailyCalorieIntake, dailyProteinIntake } = req.body;

  const updatedFields = {};

  if (weightProgress !== undefined ) {
    updatedFields.weightProgress = weightProgress;
  }

  if (dailyCalorieIntake !== undefined ) {
    updatedFields.dailyCalorieIntake = dailyCalorieIntake;
  }

  if (dailyProteinIntake !== undefined) {
    updatedFields.dailyProteinIntake = dailyProteinIntake;
  }
  trackerModel
    .updateOne({ user: userId }, req.body, { new: true })
    .then((updatedInfo) => {
      res.status(202).json({
        success: true,
        message: `Data updated`,
        updatedInfo: updatedInfo,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { updateTrackerData };