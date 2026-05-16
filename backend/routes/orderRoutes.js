import { Router } from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrder, updateOrderStatus, deleteOrder } from '../controllers/orders.controller.js';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
