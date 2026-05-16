import express from "express";
const router = express.Router();

import * as ordersController from "../controllers/orders.controller.js";

router.post(
  "/",
  ordersController.createOrder
);

router.get(
  "/",
  ordersController.getAllOrders
);

router.get(
  "/:id",
  ordersController.getOrderById
);

router.put(
  "/:id",
  ordersController.updateOrder
);

router.delete(
  "/:id",
  ordersController.deleteOrder
);

export default router;