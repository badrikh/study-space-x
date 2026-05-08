const Payment = require("../models/payment");


async function createPayment(req, res) {
  try {
    const payment = await Payment.create({
      userId: req.body.userId,
      amount: req.body.amount,
      method: req.body.method,
      status: req.body.status,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create payment",
      error: error.message,
    });
  }
}

async function getAllPayments(req, res) {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
}

async function getPaymentById(req, res) {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payment",
      error: error.message,
    });
  }
}

async function updatePayment(req, res) {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    await payment.update(req.body);

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update payment",
      error: error.message,
    });
  }
}

async function deletePayment(req, res) {
  try {
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    await payment.destroy();

    res.status(200).json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete payment",
      error: error.message,
    });
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
