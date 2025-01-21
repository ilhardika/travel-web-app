import axiosInstance from "./axiosConfig";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/v1/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/api/v1/register", userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

// Login Page
// Register Page
// Navbar (logout)
