import { useState, useEffect } from 'react';

const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods',
          {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
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

    fetchPaymentMethods();
  }, []);

  return { paymentMethods, loading, error };
};

export default usePaymentMethods;
