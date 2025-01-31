import { useState, useEffect } from "react";
import axios from "axios";

const useActivity = (activityId = null) => {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setActivities(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setActivity(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (activityData) => {
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
        activityData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchActivities();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateActivity = async (id, activityData) => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
        activityData,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchActivities();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchActivities();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    if (activityId) {
      fetchActivityDetail(activityId);
    } else {
      fetchActivities();
    }
  }, [activityId]);

  return {
    activities,
    activity,
    loading,
    error,
    createActivity,
    updateActivity,
    deleteActivity,
    refreshActivities: fetchActivities,
  };
};

export default useActivity;
