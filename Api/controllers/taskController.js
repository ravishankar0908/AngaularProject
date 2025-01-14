import mongoose from "mongoose";
import taskCollection from "../models/taskModel.js";
import { messages } from "../utils/constant.js";

export const postTask = async (req, res) => {
  try {
    const { managerId } = req.query;
    const { name, description, dueDate, employeeId } = req.body;

    const isTaskNameExist = await taskCollection.findOne({ name: name });
    if (isTaskNameExist) {
      return res.status(409).json({
        message: messages.exist,
      });
    }

    const task = await taskCollection.create({
      name,
      description,
      dueDate,
      managerId,
      employeeId,
    });

    if (!task) {
      return res.status(400).json({
        message: messages.notCreated,
      });
    }

    return res.status(200).json({
      message: messages.inserted,
      taskDetail: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error,
    });
  }
};

// get task details
export const getTask = async (req, res) => {
  try {
    const taskDetails = await taskCollection.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "employeeId",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      {
        $unwind: {
          path: "$employeeDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "managerId",
          foreignField: "_id",
          as: "managerDetails",
        },
      },
      {
        $unwind: "$managerDetails",
      },
    ]);

    if (taskDetails.length === 0) {
      return res.status(400).json({
        message: messages.notFound,
      });
    }

    return res.status(200).json({
      message: "Task Details",
      taskDetails: taskDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error,
    });
  }
};

// delete task by id
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    const deleteTask = await taskCollection.findByIdAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(taskId),
      },
      { $set: { isDelete: true } }
    );

    if (!deleteTask) {
      return res.status(400).json({
        message: messages.notDeleted,
      });
    }

    return res.status(200).json({
      message: messages.deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.query;

    const findTask = await taskCollection
      .findOne({ _id: taskId })
      .populate("employeeId");

    if (!findTask) {
      return res.status(400).json({
        messages: messages.notFound,
      });
    }
    return res.status(200).json({
      messages: messages.found,
      data: findTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error,
    });
  }
};

// restore the deleted task
export const restoreTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    const deleteTask = await taskCollection.findByIdAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(taskId),
      },
      { $set: { isDelete: false } }
    );

    if (!deleteTask) {
      return res.status(400).json({
        message: messages.notRestore,
      });
    }

    return res.status(200).json({
      message: messages.restore,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error,
    });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const { taskId, name, description, dueDate, employeeId } = req.body;

    const isTaskNameExist = await taskCollection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(taskId) },
      {
        $set: {
          name: name,
          employeeId: new mongoose.Types.ObjectId(employeeId),
          description: description,
          dueDate: dueDate,
        },
      }
    );

    if (!isTaskNameExist) {
      return res.status(400).json({
        message: messages.notFound,
      });
    }

    return res.status(200).json({
      message: messages.updated,
      date: isTaskNameExist,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error,
    });
  }
};
