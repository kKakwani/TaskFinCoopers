const taskService = require("../Services/taskService");
const Promise = require("bluebird");
const { SuccessHandler } = require("../Middlewares/responseHandler");
const ErrorHandler = require("../Utils/errorHandler");

exports.createTaskController = async (req, res, next) => {
  let body = {
    user_id: req.decoded.id,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status
  };
  return Promise.resolve(taskService.createTaskService(body)).then((data) => {
    if (data) {
      SuccessHandler(res, data.msg, data.status, data.data);
    } else {
      return next(new ErrorHandler(data.msg, data.status, data.data));
    }
  });
};

exports.getAllTasksController = async (req, res, next) => {
  return Promise.resolve(taskService.getAllTasksService(req.decoded.id)).then(
    (data) => {
      if (data) {
        SuccessHandler(res, data.msg, data.status, data.data);
      } else {
        return next(new ErrorHandler(data.msg, data.status, data.data));
      }
    }
  );
};

exports.updateTaskController = async (req, res, next) => {
  let body = {
    user_id: req.decoded.id,
    task_id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    status: req.body.status,
  };
  return Promise.resolve(taskService.updateTaskService(body)).then((data) => {
    if (data) {
      SuccessHandler(res, data.msg, data.status, data.data);
    } else {
      return next(new ErrorHandler(data.msg, data.status, data.data));
    }
  });
};

exports.deleteTaskController = async (req, res, next) => {
  return Promise.resolve(
    taskService.deleteTaskService(req.decoded.id, req.params.id)
  )
    .then((data) => {
      if (data) {
        SuccessHandler(res, data.msg, data.status, data.data);
      } else {
        return next(new ErrorHandler(data.msg, data.status, data.data));
      }
    })
    .catch((err) => {
      return next(
        new ErrorHandler(
          "Something went wrong when delete user task",
          500,
          err.message
        )
      );
    });
};
