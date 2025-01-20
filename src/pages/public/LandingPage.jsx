import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LandingPage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">Travel App</h1>
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    Hai, {user?.name || "Pengguna"}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Selamat Datang di Travel App
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Temukan perjalanan impian Anda bersama kami
          </p>

          {!isAuthenticated && (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
