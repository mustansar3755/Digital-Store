import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    title: '',
    price: '',
    category: '',
    imageUrl: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    const newProduct = {
      ...product,
      id: Date.now(),
      price: Number(product.price),
      date: new Date().toLocaleDateString() // Record track rakhne ke liye
    };

    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts));

    toast.success("Product Added Successfully!");
    
    // Form clear karein
    setProduct({ title: '', price: '', category: '', imageUrl: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">Add New E-Commerce Product</h2>
          <p className="text-indigo-100 text-center text-sm mt-1">Fill in the details to list a new item</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">Category</label>
              <select 
                name="category" 
                value={product.category} 
                onChange={handleChange}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Home Decor">Home Decor</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              placeholder="https://images.com/product.jpg"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              placeholder="Write something about the product..."
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md"
            >
              Add Product to Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;