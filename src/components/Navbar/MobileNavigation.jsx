import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export const MobileNavigation = ({ onMobileMenuToggle }) => (
  <>
    {/* Mobile Menu Button */}
    <div className="lg:hidden flex items-center space-x-4">
      <Link
        to="/cart"
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300"
      >
        {/* Anda bisa menambahkan ikon cart di sini jika diperlukan */}
      </Link>
      <button
        onClick={onMobileMenuToggle}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </>
);
