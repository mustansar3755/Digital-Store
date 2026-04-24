import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App/AppContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const { setCart } = useAuth();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(data);
  }, []);

  // REMOVE ITEM
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart.length);
    toast.error("Item removed from cart");
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  // APPLY COUPON
  const applyCoupon = () => {
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

    const isValid = allProducts.find(
      product => product.cupon_code === coupon
    );

    if (isValid) {
      setDiscount(totalPrice * 0.15);
      toast.success("Coupon applied! 15% discount added");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const finalPrice = totalPrice - discount;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDE */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border">

                <img src={item.imageUrl} className="w-24 h-24 object-cover rounded-lg" />

                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="text-indigo-600 font-bold">${item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white p-10 text-center rounded-xl">
              <p>Your cart is empty!</p>
              <Link to="/" className="text-indigo-600">Continue Shopping</Link>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">

            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {/* COUPON INPUT */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border px-3 py-2 w-full rounded"
              />
              <button
                onClick={applyCoupon}
                className="bg-indigo-600 text-white px-4 rounded"
              >
                Apply
              </button>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg mt-3">
              <span>Total</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>

            <button
              disabled={cartItems.length === 0}
              className="w-full bg-indigo-600 text-white py-3 mt-4 rounded-lg disabled:bg-gray-400"
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