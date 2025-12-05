import express from 'express'
import { verifyAdmin } from '../middleware/adminAuth.js'
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus
} from '../controllers/orderController.js'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

const router = express.Router()

router.use(verifyAdmin)

router.get('/orders', getAllOrders)
router.get('/orders/:id', getOrderById)
router.post('/orders', createOrder)
router.put('/orders/:id', updateOrder)
router.delete('/orders/:id', deleteOrder)
router.patch('/orders/:id/status', updateOrderStatus)

router.get('/products', getProducts)
router.get('/products/:id', getProductById)
router.post('/products', createProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router
