import { Link } from "react-router-dom";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { AuthButtons } from "./AuthButtons";

// Komponen DesktopNavigation menerima beberapa props untuk mengelola status autentikasi dan dropdown
const DesktopNavigation = ({
  isLoggedIn,
  isDropdownOpen,
  onDropdownToggle,
  onLogout,
  categories,
  categoriesLoading,
  destinationsDropdownOpen,
  setDestinationsDropdownOpen,
  cartCount,
}) => (
  <div className="hidden lg:flex items-center space-x-8">
    <div className="flex space-x-8">
      <Link
        to="/promo"
        className="flex items-center space-x-1 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
      >
        Promo
      </Link>

      {/* Destinations Dropdown */}
      <div
        className="relative"
        onMouseEnter={() => setDestinationsDropdownOpen(true)}
        onMouseLeave={() => setDestinationsDropdownOpen(false)}
      >
        <Link
          to="/activity"
          className="flex items-center space-x-1 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
        >
          Destinations
          <ChevronDown className="w-4 h-4 ml-1" />
        </Link>

        {destinationsDropdownOpen && (
          <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
            <div className="py-2">
              {categoriesLoading ? (
                <div className="px-4 py-2 text-gray-500">Loading...</div>
              ) : (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/activity/${category.name.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  >
                    {category.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Ikon Keranjang dan Tombol Autentikasi */}
    <div className="flex items-center space-x-4">
      {/* Link ke halaman keranjang */}
      <Link
        to="/cart"
        className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300 relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </Link>

      {/* Komponen AuthButtons untuk mengelola tombol autentikasi */}
      <AuthButtons
        isLoggedIn={isLoggedIn}
        isDropdownOpen={isDropdownOpen}
        onDropdownToggle={onDropdownToggle}
        onLogout={onLogout}
      />
    </div>
  </div>
);

export default DesktopNavigation;
