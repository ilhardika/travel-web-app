import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import halaman
import Login from "../pages/auth/Login";
import LandingPage from "../pages/public/LandingPage";

// Import context provider
import { AuthProvider } from "../context/AuthContext";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Nanti akan ditambahkan rute lain */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
