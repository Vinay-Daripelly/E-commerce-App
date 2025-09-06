/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); 
  useEffect(() => {
    const fetchUserCart = async () => {
      if (user) {
        try {
          const data = await cartService.getCart();
          const formattedCart = data.map(item => ({ ...item, id: item.productId }));
          setCartItems(formattedCart);
          
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchUserCart();
  }, [user]); 

  const addToCart = async (product) => {
    try {
      const productData = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      };
      const updatedCart = await cartService.addToCart(productData);
      const formattedCart = updatedCart.map(item => ({ ...item, id: item.productId }));
      setCartItems(formattedCart);
        toast.success('Item added to cart!');
    } catch (error) {
        toast.error('Failed to add item to cart.');
      console.error("Failed to add to cart", error);
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
        const updatedCart = await cartService.removeFromCart(productId);
        const formattedCart = updatedCart.map(item => ({ ...item, id: item.productId }));
        setCartItems(formattedCart);
        toast.success('Item removed from cart!');
    } catch(error) {
        toast.error('Failed to remove item from cart.');
        console.error("Failed to remove from cart", error);
    }
  };
  const updateItemQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await cartService.updateQuantity(productId, quantity);
      const formattedCart = updatedCart.map(item => ({ ...item, id: item.productId }));
      setCartItems(formattedCart);
        toast.success('Updated item quantity!');
    } catch(error) {
      console.error("Failed to update quantity", error);
        toast.error('Failed to update item quantity.');
    }
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateItemQuantity(productId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateItemQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,increaseQuantity, decreaseQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};