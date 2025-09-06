import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaLock, FaAward } from 'react-icons/fa';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await productService.getProducts('', 4); 
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="space-y-16">
      <section className="text-center py-20 bg-gray-50 rounded-lg">
        <h1 className="text-5xl font-extrabold text-gray-900">Modern Shopping Experience</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover premium products with our clean, minimalist e-commerce platform. Built for the modern consumer who values quality and simplicity.
        </p>
        <Link 
          to="/products" 
          className="mt-8 inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="border p-8 rounded-lg">
          <FaAward className="mx-auto text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-bold">Premium Quality</h3>
          <p className="mt-2 text-gray-600">Carefully curated products that meet our high standards.</p>
        </div>
        <div className="border p-8 rounded-lg">
          <FaLock className="mx-auto text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-bold">Secure Shopping</h3>
          <p className="mt-2 text-gray-600">Your data is protected with enterprise-grade security.</p>
        </div>
        <div className="border p-8 rounded-lg">
          <FaShippingFast className="mx-auto text-4xl text-red-500 mb-4" />
          <h3 className="text-xl font-bold">Fast Delivery</h3>
          <p className="mt-2 text-gray-600">Free shipping on all orders with quick delivery.</p>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="text-center py-16 bg-gray-800 text-white rounded-lg">
        <h2 className="text-3xl font-bold">Ready to Start Shopping?</h2>
        <p className="mt-2 text-gray-300">Join thousands of happy customers and discover your next favorite product.</p>
        <Link 
          to="/products" 
          className="mt-6 inline-block bg-red-500 font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Browse Products
        </Link>
      </section>
    </div>
  );
};

export default HomePage;