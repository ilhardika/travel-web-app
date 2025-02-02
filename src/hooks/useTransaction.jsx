import { useState, useEffect } from "react";
import axios from "axios";

const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const createTransaction = async (cartIds, paymentMethodId) => {
    setLoading(true);
    try {
      console.log("Creating transaction with data:", {
        cartIds,
        paymentMethodId,
      });
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

      // Fetch the latest transactions to get the transaction ID
      const transactionsResponse = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      // Sort transactions by createdAt in descending order
      const sortedTransactions = transactionsResponse.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const latestTransaction = sortedTransactions[0];
      const transactionId = latestTransaction?.id;

      setLoading(false);
      console.log("Transaction ID retrieved:", transactionId);
      console.log("Full response data:", response.data); // Additional logging
      return {
        success: response.data.status === "OK",
        transactionId, // Ensure transactionId is correctly retrieved
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

      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload proof of payment response data:", response.data);
      if (response.data.code === "200") {
        return { success: true, imageUrl: response.data.url };
      }
      throw new Error(response.data.message);
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
        throw new Error("Transaction not found");
      }
      const data = await response.json();
      console.log("Fetch transaction response data:", data);
      if (data.code === "200") {
        setTransaction(data.data);
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

  const fetchMyTransactions = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
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

  const updateProofPayment = async (transactionId, proofPaymentUrl) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${transactionId}`,
        { proofPaymentUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.data.status === "OK") {
        return { success: true };
      }
      throw new Error(response.data.message);
    } catch (err) {
      console.error("Error updating proof of payment:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions",
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

  const updateTransactionStatus = async (transactionId, status) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-status/${transactionId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.data.status === "OK") {
        await fetchAllTransactions();
        return { success: true };
      }
      throw new Error(response.data.message);
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-transaction/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.data.status === "OK") {
        await fetchAllTransactions();
        return { success: true };
      }
      throw new Error(response.data.message);
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
    fetchAllTransactions();
  }, []);

  return {
    loading,
    error,
    transaction,
    paymentMethods,
    transactions,
    createTransaction,
    uploadProofOfPayment,
    fetchTransaction,
    fetchMyTransactions,
    updateProofPayment,
    updateTransactionStatus,
    deleteTransaction,
    refreshTransactions: fetchAllTransactions,
  };
};

export default useTransaction;
