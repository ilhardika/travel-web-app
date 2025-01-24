import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Edit, LogOut, ShieldEllipsis } from "lucide-react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect ke halaman login jika tidak ada token
        navigate("/signin");
        return;
      }

      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data profil");
        }

        const data = await response.json();
        setUserData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Redirect ke halaman login
    navigate("/signin");
  };

  const handleEditProfile = () => {
    // Navigasi ke halaman edit profil (bisa Anda buat nanti)
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error}</p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-300 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Profil */}
          <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-6 text-center">
            <div className="mx-auto w-32 h-32 rounded-full border-4 border-white mb-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-white/80">{userData.email}</p>
          </div>

          {/* Detail Profil */}
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <User className="text-blue-500" />
              <div>
                <p className="text-gray-600">Nama</p>
                <p className="font-semibold">{userData.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="text-blue-500" />
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="text-blue-500" />
              <div>
                <p className="text-gray-600">Nomor Telepon</p>
                <p className="font-semibold">{userData.phoneNumber}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ShieldEllipsis className="text-blue-500" />
              <div>
                <p className="text-gray-600">Role</p>
                <p className="font-semibold">{userData.role}</p>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="p-6 flex space-x-4">
            <button
              onClick={handleEditProfile}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              <Edit className="w-5 h-5" />
              <span>Edit Profil</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
