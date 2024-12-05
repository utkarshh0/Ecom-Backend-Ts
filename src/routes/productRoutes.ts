import { Router } from 'express'
import { createProduct, getAllProducts, updateProduct, getProductById, getUsersByProduct, getTotalStock } from '../controllers/productController'

const router = Router()

// Product routes
router.post('/', createProduct)  // Create a product
router.put('/:id', updateProduct)  // Update a product
router.get('/', getAllProducts)  // Get all products
router.get('/:id', getProductById) //Get Product By Id
router.get('/:id/users', getUsersByProduct); // Get users who bought a specific product
router.get('/total', getTotalStock); // Get total stock quantity for all products combined


export default router
