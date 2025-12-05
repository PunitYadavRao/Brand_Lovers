import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/', addToCart);
router.patch('/:itemId', updateCartItem);
router.delete('/:itemId', removeFromCart);
router.delete('/', clearCart);

export default router;
