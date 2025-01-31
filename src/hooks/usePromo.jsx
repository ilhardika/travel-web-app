import { useState, useEffect } from "react";
import axios from "axios";

const usePromos = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromos = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setPromos(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPromo = async (promoData) => {
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
        promoData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchPromos();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updatePromo = async (id, promoData) => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
        promoData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchPromos();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deletePromo = async (id) => {
    try {
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchPromos();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return {
    promos,
    loading,
    error,
    createPromo,
    updatePromo,
    deletePromo,
    refreshPromos: fetchPromos,
  };
};

export default usePromos;
