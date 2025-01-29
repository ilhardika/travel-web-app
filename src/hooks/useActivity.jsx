import { useState, useEffect } from 'react';

const useActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const data = await response.json();
      setActivities(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (activityData) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(activityData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchActivities();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateActivity = async (id, activityData) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(activityData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchActivities();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
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
      await fetchActivities();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    createActivity,
    updateActivity,
    deleteActivity,
    refreshActivities: fetchActivities,
  };
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

export { useActivity };
export default useActivity;
