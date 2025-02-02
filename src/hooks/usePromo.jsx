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
      // Validasi field wajib
      if (!promoData.title || !promoData.promo_code) {
        throw new Error("Title and Promo Code are required!");
      }

      promoData.promo_discount_price = Number(promoData.promo_discount_price);
      promoData.minimum_claim_price = Number(promoData.minimum_claim_price);

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
      console.error("Error details:", err.response?.data, err.message); // Log detail error
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  const updatePromo = async (id, promoData) => {
    try {
      // Pastikan promo_discount_price dan minimum_claim_price adalah angka
      promoData.promo_discount_price = Number(promoData.promo_discount_price);
      promoData.minimum_claim_price = Number(promoData.minimum_claim_price);

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
