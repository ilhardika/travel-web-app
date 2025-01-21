import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  FileText,
  UserCircle,
  MapPinned,
  Percent,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

const MenuItem = ({ to, icon: Icon, children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full text-left text-md text-gray-800 hover:text-blue-600 transition-colors flex items-center ${className}`}
  >
    {Icon && <Icon className="mr-2" size={20} />}
    {children}
  </button>
);

const ProfileDropdown = ({ onLogout }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
    <Link
      to="/profile"
      className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
    >
      <User className="mr-2" size={18} />
      Profile
    </Link>
    <Link
      to="/transactions"
      className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
    >
      <FileText className="mr-2" size={18} />
      Transactions
    </Link>
    <button
      onClick={onLogout}
      className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
    >
      <LogOut className="mr-2" size={18} />
      Logout
    </button>
  </div>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-40 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            TravApp
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/promo"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Promo
            </Link>
            <Link
              to="/activities"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Activities
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart />
            </Link>

            {/* Authentication/Profile Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="focus:outline-none"
                >
                  <User
                    Circle
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    size={28}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <ProfileDropdown onLogout={handleLogout} />
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button className="border-2 border-blue-600 text-black bg-white hover:bg-blue-600 hover:text-white px-4 rounded-lg">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 rounded-lg shadow-md hover:shadow-lg">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className="absolute top-0 right-0 w-3/4 h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-gray-700 focus:outline-none"
            >
              <X size={24} />
            </button>

            {/* Konten Menu */}
            <div className="flex flex-col h-full justify-start items-start space-y-4 px-6 mt-12">
              <MenuItem
                onClick={() => handleMenuItemClick("/promo")}
                icon={Percent}
              >
                Promo
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick("/activities")}
                icon={MapPinned}
              >
                Activities
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick("/cart")}
                icon={ShoppingCart}
              >
                Cart
              </MenuItem>

              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <>
                  <MenuItem
                    onClick={() => handleMenuItemClick("/profile")}
                    icon={User}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleMenuItemClick("/transactions")}
                    icon={FileText}
                  >
                    Transactions
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    icon={LogOut}
                    className="text-red-600"
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <div className="space-y-4 w-full">
                  <Button
                    onClick={() => handleMenuItemClick("/login")}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleMenuItemClick("/register")}
                    className="w-full"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
