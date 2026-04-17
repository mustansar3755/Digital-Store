import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    if (isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);


  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Admin dedicated data nikalna (Normal 'user' se alag)
    const savedAdmin = JSON.parse(localStorage.getItem("adminLogin"));

    // 2. Verification Logic
    if (!savedAdmin) {
      // Agar koi admin registered nahi hai, toh ek default check ya error
      return toast.error("Admin account not found!");
    }
    
    console.log(savedAdmin)
    if (savedAdmin.email === email && savedAdmin.password === password) {
      // Success logic
      toast.success(`Admin Login Successful!`);
      
      // Admin specific login flag
      localStorage.setItem("isAdminLoggedIn", "true");

      setTimeout(() => {
        // Normal user "/" par jata hai, admin "/admin/dashboard" par
        navigate("/admin/dashboard"); 
      }, 1500);
    } else {
      toast.error("Invalid Admin Credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center">
      {/* Form UI remains the same, just updating the logic and some colors for Admin feel */}
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Admin Panel
          </div>
          <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Sign in as Admin
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Admin Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="admin@pro.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                >
                  Enter Admin Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;