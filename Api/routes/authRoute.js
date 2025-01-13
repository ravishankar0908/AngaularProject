import express from "express";
import { authUsers } from "../controllers/authController.js";

const router = express.Router();

// authenticate the user login
router.post("/", authUsers);

export default router;
