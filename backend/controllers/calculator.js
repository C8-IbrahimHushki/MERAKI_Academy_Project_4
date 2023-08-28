const calculatorModel = require("../models/calculator");

const saveUserData = (req, res) => {
  const {
    gender,
    height,
    weight,
    age,
    goalWeight,
    goal,
    bodyBuilding,
    activity,
    calorieIntake,
    proteinIntake,
  } = req.body;

  const userData = new calculatorModel({
    gender,
    height,
    weight,
    age,
    goalWeight,
    goal,
    bodyBuilding,
    activity,
    calorieIntake,
    proteinIntake,
  });

  userData
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Data Saved",
        info: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    });
};

module.exports = { saveUserData };
