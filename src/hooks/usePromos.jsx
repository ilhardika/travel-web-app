// hooks/usePromos.js
import { useState, useEffect } from "react";

export const usePromos = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
          {
            method: "GET",
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPromos(data.data);
      } catch (error) {
        console.error("Error fetching promos:", error);
        setError(error.message || "Failed to fetch promos");
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  return { promos, loading, error };
};
