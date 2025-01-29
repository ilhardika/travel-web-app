import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Save } from "lucide-react";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const { updateProfile, error, loading } = useAuth();

  // Ambil data user dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      // Set initial form values
      setValues({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
      });
    } else {
      // Redirect ke halaman login jika tidak ada data user
      navigate("/signin");
    }
  }, [navigate, setValues]);

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!values.name || !values.email || !values.phoneNumber) {
      alert("Semua field harus diisi");
      return;
    }

    await updateProfile(values);
  };

  // Render loading
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Perbarui Profil</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Pesan Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Input Nama */}
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

          {/* Input Email */}
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

          {/* Input Nomor Telepon */}
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

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
                <span>Memperbarui...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
          {/* Tombol Kembali */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
            >
              Kembali ke Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
