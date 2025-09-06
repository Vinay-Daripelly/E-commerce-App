
const express = require('express');
const { getProducts, getProductById ,getProductCategories} = require('../controllers/productController.js');
const router = express.Router();

router.get('/', getProducts);
router.get('/categories', getProductCategories);
router.get('/:id', getProductById);

module.exports = router;