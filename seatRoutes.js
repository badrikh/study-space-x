import express from "express";
const router = express.Router();

import * as seatController from "../controllers/seatController.js";

router.get(
  "/",
  seatController.getAllSeats
);

router.post(
  "/",
  seatController.createSeat
);

router.put(
  "/:id",
  seatController.updateSeat
);

router.delete(
  "/:id",
  seatController.deleteSeat
);

export default router;