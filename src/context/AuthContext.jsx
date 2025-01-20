import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

// Membuat context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  // State untuk menyimpan informasi user
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi login
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/v1/login", {
        email,
        password,
      });

      // Simpan token di localStorage
      localStorage.setItem("token", response.data.token);

      // Set user dan authentication state
      setUser(response.data.user);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      // Hapus token jika login gagal
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Fungsi register
  const register = async (userData) => {
    try {
      const response = await api.post("/api/v1/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Fungsi logout
  const logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Reset state
    setUser(null);
    setIsAuthenticated(false);
  };

  // Cek autentikasi saat komponen dimount
  useEffect(() => {
    const token = localStorage.getItem("token");

    const verifyToken = async () => {
      setIsLoading(true);
      try {
        if (token) {
          // Anda bisa menambahkan endpoint verify token di sini jika API menyediakannya
          const response = await api.get("/api/v1/user");
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Hapus token jika tidak valid
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Value yang akan di-provide
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook untuk menggunakan auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw error jika hook digunakan di luar provider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
