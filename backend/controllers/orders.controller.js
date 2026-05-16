import db from "../models/index.js";
import jwt from "jsonwebtoken";

const { Order, Booking, User, Seat, Menu } = db;

const statusMap = {
  PENDING: "pending",
  PREPARING: "preparing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  pending: "pending",
  preparing: "preparing",
  completed: "completed",
  cancelled: "cancelled",
};

const getUserIdFromToken = (req) => {
  const token = req.headers.token || req.headers.authorization?.split(" ")[1];

  if (!token) return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

const buildOrderPayload = (body, userId = null) => {
  const items = Array.isArray(body.items) ? body.items : null;
  const computedTotal = items
    ? items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0)
    : Number(body.total_cost ?? body.total ?? body.prices ?? 0);

  const orderName =
    body.order_name ||
    (items
      ? items.map((item) => `${item.quantity}x ${item.name}`).join(", ")
      : "Coffee order");

  return {
    order_name: orderName,
    prices: Number(body.prices ?? computedTotal),
    total_cost: Number(body.total_cost ?? computedTotal),
    order_date: body.order_date || new Date(),
    menu_id: body.menu_id || null,
    booking_id: body.booking_id || null,
    items,
    total: Number(body.total ?? computedTotal),
    userId: body.userId || userId,
    status: statusMap[body.status] || "pending",
  };
};

export const createOrder = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const data = buildOrderPayload(req.body, userId);

    if (!data.order_name || !data.total_cost) {
      return res.status(400).json({ message: "Order items or total are required" });
    }

    const order = await Order.create(data);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    let userId = null;

    try {
      userId = getUserIdFromToken(req);
    } catch {
      userId = null;
    }

    const orders = await Order.findAll({
      where: userId ? { userId } : undefined,
      include: [
        {
          model: Booking,
          required: false,
          include: [
            { model: User, attributes: ["name", "email"], required: false },
            { model: Seat, attributes: ["name_of_room", "id"], required: false },
          ],
        },
        { model: Menu, attributes: ["name", "category", "imageUrl", "image"], required: false },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error getting orders", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error getting order", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.update(buildOrderPayload({ ...order.toJSON(), ...req.body }, order.userId));
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const status = statusMap[req.body.status];

    if (!status) {
      return res.status(400).json({
        message: "Invalid status",
        validStatuses: ["pending", "preparing", "completed", "cancelled"],
      });
    }

    await order.update({ status });

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error updating order status",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.destroy();
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};
