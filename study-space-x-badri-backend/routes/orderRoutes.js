const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders.controller');

// Create
router.post('/', ordersController.createOrder);

// Get all
router.get('/', ordersController.getAllOrders);

// Get by id
router.get('/:id', ordersController.getOrderById);

// Update
router.put('/:id', ordersController.updateOrder);

// Delete
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;