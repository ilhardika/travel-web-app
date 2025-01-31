import { useState, useEffect } from "react";
import axios from "axios";
import { useCartContext } from "../context/CartContext";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const { updateCartCount } = useCartContext();

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setCartItems(response.data.data);
      updateCartCount();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (activityId) => {
    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        { activityId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchCartItems();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchCartItems();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      if (response.status !== 200) throw new Error(response.data.message);
      await fetchCartItems();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const getSelectedItemsTotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cartItems.find((item) => item.id === itemId);
      return total + (item ? item.activity.price * item.quantity : 0);
    }, 0);
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const toggleAllItems = (selectAll) => {
    if (selectAll) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    deleteCartItem,
    refreshCartItems: fetchCartItems,
    getSelectedItemsTotal,
    selectedItems,
    toggleItemSelection,
    toggleAllItems,
  };
};

export default useCart;
