import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

// Komponen MobileNavigation menerima beberapa props untuk mengelola status menu mobile dan autentikasi
const MobileNavigation = ({
  isMobileMenuOpen,
  isLoggedIn,
  categories,
  categoriesLoading,
  onMobileMenuToggle,
  onLogout,
  destinationsDropdownOpen,
  setDestinationsDropdownOpen,
}) => (
  <>
    {/* Tombol Menu Mobile */}
    <div className="lg:hidden flex items-center space-x-4">
      {/* Link ke halaman keranjang */}
      <Link
        to="/cart"
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300"
      >
      </Link>
      {/* Tombol untuk membuka menu mobile */}
      <button
        onClick={onMobileMenuToggle}
        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
      >
        <Menu className="w-6 h-6" />
      </button>
    </div>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onMobileMenuToggle}
      >
        <div
          className="absolute right-0 top-0 w-3/4 h-full bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={onMobileMenuToggle}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="py-4">
            <div className="space-y-1">
              <Link
                to="/promo"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
              >
                Promo
              </Link>

              {/* Destinations Dropdown for Mobile */}
              <div>
                <Link
                  to={"/activity"}
                  className="flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={() =>
                    setDestinationsDropdownOpen(!destinationsDropdownOpen)
                  }
                >
                  Destinations
                </Link>

                {destinationsDropdownOpen && (
                  <div className="bg-gray-50">
                    {categoriesLoading ? (
                      <div className="px-4 py-2 text-gray-500">Loading...</div>
                    ) : (
                      categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/activity/${category.name.toLowerCase()}`}
                          className="block px-8 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {category.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/cart"
                className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <ShoppingCart className="size-5 inline-block mr-3" />
                  Cart
                </div>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="p-4 mt-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="block w-full px-5 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block w-full px-5 py-2.5 text-center text-sm font-medium bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full px-5 py-2.5 text-center text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

export default MobileNavigation;
