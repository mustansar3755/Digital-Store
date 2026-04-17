import React, { useEffect, useState } from "react";
import { useAuth } from "../../App/AppContext";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { handleCart } = useAuth();

  const addToCart = (product) => {
    // LocalStorage se purana cart data uthayein (agar nahi hai toh empty array)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const isItemExist = existingCart.find(
      (item) => item.id === product.id,
    );

    if (isItemExist) {
      return toast.info("Item already in cart!");
    }
    // Naya product array mein add karein
    const updatedCart = [...existingCart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    handleCart(updatedCart.length);
    toast.success(`${product.title} added to cart!`);
  };

  useEffect(() => {
    // 1. Data get karein aur parse karein
    const savedProducts = localStorage.getItem("allProducts");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Our Products
      </h1>

      {/* 2. Products ki grid banayein */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Image Section */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              {/* Content Section */}
              <div className="p-4">
                <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  {item.category}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mt-1 truncate">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                    className="bg-indigo-600 cursor-pointer text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found. Please add some from Admin panel.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
