import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" reverseOrder={false} /> 
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> 
      </main>
      <footer className="bg-gray-200 text-center p-4">
        © 2025 ModernShop
      </footer>
    </div>
  );
};

export default Layout;