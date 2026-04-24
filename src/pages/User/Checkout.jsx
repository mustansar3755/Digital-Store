import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App/AppContext";

const Checkout = () => {
  const navigate = useNavigate();

  const {clearCart} =  useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    bankName: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    // basic validation
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.bankName ||
      !form.accountNumber
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Order object
    const order = {
      user: form,
      products: cart,
      date: new Date().toLocaleString(),
      status: "pending",
    };

    // Save order (demo purpose)
    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...oldOrders, order]));

    // Clear cart
    localStorage.removeItem("cart");

    toast.success("Order placed successfully!");

    // redirect to home
    setTimeout(() => {
      navigate("/");
      clearCart()
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Checkout Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* BANK NAME */}
          <input
            type="text"
            name="bankName"
            placeholder="Bank Name"
            value={form.bankName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* ACCOUNT NUMBER */}
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={form.accountNumber}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700"
          >
            Place Order
          </button>

        </form>
      </div>
    </div>
  );
};

export default Checkout;