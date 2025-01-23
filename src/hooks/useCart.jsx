import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        }
      });
      const data = await response.json();
      setCartItems(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        },
        body: JSON.stringify({ quantity })
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after update
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cartItems,
    loading,
    error,
    updateQuantity,
    refreshCart: fetchCart,
    totalItems: cartItems.length
  };
};

export default useCart;
