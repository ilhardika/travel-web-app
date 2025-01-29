import { useState, useEffect } from 'react';

export const usePromo = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPromos = async () => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      const data = await response.json();
      setPromos(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPromo = async (promoData) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(promoData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchPromos();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updatePromo = async (id, promoData) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(promoData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchPromos();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deletePromo = async (id) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        {
          method: "DELETE",
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
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
