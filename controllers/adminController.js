import db from '../models/index.js';
const { Booking, Order, Menu, Payment, User, Seat } = db;

export const getAllReservations = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        booking.status = status;
        await booking.save();
        res.json({ success: true, message: 'Status updated', data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        await booking.destroy();
        res.json({ success: true, message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        order.status = status;
        await order.save();
        res.json({ success: true, message: 'Order updated', data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        await order.destroy();
        res.json({ success: true, message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllMenuItems = async (req, res) => {
    try {
        const items = await Menu.findAll();
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createMenuItem = async (req, res) => {
    try {
        const { name, price, itemNumber, description } = req.body;
        const item = await Menu.create({ name, price, itemNumber, description });
        res.status(201).json({ success: true, message: 'Item created', data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateMenuItem = async (req, res) => {
    try {
        const { name, price, itemNumber, description } = req.body;
        const item = await Menu.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        await item.update({ name, price, itemNumber, description });
        res.json({ success: true, message: 'Item updated', data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteMenuItem = async (req, res) => {
    try {
        const item = await Menu.findByPk(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        await item.destroy();
        res.json({ success: true, message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStatistics = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalBookings = await Booking.count();
        const totalOrders = await Order.count({
            where: { status: 'pending' }
        });
        const totalMenuItems = await Menu.count();
        const totalRevenue = await db.sequelize.query(
            "SELECT SUM(total_cost) as total FROM orders WHERE status = 'completed'",
            { type: db.sequelize.QueryTypes.SELECT }
        );

        const revenue = parseFloat(totalRevenue[0]?.total) || 0;
        res.json({
            success: true,
            data: { totalUsers, totalBookings, totalOrders, totalMenuItems, totalRevenue: revenue }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
