import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";

const LandingPage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
    </div>
  );
};

export default LandingPage;
