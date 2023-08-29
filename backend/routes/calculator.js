const express = require("express");
const { saveUserData } = require("../controllers/calculator");

const authentication = require("../middleware/authentication")

const calculatorRouter = express.Router();

calculatorRouter.post("/",authentication, saveUserData);

module.exports = calculatorRouter;
