const express = require("express");
const { updateTrackerData } = require("../controllers/tracker");

const authentication = require("../middleware/authentication");

const trackerRouter = express.Router();

trackerRouter.put("/", authentication, updateTrackerData)

module.exports = trackerRouter;