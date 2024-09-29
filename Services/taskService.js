const taskModel = require("../Models/taskModel");

async function createTaskService(body) {
  try {
    let task = await taskModel.findOne({
      user_id: body.user_id,
      title: body.title,
    });
    if (task != null) {
      return {
        status: 400,
        success: false,
        msg: "Task already exist",
        data: {},
      };
    }
    let formData = new taskModel({
      user_id: body.user_id,
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      status: body.status 
    });
    let userTask = await formData.save();
    return {
      status: 201,
      success: true,
      msg: "Task created successfully",
      data: userTask,
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      msg: "Something went wrong while create task",
      data: {},
    };
  }
}

async function getAllTasksService(user_id) {
  try {
    return await taskModel.find({ user_id: user_id }).sort({_id: -1}).then((tasks) => {
      if (tasks.length > 0) {
        return {
          status: 200,
          success: true,
          msg: "Tasks getting successfully",
          data: tasks,
        };
      } else {
        return {
          status: 404,
          success: false,
          msg: "No tasks found",
          data: [],
        };
      }
    });
  } catch (err) {
    return {
      status: 500,
      success: false,
      msg: "Something went wrong while get tasks",
      data: {},
    };
  }
}

async function updateTaskService(body) {
  try {
    let userTask = await taskModel.findOne({
      user_id: body.user_id,
      _id: body.task_id,
    });
    if (!userTask) {
      return {
        status: 404,
        success: false,
        msg: "Task not found",
      };
    }

    let updateDocument = {}
    // Check for each field in the request body and update accordingly
    if (body.title) {
      updateDocument["title"] = body.title;
    }
    if (body.description) {
      updateDocument["description"] = body.description;
    }
    if (body.dueDate) {
      updateDocument["dueDate"] = body.dueDate;
    }
    if (body.status) {
      updateDocument["status"] = body.status
    }

    return await taskModel
      .updateOne({ _id: userTask._id }, { $set: updateDocument })
      .then((result) => {
        const res = {
          status: "success",
          msg: "Task updated successfully",
          result,
        };
        return {
          status: 200,
          success: true,
          msg: res?.msg,
          data: res?.result,
        };
      })
      .catch((err) => {
        const res = {
          status: "error",
          msg: "Task not updated",
          error: err.message,
        };
        return {
          status: 400,
          success: false,
          msg: res?.msg ? res.msg : "Something went wrong",
          data: res?.error ? res.error : res,
        };
      });
  } catch (error) {
    const res = {
      status: "error",
      msg: "Something went wrong while updating task",
      error: error.message,
    };
    return {
      status: 500,
      success: false,
      msg: res?.msg ? res.msg : "Something went wrong while update task",
      data: res?.error ? res.error : res,
    };
  }
}

async function deleteTaskService(user_id, task_id) {
  try {
    const deleteTask = await taskModel.findOneAndDelete({
      user_id: user_id,
      _id: task_id,
    });
    if (!deleteTask) {
      return {
        status: 400,
        success: false,
        msg: "Task not found",
        data: {},
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Task deleted successfully",
      data: {},
    };
  } catch (err) {
    return {
      status: 500,
      success: false,
      msg: "Something went wrong while delete task",
      data: {},
    };
  }
}

module.exports = {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
};
