import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCartCount } = useCartContext(); // Remove duplicate declaration and updateCartCount

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      const data = await response.json();
      const items = data.data || [];
      setCartItems(items);
      setCartCount(items.length); // Update global cart count
      return items.length; // Return the count for initializing
    } catch (err) {
      setError(err.message);
      return 0;
    } finally {
      setLoading(false);
    }
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

      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({
            quantity: parseInt(quantity, 10),
          }),
        }
      );

      if (!response.ok) {
        // Rollback on error
        await fetchCart();
        throw new Error(`Failed to update cart: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update response:", data);

      if (data.code === "200") {
        return true;
      }

      // Rollback on API error
      await fetchCart();
      throw new Error(data.message || "Failed to update quantity");
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

      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const data = await response.json();
      if (data.code === "200") {
        return true;
      }

      // Rollback if failed
      await fetchCart();
      throw new Error(data.message || "Failed to delete item");
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

      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify({ activityId }),
        }
      );

      const data = await response.json();

      if (data.code === "200") {
        await fetchCart(); // Refresh cart after adding
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Failed to add to cart");
      }
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
