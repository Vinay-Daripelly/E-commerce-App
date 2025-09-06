// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate the subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full md:w-2/3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mr-4" />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center mx-4">
                <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 border rounded-md">-</button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 border rounded-md">+</button>
              </div>
              <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;