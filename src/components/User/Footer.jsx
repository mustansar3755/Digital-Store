import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook,FaInstagram,FaTwitter  } from "react-icons/fa";
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">SHOPBASE</h2>
            <p className="text-sm leading-relaxed">
              Apki pasandeeda products ka markaz. Quality aur trust hamari pehli tarjeeh hai.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-500 transition"><FaFacebook  size={20} /></a>
              <a href="#" className="hover:text-indigo-500 transition"><FaInstagram  size={20} /></a>
              <a href="#" className="hover:text-indigo-500 transition"><FaTwitter  size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link to="/deals" className="hover:text-white transition">Special Offers</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white transition">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition">Returns & Exchange</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact Info</h3>
            <div className="flex items-center space-x-3 text-sm">
              <MapPin size={18} className="text-indigo-500" />
              <span>123 Street, Tech Hub, Pakistan</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone size={18} className="text-indigo-500" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail size={18} className="text-indigo-500" />
              <span>support@shopbase.com</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs">
              © {new Date().getFullYear()} SHOPBASE. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;