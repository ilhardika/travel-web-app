import { useState } from "react";

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (activityId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "apiKey": "24405e01-fbc1-45a5-9f5a-be13afcd757c"
        },
        body: JSON.stringify({ activityId }),
      });

      const data = await response.json();
      console.log("Add to cart response:", data);

      if (data.code === "200") {
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error };
};

export default useAddToCart;
