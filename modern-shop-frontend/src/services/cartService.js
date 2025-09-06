import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/api/users/cart`;

// Create a helper function to get the auth token
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

// Get user cart from backend
const getCart = async () => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add item to cart
const addToCart = async (productData) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

// Remove item from cart
const removeFromCart = async (productId) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.delete(`${API_URL}/${productId}`, config);
  return response.data;
};
const updateQuantity = async (productId, quantity) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.put(API_URL, { productId, quantity }, config);
  return response.data;
};

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
};

export default cartService;