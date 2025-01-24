import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useCart from "../hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const CartPage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const {
    cartItems,
    loading,
    updateQuantity,
    deleteCartItem,
    selectedItems,
    toggleItemSelection,
    toggleAllItems,
    getSelectedItemsTotal,
  } = useCart();
  const [deleteItem, setDeleteItem] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (cartId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      const success = await updateQuantity(cartId, newQuantity);

      if (!success) {
        setToast({
          show: true,
          message: "Failed to update quantity",
          type: "error",
        });
      }
    }
  };

  const handleDelete = async (cartId, itemName) => {
    setDeleteItem({ id: cartId, name: itemName });
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    const success = await deleteCartItem(deleteItem.id);
    setToast({
      show: true,
      message: success
        ? `Successfully removed ${deleteItem.name}`
        : "Failed to remove item",
      type: success ? "success" : "error",
    });
    setDeleteItem(null);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      setToast({
        show: true,
        message: "Please select items to checkout",
        type: "error",
      });
      return;
    }

    const totalAmount = getSelectedItemsTotal();
    navigate("/checkout", {
      state: {
        selectedItems,
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-between items-star gap-4 mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 lg:mb-0">
            Activity Cart
          </h1>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-2 ml-6">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={(e) => toggleAllItems(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate("/activity")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Activities
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="mt-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <img
                      src={item.activity.imageUrls[0]}
                      alt={item.activity.title}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.activity.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {item.activity.city}, {item.activity.province}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity, -1)
                            }
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="font-medium w-8 text-center"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity, 1)
                            }
                            className="p-2 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, color: "#ef4444" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(item.id, item.activity.title)}
                            className="p-2 rounded-full hover:bg-red-50 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            IDR{" "}
                            {(
                              item.activity.price * item.quantity
                            ).toLocaleString("id-ID")}
                          </div>
                          {item.activity.price_discount && (
                            <div className="text-sm text-gray-500 line-through">
                              IDR{" "}
                              {(
                                item.activity.price_discount * item.quantity
                              ).toLocaleString("id-ID")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {selectedItems.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 backdrop-blur-lg bg-white/90 z-50"
              >
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-gray-600 text-center lg:text-left">
                      Total Selected ({selectedItems.length} items)
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      IDR {getSelectedItemsTotal().toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full lg:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
                  >
                    Checkout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
      <DeleteConfirmationModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        itemName={deleteItem?.name}
      />
    </div>
  );
};

export default CartPage;
