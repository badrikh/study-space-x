import Payment from "../models/payment.js";

export const createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.status(201).json(payment);
};

export const getAllPayments = async (req, res) => {
  const payments = await Payment.findAll();
  res.json(payments);
};

export const getPaymentById = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);

  if (!payment) return res.status(404).json({ message: "Not found" });

  res.json(payment);
};

export const updatePayment = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);

  if (!payment) return res.status(404).json({ message: "Not found" });

  await payment.update(req.body);

  res.json(payment);
};

export const deletePayment = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);

  if (!payment) return res.status(404).json({ message: "Not found" });

  await payment.destroy();

  res.json({ message: "Deleted" });
};