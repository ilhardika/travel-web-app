import React from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">TravelBook</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Destination
          </a>
        </div>

        {/* User Actions */}
        <div className="flex space-x-4 items-cemter">
          <button className="text-gray-600 hover:text-gray-800">
            <FaShoppingCart className="text-2xl" />
          </button>
          <button className=" text-gray-600 hover:text-gray-800">
            <FaUserCircle className="text-2xl mr-1 inline-block" /> Profile
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
          <button className="text-gray-600 hover:text-gray-800">
            <RiMenu3Fill className="text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
