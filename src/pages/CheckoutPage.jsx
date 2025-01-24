import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import usePaymentMethods from '../hooks/usePaymentMethods';
import { motion } from 'framer-motion';
import { CreditCard, Wallet } from 'lucide-react';
import Toast from '../components/Toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems, totalAmount } = location.state || {};
  const { paymentMethods, loading: loadingPayments } = usePaymentMethods();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleCheckout = async () => {
    if (!selectedPayment) {
      setToast({
        show: true,
        message: 'Please select a payment method',
        type: 'error'
      });
      return;
    }

    try {
      // Will implement in next step
      console.log('Processing checkout:', {
        cartIds: selectedItems,
        paymentMethodId: selectedPayment
      });
    } catch (error) {
      setToast({
        show: true,
        message: error.message || 'Failed to process checkout',
        type: 'error'
      });
    }
  };

  if (!selectedItems || !totalAmount) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          {/* Summary Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total Items</span>
              <span className="font-medium">{selectedItems.length}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold">
                IDR {totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            {loadingPayments ? (
              <div className="animate-pulse space-y-4">
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                      ${selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {method.type === 'CREDIT_CARD' ? (
                        <CreditCard className="w-6 h-6 text-gray-600" />
                      ) : (
                        <Wallet className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/cart')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
            >
              Back to Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={!selectedPayment}
              className={`flex-1 px-6 py-3 rounded-xl font-medium text-white
                ${selectedPayment ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
