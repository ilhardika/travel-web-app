import React from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, User, Phone } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const SignUpPage = () => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { register, error, loading } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await register(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-300 p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-6 text-center">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-white">TravApp</h1>
          </div>
          <p className="text-white/80">Buat akun petualanganmu</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={values.name}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Alamat Email"
                value={values.email}
                onChange={handleChange}
                required
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Nomor Telepon"
                value={values.phoneNumber}
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
                placeholder="Kata Sandi"
                value={values.password}
                onChange={handleChange}
                required
                minLength={8}
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
              {loading ? "Sedang Mendaftar..." : "Daftar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
