import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/User/Navbar'
import Footer from '../components/User/Footer'

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar: Ye hamesha top par rahega */}
      <Navbar />

      {/* 2. Main Content: Outlet wo jagah hai jahan saare public pages (Home, About, etc.) render honge */}
      <main className="grow">
        <Outlet />
      </main>

      {/* 3. Footer: Ye hamesha bottom par rahega */}
      <Footer />
    </div>
  )
}

export default PublicLayout