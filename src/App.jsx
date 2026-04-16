import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/User/Home'
import About from './pages/User/About'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import AdminLogin from './components/Admin/AdminLogin'
import PublicLayout from './Layout/PublicLayout'
import AdminLayout from './Layout/AdminLayout'
import ProtectRoute from './components/ProtectRoute'
import Dashboard from './pages/Admin/Dashboard' // Example component
import Users from './pages/Admin/Users'
import Products from './pages/Admin/Products'

const App = () => {
  return (
    <Routes>
      {/* 1. Public Routes (Navbar & Footer) */}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>

      {/* 2. Admin Authentication Route */}
      <Route path='/admin/login' element={<AdminLogin />} />

      {/* 3. Protected Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route element={<ProtectRoute />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/products' element={<Products />} />
          {/* Default admin redirect: Agar sirf /admin likha ho */}
          <Route path='/admin' element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      </Route>

      {/* 4. Global 404 / Redirect Logic */}
      {/* Agar koi route match nahi hota toh home par bhej do */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App