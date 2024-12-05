import { Router } from 'express'
import { createOrder, getRecentOrders, getUserOrders } from '../controllers/orderController'

const router = Router()

// Order routes
router.post('/', createOrder)  // Create an order
router.get('/recent', getRecentOrders)  // Get orders from the last 7 days
router.get('/user/:userId', getUserOrders)  // Get orders of a specific user

export default router
