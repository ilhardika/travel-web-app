import { useState, useEffect } from "react";

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      
      // Preserve order by updating quantities instead of replacing the entire array
      if (cartItems.length > 0) {
        const updatedItems = cartItems.map(existingItem => {
          const newItemData = data.data.find(newItem => newItem.id === existingItem.id);
          return newItemData || existingItem;
        });
        
        // Add any new items that weren't in the original array
        const newItems = data.data.filter(
          newItem => !cartItems.some(existingItem => existingItem.id === newItem.id)
        );
        
        setCartItems([...updatedItems, ...newItems]);
      } else {
        // First load - just set the items as they come
        setCartItems(data.data || []);
      }
      setSelectedItems([]); // Reset selections when cart updates
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      console.log("Updating cart:", { cartId, quantity });
      
      // Update local state optimistically
      setCartItems(currentItems => 
        currentItems.map(item => 
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
        await fetchCart();
        return true;
      }
      throw new Error(data.message || "Failed to delete item");
    } catch (err) {
      setError(err.message);
      return false;
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

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cartItems,
    loading,
    error,
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
