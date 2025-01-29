import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthRequest = async (url, userData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          ...(url.includes("update-profile") && {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.data));
        }
        return true;
      } 
      throw new Error(data.message || "Authentication failed");
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
      const redirectTo = user.role === "admin" ? "/admin-dashboard" : new URLSearchParams(location.search).get('prev') || "/";
      navigate(redirectTo);
    }
    return success;
  };

  const register = async (userData) => {
    if (!userData.name || !userData.email || !userData.password || !userData.phoneNumber) {
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
      const redirectTo = new URLSearchParams(location.search).get('prev') || "/";
      navigate(redirectTo);
    }
    return success;
  };

  const updateProfile = async (userData) => {
    setError("");
    setLoading(true);
    const success = await handleAuthRequest(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
      userData
    );
    if (success) navigate("/profile");
    return success;
  };

  const updateUserRole = async (userId, role) => {
    setError("");
    setLoading(true);
    try {
      console.log(`Updating role for user ${userId} to ${role}`);
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ role }),
        }
      );
      const data = await response.json();
      console.log('Response:', data);
      if (!response.ok) throw new Error(data.message);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, updateProfile, updateUserRole, error, loading };
};
