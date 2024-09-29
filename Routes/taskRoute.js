const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/auth");
const CEB = require("../Middlewares/emptyBody");
const validate = require("../Middlewares/validation");
const taskController = require("../Controllers/taskController");
const ErrorHandler = require("../Utils/errorHandler");

// USER TASKS
router.post(
  "/create-task",
  CEB.ceb,
  auth.privateAuth,
  (req, res, next) => {
    const { error } = validate.createTaskValidation(req.body);
    if (error) {
      return next(new ErrorHandler(`${error.details[0].message}`, 400));
    }
    next(); // Proceed if validation passes
  },
  taskController.createTaskController
);
router.get(
  "/get-all-tasks",
  auth.privateAuth,
  taskController.getAllTasksController
);
router.put(
  "/update-task/:id",
  CEB.ceb,
  auth.privateAuth,
  (req, res, next) => {
    const { error } = validate.updateTaskValidation(req.body);
    if (error) {
      return next(new ErrorHandler(`${error.details[0].message}`, 400));
    }
    next(); // Proceed if validation passes
  },
  taskController.updateTaskController
);
router.delete(
  "/delete-task/:id",
  auth.privateAuth,
  taskController.deleteTaskController
);

module.exports = router;
