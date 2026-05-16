import express from "express";
const router = express.Router();

import * as paymentController from "../controllers/PaymentController.js";

router.get(
  "/",
  paymentController.getAllPayments
);

router.get(
  "/:id",
  paymentController.getPaymentById
);

router.post(
  "/",
  paymentController.createPayment
);

router.put(
  "/:id",
  paymentController.updatePayment
);

router.delete(
  "/:id",
  paymentController.deletePayment
);

export default router;