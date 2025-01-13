import express from "express";
import {
  getAllDeletedUser,
  resetUser,
} from "../controllers/adminController.js";

const router = express.Router();

// get all the deleted users
router.get("/deleted-user", getAllDeletedUser);

// reset the deleted user
router.patch("/reset-user", resetUser);

export default router;
