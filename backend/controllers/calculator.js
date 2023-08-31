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

  const user = req.token.userId;

  const userData = new calculatorModel({
    user,
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

const getUserData = (req, res) => {
  const userId = req.token.userId;
  calculatorModel
    .find({ user: userId }).populate("user").exec()
    .then((result) => {
      if (!result.length) {
        return res.status(200).json({
          success: false,
          message: "User data not entered",
        });
      }
      res.status(200).json({
        success: true,
        message: "Data found",
        userInfo: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};

module.exports = { saveUserData, getUserData };
