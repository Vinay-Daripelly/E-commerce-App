import { Link,NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext'; 
import { FaShoppingCart, FaHome, FaShoppingBag, FaUserCircle} from 'react-icons/fa'; 


const Navbar = () => {
  const { user, logout } = useAuth(); 
  const { cartItems } = useCart();
  const activeLinkClass = 'text-red-500 font-bold';
  const inactiveLinkClass = 'text-gray-600 hover:text-gray-800';
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          ModernShop
        </Link>

        {/* Primary Nav */}
        <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={({ isActive })=> (isActive ? activeLinkClass : inactiveLinkClass)}>
                <FaHome className="mr-2" />
                <span>Home</span>
          </NavLink>
          <NavLink to="/products" className={({ isActive })=> (isActive ? activeLinkClass : inactiveLinkClass)}>
                <FaShoppingBag className="mr-2" /> 
                <span>Products</span>
          </NavLink>
        </div>

        {/* Secondary Nav */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative text-gray-600 hover:text-gray-800 p-2">
             <FaShoppingCart className="h-6 w-6" /> 
            {totalItemsInCart > 0 && (
               <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {totalItemsInCart}
                </span>
            )}
          </Link>
          {user ? (
            // If user is logged in
            <>
              <span className="text-gray-800">  <FaUserCircle className="mr-2" /> Hello, {user.name}</span>
              <button onClick={logout}className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                Logout
              </button>
            </>
          ) : (
            // If user is not logged in
            <Link to="/login" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;