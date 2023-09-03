const express = require("express");
const { saveUserData, getUserData,updateUserData } = require("../controllers/calculator");

const authentication = require("../middleware/authentication");

const calculatorRouter = express.Router();

calculatorRouter.post("/", authentication, saveUserData);
calculatorRouter.get("/", authentication, getUserData);
calculatorRouter.put("/", authentication,updateUserData)

module.exports = calculatorRouter;
