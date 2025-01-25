import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import usePaymentMethods from "../hooks/usePaymentMethods";
import useTransaction from "../hooks/useTransaction.jsx";
import { motion } from "framer-motion";
import { CreditCard, Wallet, CheckCircle } from "lucide-react";
import Toast from "../components/Toast";
import { useCartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCartIds, cartItems, totalAmount } = location.state || {};
  const { paymentMethods, loading: loadingPayments } = usePaymentMethods();
  const { createTransaction, loading } = useTransaction();
  const { updateCartCount } = useCartContext();

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Add console.log to debug
    console.log("Checkout Page Data:", {
      cartItems,
      totalAmount,
    });

    if (!selectedCartIds?.length || !cartItems?.length || !totalAmount) {
      console.log("Missing required data, redirecting to cart");
      navigate("/cart");
    }
  }, [selectedCartIds, cartItems, totalAmount, navigate]);

  const selectedCartItems =
    cartItems?.filter((item) => selectedCartIds?.includes(item.id)) || [];

  const handleCheckout = async () => {
    if (!selectedPayment) {
      setToast({
        show: true,
        message: "Please select a payment method",
        type: "error",
      });
      return;
    }
  
    if (!selectedCartIds || selectedCartIds.length === 0) {
      setToast({
        show: true,
        message: "No items in the cart",
        type: "error",
      });
      return;
    }
  
    try {
      console.log("Creating transaction with:", {
        selectedCartIds,
        selectedPayment,
      });
  
      // Step 2: Create transaction
      const createResult = await createTransaction(selectedCartIds, selectedPayment);
      console.log("Create transaction result:", createResult);
  
      if (!createResult.success) {
        setToast({
          show: true,
          message: createResult.error || "Transaction creation failed",
          type: "error",
        });
        return;
      }
  
      setShowSuccessMessage(true); // Show success message overlay
      await updateCartCount(); // Update cart count after successful checkout
    } catch (error) {
      console.error("Error during checkout:", error);
      setToast({
        show: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toast
        {...toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Success Message Overlay */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 text-center max-w-md mx-4"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Your transaction has been successfully created.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
            >
              Back to Homepage
            </button>
          </motion.div>
        </div>
      )}

      {selectedCartIds && cartItems && totalAmount ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Order Details Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Selected Activity</h2>
              <div className="space-y-4">
                {selectedCartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b">
                    <img
                      src={item.activity.imageUrls[0]}
                      alt={item.activity.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.activity.title}</h3>
                      <p className="text-gray-500">
                        {item.quantity} x IDR{" "}
                        {item.activity.price.toLocaleString("id-ID")}
                      </p>
                      <p className="text-gray-600">
                        {item.activity.city}, {item.activity.province}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Card*/}
              <div className="border-t pt-3 text-lg flex justify-between font-semibold">
                <span>Total</span>
                <span>IDR {totalAmount.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                      selectedPayment === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {method.type === "CREDIT_CARD" ? (
                        <CreditCard className="w-6 h-6 text-gray-600" />
                      ) : (
                        <Wallet className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
              >
                Back to Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading || !selectedPayment}
                className={`flex-1 px-6 py-3 rounded-xl font-medium text-white
                  ${
                    !loading && selectedPayment
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckoutPage;
