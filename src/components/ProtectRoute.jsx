import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
  // Aap yahan apna real auth logic (Redux state ya LocalStorage) check karein
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default ProtectRoute