import axios from "axios";

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      {
        headers: {
          apiKey: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Simpan token di localStorage
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login gagal");
  }
};
