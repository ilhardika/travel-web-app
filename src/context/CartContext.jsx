import React, { createContext, useContext, useEffect, useState } from "react";

// Membuat context untuk manajemen keranjang belanja
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State untuk menyimpan jumlah item di keranjang
  const [cartCount, setCartCount] = useState(0);

  // Fungsi untuk mengupdate jumlah item keranjang dari API
  const updateCartCount = async () => {
    try {
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
      setCartCount(data.data?.length || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Effect untuk mengambil data keranjang saat pertama kali mounted
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      updateCartCount();
    } else {
      setCartCount(0);
    }
  }, [localStorage.getItem("token")]);

  // Menyediakan context value untuk komponen child
  return (
    <CartContext.Provider value={{ cartCount, setCartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook untuk menggunakan CartContext
export const useCartContext = () => useContext(CartContext);
