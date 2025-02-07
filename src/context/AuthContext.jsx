import React, { createContext, useContext, useState, useEffect } from "react";

// Membuat context untuk manajemen autentikasi
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State untuk menyimpan status autentikasi
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect untuk memeriksa token saat aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fungsi untuk menangani proses login
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Fungsi untuk menangani proses logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Menyediakan context value untuk komponen child
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
