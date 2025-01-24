import { useState, useEffect } from "react";

export const useDestinations = (categoryName = null) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch categories terlebih dahulu
        const categoriesResponse = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            method: "GET",
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        const categoriesData = await categoriesResponse.json();

        // Jika ada categoryName, cari ID kategori
        let categoryId = null;
        if (categoryName) {
          const category = categoriesData.data.find(
            (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
          );

          if (category) {
            categoryId = category.id;
          }
        }

        // Fetch destinations (activities)
        const destinationsResponse = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
          {
            method: "GET",
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        if (!destinationsResponse.ok) {
          throw new Error(`HTTP error! status: ${destinationsResponse.status}`);
        }

        const destinationsData = await destinationsResponse.json();

        // Filter destinations by category if categoryName is provided
        const filteredDestinations = categoryId
          ? destinationsData.data.filter(
              (dest) => dest.categoryId === categoryId
            )
          : destinationsData.data;

        setDestinations(filteredDestinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError(error.message || "Failed to fetch destinations");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [categoryName]);

  return { destinations, loading, error };
};
