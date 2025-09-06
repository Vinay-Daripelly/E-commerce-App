import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="cart" element={<ProtectedRoute>  
                    <CartPage />
                  </ProtectedRoute>} />
        </Route>
      </Routes>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;