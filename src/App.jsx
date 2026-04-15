import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/User/Home'
import About from './pages/User/About'
import Navbar from './components/User/Navbar'
import Footer from './components/User/Footer'
import Register from './components/Common/Register'
import Login from './components/Common/Login'

const App = () => {
  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App