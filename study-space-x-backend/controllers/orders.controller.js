import db from "../models/index.js";
const Order = db.Order;

export const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  res.json(order);
};

export const updateOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  await order.update(req.body);

  res.json(order);
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) return res.status(404).json({ message: "Not found" });

  await order.destroy();

  res.json({ message: "Deleted" });
};