const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = new usersModel({
    userName,
    email,
    password,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        sucess: true,
        message: "User Created",
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  usersModel
    .findOne({ email })
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or the password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email or password is incorrect`,
          });
        }

        const payload = {
          userId: result._id,
          userName: result.userName,
          role: result.role
        };

       const options = {
        expiresIn: "12h"
       }

        const token = jwt.sign(payload, process.env.SECRET, options)
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { register, login };
