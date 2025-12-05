import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    getUserOrders,
    createUserOrder,
    getUserOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getUserOrders);
router.post('/', createUserOrder);
router.get('/:id', getUserOrderById);

export default router;
