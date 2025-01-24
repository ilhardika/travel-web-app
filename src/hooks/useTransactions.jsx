import { useState, useEffect } from 'react';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          setTransactions(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useTransactions;
