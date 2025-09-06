// const axios = require('axios');
// const Product = require('../models/Product.js');
// const getProducts = async (req, res) => {
//   try {
//     const { category, limit } = req.query; 

//     let apiUrl = 'https://fakestoreapi.com/products';

//     if (category) {
//       apiUrl = `https://fakestoreapi.com/products/category/${category}`;
//     }

//     const response = await axios.get(apiUrl, {
//       params: { limit: limit } 
//     });
    
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching products from external API' });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching product from external API' });
//   }
// };
// const getProductCategories = async (req, res) => {
//   try {
//     const response = await axios.get('https://fakestoreapi.com/products/categories');
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching product categories' });
//   }
// };

// module.exports = { getProducts, getProductById, getProductCategories };

// controllers/productController.js
const Product = require('../models/Product.js'); // <-- Import your new model

// @desc    Fetch all products, with filtering
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const filter = category ? { category } : {};

    const products = await Product.find(filter).limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch all product categories
// @route   GET /api/products/categories
const getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProducts, getProductById, getProductCategories };