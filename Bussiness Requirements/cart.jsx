import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data cart dari localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithDefaultQuantity = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(cartWithDefaultQuantity);

    // Ambil metode pembayaran dari API
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods", {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    })
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data.data || []))
      .catch((error) => console.error("Error fetching payment methods:", error));
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item) => item !== null);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    const transactionData = {
      activities: cartItems.map((item) => ({
        activity_id: item.id,
        quantity: item.quantity,
      })),
      payment_method_id: selectedPaymentMethod,
    };

    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjI4NDgzODl9.Yblw19ySKtguk-25Iw_4kBKPfqcNqKWx9gjf505DIAk",
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Transaction successful!");
        navigate("/transactions");
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
        alert("Transaction failed!");
      });
  };

  return (
    <div className="container px-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="font-bold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">Price: Rp {item.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity || 1}</p>
                    <p className="text-sm font-bold text-gray-600">
                      Total: Rp {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="px-3 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="px-3 py-2 text-white bg-green-500 rounded-full hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-3 py-2 text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">
              Total Price: Rp {calculateTotalPrice().toLocaleString()}
            </h3>
          </div>
          <div className="mt-6">
            <label htmlFor="payment-method" className="block mb-2 text-sm font-medium text-gray-700">
              Select Payment Method
            </label>
            <select
              id="payment-method"
              className="w-full px-4 py-2 border rounded-md"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">-- Choose a Payment Method --</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
            <span className="font-bold text-gray-800">Total Items: {cartItems.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;