import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App/AppContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { setCart } = useAuth(); // Navbar ka count update karne ke liye

  // 1. LocalStorage se cart ka data nikalna
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(data);
  }, []);

  // 2. Item remove karne ka function
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart.length); // Update Context API
    toast.error("Item removed from cart");
  };

  // 3. Total Price calculate karna
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Items List */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white p-10 rounded-xl text-center shadow-sm">
              <p className="text-gray-500 text-lg">Your cart is empty!</p>
              <Link to="/" className="text-indigo-600 font-medium hover:underline mt-4 inline-block">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-indigo-600">${totalPrice}</span>
            </div>
            <button 
              disabled={cartItems.length === 0}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;