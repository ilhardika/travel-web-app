import { useState } from 'react';

const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadProofOfPayment = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.code === "200") {
        return { success: true, imageUrl: data.url };
      }
      throw new Error(data.message);
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (cartIds, paymentMethodId) => {
    try {
      setLoading(true);
      
      // Debug the input
      console.log('Creating transaction with:', {
        cartIds: Array.isArray(cartIds) ? cartIds : [cartIds],
        paymentMethodId
      });

      const response = await fetch(
        'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
          body: JSON.stringify({
            cartIds: Array.isArray(cartIds) ? cartIds : [cartIds],
            paymentMethodId: paymentMethodId
          }),
        }
      );

      const data = await response.json();
      console.log('Raw request body:', JSON.stringify({
        cartIds: Array.isArray(cartIds) ? cartIds : [cartIds],
        paymentMethodId: paymentMethodId
      }));
      console.log('Transaction response:', data);
      
      if (data.code === "200") {
        return { success: true, transaction: data.data };
      }
      throw new Error(data.message || data.errors || 'Failed to create transaction');
    } catch (err) {
      console.error('Transaction error:', err);
      setError(err.message);
      return { success: false, error: err.message };
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          },
          body: JSON.stringify({ proofPaymentUrl }),
        }
      );

      const data = await response.json();
      if (data.code === "200") {
        return { success: true };
      }
      throw new Error(data.message);
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadProofOfPayment,
    createTransaction,
    updateProofPayment,
    loading,
    error
  };
};

export default useTransaction;
