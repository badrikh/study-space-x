import express from "express";
const router = express.Router();

import * as userController from "../controllers/userController.js";
import verifyToken from "../middlewares/auth.js";

// PUBLIC
router.post(
  "/register",
  userController.register
);

router.post(
  "/login",
  userController.login
);

// PROTECTED
router.get(
  "/",
  verifyToken,
  userController.getAllUsers
);

router.get(
  "/:id",
  verifyToken,
  userController.getUserById
);

router.put(
  "/:id",
  verifyToken,
  userController.updateUser
);

export default router;