const express = require("express");
const { saveUserData } = require("../controllers/calculator");

const calculatorRouter = express.Router();

calculatorRouter.post("/calculator", saveUserData);

module.exports = calculatorRouter;
