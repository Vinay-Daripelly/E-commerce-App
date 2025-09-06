// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const connectDB = require('./config/db.js');
const Product = require('./models/Product.js');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clear existing products

    const { data: products } = await axios.get('https://fakestoreapi.com/products');

    await Product.insertMany(products);

    console.log('Data Imported Successfully! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();