import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../../App/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {cart} = useAuth();

  console.log(cart)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              SHOPBASE
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Desktop Links & Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-600 hover:text-indigo-600 font-medium transition">Shop</Link>
            <Link to="/categories" className="text-gray-600 hover:text-indigo-600 font-medium transition">Categories</Link>
            
            <div className="flex items-center space-x-5 border-l pl-6 border-gray-200">
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600">
                <User size={24} />
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-indigo-600 relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                 {cart}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          <div className="px-2 pt-2 space-y-1">
            <Link to="/shop" className="block px-3 py-2 text-gray-600 font-medium">Shop</Link>
            <Link to="/categories" className="block px-3 py-2 text-gray-600 font-medium">Categories</Link>
            <Link to="/profile" className="block px-3 py-2 text-gray-600 font-medium">My Account</Link>
            <Link to="/cart" className="block px-3 py-2 text-indigo-600 font-bold">Cart (3)</Link>
          </div>
          <div className="px-4 mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-lg py-2 px-4"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;