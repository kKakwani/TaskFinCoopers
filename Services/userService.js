const userModel = require("../Models/userModel");

const helperFunctions = require("../Helpers/authHelper");

async function verifyEmailService(body) {
  let user = await userModel.findOne({ email: body.email });
  if (user) {
    return user;
  } else {
    return false;
  }
}

async function signupUserService(body) {
  let user = await userModel.findOne({ email: body.email });
  if (user) {
    if (user.status == "0") {
      let hashPassword = await helperFunctions.bcryptPass(body.password);
      const updateUser = {
        password: hashPassword,
        status: "1",
      };
      await userModel.updateOne({ email: body.email }, { $set: updateUser });
      let privatekey = process.env.TEMP_KEY;
      let params = {
        id: user._id,
        email: user.email,
      };
      const token = await helperFunctions.sendToken(params, privatekey, "1d");
      let res = {
        status: "success",
        token: token,
      };
      return {
        status: 201,
        success: true,
        msg: "User registered successfully",
        data: { token: res?.token },
      };
    }
  } else {
    let hashPassword = await helperFunctions.bcryptPass(body.password);
    let formData = new userModel({
      username: body.username,
      email: body.email,
      password: hashPassword,
      status: "1",
    });
    try {
      return await formData.save().then(async (result) => {
        let privatekey = process.env.TEMP_KEY;
        let params = {
          id: result._id,
          email: result.email,
        };
        const token = await helperFunctions.sendToken(params, privatekey, "1d");
        let res = {
          status: "success",
          token: token,
        };
        return {
          status: 201,
          success: true,
          msg: "User registered successfully",
          data: { token: res?.token },
        };
      });
    } catch (err) {
      const res = {
        status: "error",
        error: err.message,
      };
      return {
        status: 400,
        success: false,
        msg: "Error when register user",
        data: res?.error ? res.error : res,
      };
    }
  }
}

async function loginService(body) {
  try {
    const user = await userModel.findOne({ email: body.email });
    if (user) {
      let match = await helperFunctions.comparePass(
        body.password,
        user.password
      );
      if (match) {
        let params = {
          id: user._id,
          email: user.email,
        };
        const token = await helperFunctions.sendToken(params);
        let res = {
          status: "success",
          token: token,
          userData: {
            id: user._id,
            username: user.username,
            email: user.email,
            status: user.status,
          },
        };
        return {
          status: 200,
          success: true,
          msg: "Logged in successfully.",
          data: res,
        };
      } else {
        const res = {
          status: "error",
          msg: "Invalid Email or Password",
          error: {},
        };
        return {
          status: 400,
          success: false,
          msg: res.msg,
          data: res?.error ? res.error : res,
        };
      }
    } else {
      const res = {
        status: "error",
        msg: "User not found.",
        error: {},
      };
      return {
        status: 404,
        success: false,
        msg: res.msg,
        data: res?.error ? res.error : res,
      };
    }
  } catch (error) {
    const res = {
      status: "error",
      msg: "Something went wrong",
      error: error.message,
    };
    return { status: 500, success: false, msg: res.msg, data: res.error };
  }
}

async function getUserProfileService(user_id) {
  try {
    let user = await userModel.findOne({ _id: user_id });
    if (user) {
      let res = {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
      };
      return {
        status: 200,
        success: true,
        msg: "Profile getting successfully",
        data: res,
      };
    } else {
      return { status: 404, success: false, msg: "User not found", data: {} };
    }
  } catch (err) {
    return {
      status: 500,
      success: false,
      msg: "Something went wrong while get user profile",
      data: {},
    };
  }
}

module.exports = {
  verifyEmailService,
  signupUserService,
  loginService,
  getUserProfileService,
};
