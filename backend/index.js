const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

// Routers
const usersRouter = require("./routes/users")
const recipesRouter = require("./routes/recipes")
const calculatorRouter = require("./routes/calculator")
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Routes middleware
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/calculator", calculatorRouter)

const schedule = require('node-schedule');
// '0 0 * * *'
const job = schedule.scheduleJob('01 * * * *', async () => {
  console.log('Running scheduled update...')
});

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
