import express from "express";
const router = express.Router();

import * as menuController from "../controllers/menuController.js";

router.get(
  "/",
  menuController.getAllmenu
);

router.get(
  "/:id",
  menuController.getmenuById
);

router.post(
  "/",
  menuController.createMenu
);

router.delete(
  "/:id",
  menuController.deleteMenu
);

export default router;