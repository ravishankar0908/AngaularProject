import express from "express";
import { getTask, postTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", postTask);
router.get("/all-tasks", getTask);

export default router;
