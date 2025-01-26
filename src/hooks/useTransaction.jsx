import { useState, useEffect } from "react";
import axios from "axios";

const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const createTransaction = async (cartIds, paymentMethodId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        {
          cartIds,
          paymentMethodId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      console.log("Create transaction response data:", response.data);

      // Fetch the latest transaction based on createdAt
      const transactionsResponse = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      const sortedTransactions = transactionsResponse.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const latestTransaction = sortedTransactions[0];

      setLoading(false);
      return {
        success: response.data.status === "OK",
        transactionId: latestTransaction.id, // Use the latest transaction ID
      };
    } catch (error) {
      console.error("Error creating transaction:", error);
      setLoading(false);
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const uploadProofOfPayment = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Upload proof of payment response data:", data);
      if (data.code === "200") {
        return { success: true, imageUrl: data.url };
      }
      throw new Error(data.message);
    } catch (err) {
      console.error("Error uploading proof of payment:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchTransaction = async (transactionId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.status === 404) {
        setLoading(false);
        throw new Error("Transaction not found");
      }
      const data = await response.json();
      console.log("Fetch transaction response data:", data);
      if (data.code === "200") {
        setTransaction(data.data);
        setLoading(false);
        return { success: true, transaction: data.data };
      }
      throw new Error(data.message);
    } catch (err) {
      console.error("Error fetching transaction:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setPaymentMethods(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProofPayment = async (transactionId, proofPaymentUrl) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${transactionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({ proofPaymentUrl }),
        }
      );

      const data = await response.json();
      console.log("Update proof of payment response data:", data);
      if (data.code === "200") {
        return { success: true };
      }
      throw new Error(data.message);
    } catch (err) {
      console.error("Error updating proof of payment:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return {
    loading,
    error,
    transaction,
    paymentMethods,
    createTransaction,
    uploadProofOfPayment,
    fetchTransaction,
    updateProofPayment,
  };
};

export default useTransaction;
