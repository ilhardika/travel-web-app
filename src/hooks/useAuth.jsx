import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/");
        return true;
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setError("");
    setLoading(true);

    // Validasi input dasar
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.phoneNumber
    ) {
      setError("Semua field harus diisi");
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({
            ...userData,
            passwordConfirmation: userData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Registrasi berhasil
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));

        // Redirect ke halaman utama atau dashboard
        navigate("/");
        return true;
      } else {
        // Tangani error dari API
        setError(data.message || "Registrasi gagal. Silakan coba lagi.");
        return false;
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Tambahkan method updateProfile di hooks/useAuth.js
  const updateProfile = async (userData) => {
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update data user di localStorage
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Optional: Redirect atau tampilkan pesan sukses
        navigate("/profile");
        return true;
      } else {
        // Tangani error dari API
        setError(data.message || "Gagal memperbarui profil");
        return false;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update return value
  return {
    login,
    register,
    updateProfile, // Tambahkan method baru
    error,
    loading,
  };
};
