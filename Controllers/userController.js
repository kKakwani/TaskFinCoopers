const userService = require("../Services/userService");
const Promise = require("bluebird");
const { SuccessHandler } = require("../Middlewares/responseHandler");
const ErrorHandler = require("../Utils/errorHandler");

exports.signupController = async (req, res, next) => {
  let body = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  return await Promise.resolve(userService.verifyEmailService(body)).then(
    async (result) => {
      if (result.status == "1") {
        return next(new ErrorHandler("Email already exist", 409, {}));
      } else {
        return await Promise.resolve(userService.signupUserService(body))
          .then(async (data) => {
            if (data?.success) {
              SuccessHandler(res, data.msg, data.status, data.data);
            } else if (!data?.success) {
              return next(new ErrorHandler(data.msg, data.status, data.data));
            } else {
              return next(new ErrorHandler("Something went wrong", 500, data));
            }
          })
          .catch((err) => {
            return next(
              new ErrorHandler(
                "Something went wrong while user signup",
                500,
                err.message
              )
            );
          });
      }
    }
  );
};

exports.loginController = async (req, res, next) => {
  return Promise.resolve(userService.loginService(req.body))
    .then((data) => {
      if (data.success) {
        SuccessHandler(res, data.msg, data.status, data.data);
      } else {
        return next(new ErrorHandler(data.msg, data.status, data.data));
      }
    })
    .catch((err) => {
      return next(
        new ErrorHandler(
          "Something went wrong while login user",
          500,
          err.message
        )
      );
    });
};
