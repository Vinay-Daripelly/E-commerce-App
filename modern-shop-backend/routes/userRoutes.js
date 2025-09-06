const express = require('express');
const { registerUser, loginUser, getUserCart, addToCart, removeFromCart,updateCartQuantity } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js'); 
const router = express.Router();


router.post('/register', registerUser);


router.post('/login', loginUser);


router.route('/cart')
  .get(protect, getUserCart)   
  .post(protect, addToCart)
  .put(protect, updateCartQuantity);

router.route('/cart/:productId')
  .delete(protect, removeFromCart); 

module.exports = router;