import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">TravelApp</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Promo
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Destination
          </a>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <FaShoppingCart className="text-2xl" />
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            <RiMenuUnfold2Line className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-1/2 h-screen bg-white shadow-md transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            <RiMenuFold2Line className="text-2xl font-bold" />
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-6 py-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Promo
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Destination
          </a>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <FaShoppingCart className="text-2xl" />
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign Up
            </button>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
