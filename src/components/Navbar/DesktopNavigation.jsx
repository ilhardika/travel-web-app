import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { NAV_LINKS } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";

export const DesktopNavigation = ({
  isLoggedIn,
  isDropdownOpen,
  onDropdownToggle,
  onLogout,
}) => (
  <div className="hidden lg:flex items-center space-x-8">
    <div className="flex space-x-8">
      {NAV_LINKS.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex items-center space-x-1 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          {item.name}
        </Link>
      ))}
    </div>

    <div className="flex items-center space-x-4">
      <Link
        to="/cart"
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>

      <AuthButtons
        isLoggedIn={isLoggedIn}
        isDropdownOpen={isDropdownOpen}
        onDropdownToggle={onDropdownToggle}
        onLogout={onLogout}
      />
    </div>
  </div>
);
