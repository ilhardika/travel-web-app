import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useBanners } from "../../hooks/useBanners";

const SigninPage = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { login, error, loading } = useAuth();
  const { banners } = useBanners();
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(values.email, values.password);
    if (success) {
      setSuccessMessage("Login successful! Redirecting...");
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        const prevPath =
          new URLSearchParams(location.search).get("prev") || "/";
        setSuccessMessage("");
        navigate(prevPath);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, location, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6 relative"
      style={{ backgroundImage: `url(${banners[0]?.imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-white">TravelApp</h1>
          </div>
          <p className="text-white/80">Explore the world with us</p>
        </div>

        <div className="p-8">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4 text-center">
              {successMessage}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={values.email}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to={`/signup?prev=${location.pathname}${location.search}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
