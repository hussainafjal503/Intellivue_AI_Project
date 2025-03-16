const CustomError = require("./Error-middlewares");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserModels");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(400).json({
        success:false,
        message:"Not Authorized, Please Login"
      })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({
        messsage:"unable to verify",
        success:false
      })
    }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(`Error occured while Authenticating user : ${err}`);
    return res.status(400).json({
      message:"unable to authenticate the user",
      success:false
    })
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You are not Authorized to access this Source..",
      });
    }

    next();
  } catch (err) {
    console.log(`Error Occured while Authenticating user : ${err}`);
    throw err;
  }
};

const isUser = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    if (role !== "user") {
      return res.status(200).json({
        success: false,
        message: "You are not Authorized to access this Source..",
      });
    }

    next();
  } catch (err) {
    console.log(`Error Occured while Authenticating user : ${err}`);
    throw err;
  }
};

module.exports = { isAuthenticated, isAdmin, isUser };
