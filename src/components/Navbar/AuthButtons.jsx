import { Link } from "react-router-dom";
import { CircleUser, LogOut, User } from "lucide-react";

// Komponen AuthButtons menerima beberapa props untuk mengelola status autentikasi dan dropdown
export const AuthButtons = ({
  isLoggedIn,
  isDropdownOpen,
  onDropdownToggle,
  onLogout,
}) => {
  // Jika pengguna sudah login
  if (isLoggedIn) {
    return (
      <div className="relative">
        {/* Tombol Profil */}
        <button
          onClick={onDropdownToggle}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300"
        >
          <CircleUser className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
            {/* Link ke halaman profil */}
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-t-xl"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
            {/* Tombol Logout */}
            <button
              onClick={onLogout}
              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-xl text-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  // Jika pengguna belum login
  return (
    <>
      {/* Tombol Sign In */}
      <Link
        to="/signin"
        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-colors duration-300"
      >
        Sign In
      </Link>
      {/* Tombol Sign Up */}
      <Link
        to="/signup"
        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-300"
      >
        Sign Up
      </Link>
    </>
  );
};
