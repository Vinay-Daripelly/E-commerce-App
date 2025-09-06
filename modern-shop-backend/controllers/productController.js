const axios = require('axios');

// const getProducts = async (req, res) => {
//   try {
//     const { category} = req.query; 

//     let response;
//     if (category) {
      
//       response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
//     } else {
      
//       response = await axios.get('https://fakestoreapi.com/products');
//     }

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching products from external API' });
//   }
// };

// controllers/productController.js
const getProducts = async (req, res) => {
  try {
    const { category, limit } = req.query; 

    let apiUrl = 'https://fakestoreapi.com/products';

    if (category) {
      apiUrl = `https://fakestoreapi.com/products/category/${category}`;
    }

    const response = await axios.get(apiUrl, {
      params: { limit: limit } 
    });
    
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products from external API' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product from external API' });
  }
};
const getProductCategories = async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product categories' });
  }
};

module.exports = { getProducts, getProductById, getProductCategories };