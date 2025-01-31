import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthRequest = async (url, userData) => {
    try {
      const response = await axios.post(url, userData, {
        headers: {
          "Content-Type": "application/json",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.data));
        }
        return true;
      }
      throw new Error(response.data.message || "Authentication failed");
    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError("");
    setLoading(true);
    const success = await handleAuthRequest(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
      { email, password }
    );
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      const redirectTo =
        user.role === "admin"
          ? "/admin-dashboard"
          : new URLSearchParams(location.search).get("prev") || "/";
      navigate(redirectTo);
    }
    return success;
  };

  const register = async (userData) => {
    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.phoneNumber
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    setLoading(true);
    const success = await handleAuthRequest(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
      { ...userData, passwordConfirmation: userData.password }
    );
    if (success) {
      const redirectTo =
        new URLSearchParams(location.search).get("prev") || "/";
      navigate(redirectTo);
    }
    return success;
  };

  return { login, register, error, loading };
};

export default useAuth;
