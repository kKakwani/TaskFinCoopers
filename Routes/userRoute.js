const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");
const CEB = require("../Middlewares/emptyBody");
const validate = require("../Middlewares/validation");
const userController = require("../Controllers/userController");
const { SuccessHandler } = require("../Middlewares/responseHandler");
const ErrorHandler = require("../Utils/errorHandler");

// USER AUTHENTICATION
router.post(
  "/auth/register",
  CEB.ceb,
  (req, res, next) => {
    const { error } = validate.registerValidation(req.body);
    if (error) {
      return next(new ErrorHandler(`${error.details[0].message}`, 400));
    }
    next(); // Proceed if validation passes
  },
  userController.signupController
);
router.post(
  "/auth/login",
  CEB.ceb,
  (req, res, next) => {
    const { error } = validate.loginValidation(req.body);
    if (error) {
      return next(new ErrorHandler(`${error.details[0].message}`, 400));
    }
    next(); // Proceed if validation passes
  },
  userController.loginController
);

module.exports = router;
