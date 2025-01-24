import { useState, useEffect } from 'react';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
        }
      );

      const data = await response.json();
      if (data.code === "200") {
        // Transform data to ensure required fields exist
        const transformedTransactions = data.data.map(transaction => ({
          ...transaction,
          totalPrice: transaction.totalPrice || 0,
          status: transaction.status || 'PENDING',
          createdAt: transaction.createdAt || new Date().toISOString()
        }));
        setTransactions(transformedTransactions);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { 
    transactions, 
    loading, 
    error,
    refreshTransactions: fetchTransactions 
  };
};

export default useTransactions;
