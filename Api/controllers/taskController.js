import mongoose from "mongoose";
import taskCollection from "../models/taskModel.js";

export const postTask = (req, res) => {
  try {
    const { managerId } = req.query;
    const { name, description, dueDate, employeeId } = req.body;

    const task = taskCollection.create({
      name,
      description,
      dueDate,
      managerId,
      employeeId,
    });

    if (!task) {
      return res.status(400).json({
        message: "Task is not Inserted.",
      });
    }

    return res.status(200).json({
      message: "task is inserted successfully",
      taskDetail: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
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
        message: "Tasks Not Found",
      });
    }

    return res.status(200).json({
      message: "Task Details",
      taskDetails: taskDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};


export const deleteTask = (req, res)=>{
  try {
    const deleteTask = taskCollection.findByIdAndUpdate()
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
}