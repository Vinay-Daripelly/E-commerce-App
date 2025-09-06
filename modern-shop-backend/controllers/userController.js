const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password, 
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserCart = async (req, res) => {
  res.status(200).json(req.user.cart);
};

const addToCart = async (req, res) => {
  const { productId, title, price, image, quantity } = req.body;
  const user = req.user;
  
  try {
    const itemIndex = user.cart.findIndex(p => p.productId === productId);

    if (itemIndex > -1) {
      // Product exists in the cart, update quantity
      user.cart[itemIndex].quantity += quantity;
    } else {
      // Product does not exist in cart, add new item
      user.cart.push({ productId, title, price, image, quantity });
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const user = req.user;

  try {
    user.cart = user.cart.filter(item => item.productId !== productId);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user;

  try {
    const itemIndex = user.cart.findIndex(p => p.productId === productId);
    if (itemIndex > -1) {
      if (quantity > 0) {
        user.cart[itemIndex].quantity = quantity;
      } else {
        user.cart = user.cart.filter(p => p.productId !== productId);
      }
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser.cart);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, getUserCart, addToCart, removeFromCart, updateCartQuantity };