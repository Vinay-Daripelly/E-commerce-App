import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';   
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); 
    const { user } = useAuth();        
    const navigate = useNavigate(); 
    const handleAddToCart = () => {
    if (user) {
    console.log('Checking user in ProductCard:', user); 

      addToCart(product);
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center shadow-lg transition-transform transform hover:scale-105">
      <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-4" />
      <h3 className="text-md font-semibold mb-2 h-12 overflow-hidden">{product.title}</h3>
      <p className="text-lg font-bold text-gray-800 mb-4">${product.price}</p>
      <button className="mt-auto w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;