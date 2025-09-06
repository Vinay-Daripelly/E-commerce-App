// import { useState, useEffect } from 'react';
// import productService from '../services/productService';
// import ProductCard from '../components/ProductCard';

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Effect to fetch categories once on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await productService.getCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Effect to fetch products whenever selectedCategory changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const data = await productService.getProducts(selectedCategory);
//         setProducts(data);
//         setError(null);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [selectedCategory]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };
  
//   return (
//     <div className="flex flex-col md:flex-row gap-8">
//       {/* Filter Sidebar */}
//       <aside className="w-full md:w-1/4 lg:w-1/5">
//         <h2 className="text-xl font-bold mb-4">Categories</h2>
//         <ul className="space-y-2">
//           <li>
//             <button
//               onClick={() => handleCategoryClick('')}
//               className={`w-full text-left p-2 rounded-md ${selectedCategory === '' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
//             >
//               All
//             </button>
//           </li>
//           {categories.map((category) => (
//             <li key={category}>
//               <button
//                 onClick={() => handleCategoryClick(category)}
//                 className={`w-full text-left p-2 rounded-md capitalize ${selectedCategory === category ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
//               >
//                 {category}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </aside>

//       {/* Products Grid */}
//       <main className="w-full md:w-3/4 lg:w-4/5">
//         <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
//           {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All Products'}
//         </h1>
//         {loading ? (
//           <div className="text-center">Loading products...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">{error}</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ProductsPage;





// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts(selectedCategory);
        setFetchedProducts(data);
        
        const highestPrice = Math.ceil(Math.max(...data.map(p => p.price)));
        if (highestPrice > 0) {
          setMaxPossiblePrice(highestPrice);
          setMaxPrice(highestPrice);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const filtered = fetchedProducts.filter(product => product.price <= maxPrice);
    setDisplayedProducts(filtered);
  }, [maxPrice, fetchedProducts]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filter Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left p-2 rounded-md ${selectedCategory === '' ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-2 rounded-md capitalize ${selectedCategory === category ? 'bg-red-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Price Range</h2>
          <input
            type="range"
            min="0"
            max={maxPossiblePrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2">
            Up to <span className="font-bold">${maxPrice}</span>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
          {selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All Products'}
        </h1>
        {loading ? (
          <div className="text-center">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;