import { useState, useEffect } from "react";
import axios from "axios";

const useBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setBanners(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createBanner = async (bannerData) => {
    try {
      if (!bannerData.name || !bannerData.imageUrl) {
        throw new Error("Name and Image URL are required!");
      }

      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        bannerData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchBanners();
      return { success: true };
    } catch (err) {
      console.error("Error details:", err.response?.data, err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const updateBanner = async (id, bannerData) => {
    try {
      if (!bannerData.name || !bannerData.imageUrl) {
        throw new Error("Name and Image URL are required!");
      }

      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`,
        bannerData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchBanners();
      return { success: true };
    } catch (err) {
      console.error("Error details:", err.response?.data, err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const deleteBanner = async (id) => {
    try {
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchBanners();
      return { success: true };
    } catch (err) {
      console.error("Error details:", err.response?.data, err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return {
    banners,
    loading,
    error,
    createBanner,
    updateBanner,
    deleteBanner,
    refreshBanners: fetchBanners,
  };
};

export default useBanner;
