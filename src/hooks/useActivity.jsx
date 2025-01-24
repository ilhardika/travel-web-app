import { useEffect, useState } from "react";

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
};

export const useActivityDetails = (activityId) => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      setLoading(true);
      setError(null);

      if (!activityId) {
        setError("No activity ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${activityId}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.data) {
          setActivity(data.data);
        } else {
          throw new Error("Invalid response data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetail();
  }, [activityId]);

  return { activity, loading, error };
};

export default useActivities;
