import { useState, useEffect } from "react";

const useActivityDetails = (activityId) => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      // Reset state sebelum fetching
      setLoading(true);
      setError(null);

      if (!activityId) {
        setError("No activity ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching activity with ID:", activityId);

        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${activityId}`,
          {
            method: "GET",
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched activity data:", data);

        // Pastikan data valid sebelum di-set
        if (data && data.data) {
          setActivity(data.data);
        } else {
          throw new Error("Invalid response data");
        }
      } catch (err) {
        console.error("Error in fetchActivityDetail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetail();
  }, [activityId]);

  return { activity, loading, error };
};

export default useActivityDetails;
