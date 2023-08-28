const express = require("express");
const { saveUserData } = require("../controllers/calculator");

const calculatorRouter = express.Router();

calculatorRouter.post("/", saveUserData);

module.exports = calculatorRouter;
