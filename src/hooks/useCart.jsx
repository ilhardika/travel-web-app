import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";

const API_BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCartCount } = useCartContext();

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    apiKey: API_KEY,
    "Content-Type": "application/json",
  });

  const handleApiRequest = async (url, method = "GET", body = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: getHeaders(),
        ...(body && { body: JSON.stringify(body) }),
      });
      const data = await response.json();
      if (data.code === "200") return { success: true, data: data.data };
      throw new Error(data.message);
    } catch (err) {
      console.error(`Cart operation failed:`, err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const fetchCart = async () => {
    setLoading(true);
    const result = await handleApiRequest("/carts");
    if (result.success) {
      setCartItems(result.data);
      setCartCount(result.data.length);
    }
    setLoading(false);
    return result.success ? result.data.length : 0;
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      console.log("Updating cart:", { cartId, quantity });

      // Update local state optimistically
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === cartId
            ? { ...item, quantity: parseInt(quantity, 10) }
            : item
        )
      );

      const result = await handleApiRequest(
        `/update-cart/${cartId}`,
        "POST",
        { quantity: parseInt(quantity, 10) }
      );

      if (!result.success) {
        // Rollback on error
        await fetchCart();
        throw new Error(result.error);
      }

      console.log("Update response:", result.data);
      return true;
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
      return false;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      // Optimistic updates
      const newItems = cartItems.filter((item) => item.id !== cartId);
      setCartItems(newItems);
      setCartCount(newItems.length); // Update global cart count
      setSelectedItems((prev) => prev.filter((id) => id !== cartId));

      const result = await handleApiRequest(
        `/delete-cart/${cartId}`,
        "DELETE"
      );

      if (!result.success) {
        // Rollback if failed
        await fetchCart();
        throw new Error(result.error);
      }

      return true;
    } catch (err) {
      console.error("Delete error:", err);
      // Rollback optimistic updates if failed
      await fetchCart();
      setError(err.message);
      return false;
    }
  };

  const addToCart = async (activityId) => {
    try {
      setLoading(true);
      setError(null);

      const result = await handleApiRequest(
        "/add-cart",
        "POST",
        { activityId }
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      await fetchCart(); // Refresh cart after adding
      return { success: true, message: result.data.message };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const toggleItemSelection = (cartId) => {
    setSelectedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    );
  };

  const toggleAllItems = (checked) => {
    setSelectedItems(checked ? cartItems.map((item) => item.id) : []);
  };

  const getSelectedItemsTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.activity.price * item.quantity, 0);
  };

  // Load cart data on mount and token change
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    }
  }, [localStorage.getItem("token")]); // Re-fetch when token changes

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    deleteCartItem,
    refreshCart: fetchCart,
    totalItems: cartItems.length,
    selectedItems,
    toggleItemSelection,
    toggleAllItems,
    getSelectedItemsTotal,
  };
};

export default useCart;
