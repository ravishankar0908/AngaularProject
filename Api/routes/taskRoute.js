import express from "express";
import {
  deleteTask,
  getTask,
  getTaskById,
  postTask,
  restoreTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

// insert task into database
router.post("/", postTask);
// get all the task details
router.get("/all-tasks", getTask);
// get task by Id
router.get("/byid", getTaskById);

// delete task by id
router.delete("/delete", deleteTask);

// restore the deleted task
router.patch("/restore", restoreTask);

// update the task
router.put("/update", updateTask);
export default router;
