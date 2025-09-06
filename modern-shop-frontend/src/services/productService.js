import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/products`;


const getProducts = async (category = '', limit = 0) => { 
  let url = API_URL;
  const params = {};
  if (category) {
    params.category = category;
  }
  if (limit) {
    params.limit = limit;
  }
  const response = await axios.get(url, { params }); 
  return response.data;
};

const getCategories = async () => { 
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

const productService = {
  getProducts,
  getCategories, 
};

export default productService;