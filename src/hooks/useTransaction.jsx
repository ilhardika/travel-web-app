import { useState, useEffect } from "react";
import axios from "axios";

const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transactions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setTransactions(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (cartIds, paymentMethodId) => {
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        {
          cartIds,
          paymentMethodId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchTransactions();
      return { success: true, transactionId: response.data.data.id };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    createTransaction,
    refreshTransactions: fetchTransactions,
  };
};

export default useTransaction;
