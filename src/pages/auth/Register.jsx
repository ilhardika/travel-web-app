import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  // State untuk form registrasi
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Default profile picture dan phone number
  const DEFAULT_PROFILE_PICTURE =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80";
  const DEFAULT_PHONE_NUMBER = "08976041232";

  // Hook navigasi dan autentikasi
  const navigate = useNavigate();
  const { register } = useAuth();

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validasi form
    if (!name || !email || !password || !passwordRepeat) {
      setError("Semua field wajib diisi");
      setIsLoading(false);
      return;
    }

    if (password !== passwordRepeat) {
      setError("Password tidak cocok");
      setIsLoading(false);
      return;
    }

    try {
      // Data registrasi
      const userData = {
        name,
        email,
        password,
        passwordRepeat,
        role,
        profilePictureUrl: DEFAULT_PROFILE_PICTURE,
        phoneNumber: DEFAULT_PHONE_NUMBER,
      };

      // Panggil fungsi register dari context
      await register(userData);

      // Redirect ke halaman login setelah registrasi berhasil
      navigate("/login");
    } catch (err) {
      // Set pesan error dari response API
      setError(err.response?.data?.message || "Registrasi gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Buat Akun Baru
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Input Nama */}
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nama Lengkap"
            />

            {/* Input Email */}
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            />

            {/* Input Password */}
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />

            {/* Input Konfirmasi Password */}
            <input
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              required
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Konfirmasi Password"
            />
          </div>

          {/* Dropdown Role */}
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Pesan Error */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Tombol Register */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {isLoading ? "Mendaftar..." : "Daftar"}
            </button>
          </div>

          {/* Link Login */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login di sini
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
