const express = require("express");
const { saveUserData, getUserData } = require("../controllers/calculator");

const authentication = require("../middleware/authentication");

const calculatorRouter = express.Router();

calculatorRouter.post("/", authentication, saveUserData);
calculatorRouter.get("/", authentication, getUserData);

module.exports = calculatorRouter;
