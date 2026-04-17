import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  ShoppingBag,
  LogOut,
} from "lucide-react";

const AdminSidebar = ({ onLogout }) => {
  const location = useLocation();

  // Navigation Links ka array taaki code clean rahe
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    {
      name: "Add Products",
      path: "/admin/add-products",
      icon: <ShoppingBag size={20} />,
    },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white p-4">
      <div className="text-2xl font-bold mb-8 px-2 text-blue-400">
        Admin Panel
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 pt-4">
        <button
          onClick={() => {
            onLogout();
          }}
          className="flex items-center space-x-3 p-3 w-full text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
