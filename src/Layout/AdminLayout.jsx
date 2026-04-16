import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("isAdminLoggedIn","false");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Pass handleLogout if you want to trigger it from there */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header (Optional - Dashboard title etc. ke liye) */}
        <header className="bg-white shadow-sm py-4 px-6 z-10">
          <h2 className="text-xl font-semibold text-gray-800">Admin Portal</h2>
        </header>

        {/* Dynamic Content - Jahan pages load honge */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;