import express from 'express';
import {
    getAllReservations, updateReservationStatus, deleteReservation,
    getAllOrders, updateOrder, deleteOrder,
    getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem,
    getStatistics
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/reservations', getAllReservations);
router.patch('/reservations/:id', updateReservationStatus);
router.delete('/reservations/:id', deleteReservation);

router.get('/orders', getAllOrders);
router.patch('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

router.get('/menu', getAllMenuItems);
router.post('/menu', createMenuItem);
router.put('/menu/:id', updateMenuItem);
router.delete('/menu/:id', deleteMenuItem);

router.get('/statistics', getStatistics);

export default router;
