import { Router } from 'express'
import { createProduct, getAllProducts, updateProduct, getProductById } from '../controllers/productController'

const router = Router()

// Product routes
router.post('/', createProduct)  // Create a product
router.put('/:id', updateProduct)  // Update a product
router.get('/', getAllProducts)  // Get all products
router.get('/:id', getProductById) //Get Product By Id

export default router
