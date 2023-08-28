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

app.use(cors());
app.use(express.json());

// Routes middleware
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/calculator", calculatorRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
