import React from 'react';
import Navbar from '../components/Navbar';
import useCart from '../hooks/useCart';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cartItems, loading, updateQuantity } = useCart();

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
      await updateQuantity(cartId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex gap-6">
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
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          IDR {(item.activity.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                        {item.activity.price_discount && (
                          <div className="text-sm text-gray-500 line-through">
                            IDR {(item.activity.price_discount * item.quantity).toLocaleString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
