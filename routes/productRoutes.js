const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/allProducts', productController.getAllProducts)
router.post('/addProduct', productController.createProduct)

module.exports = router
