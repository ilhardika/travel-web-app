import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useTransactions from '../hooks/useTransactions';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const TransactionsPage = () => {
  const { transactions, loading } = useTransactions();
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        );
      case 'success':
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Success
          </span>
        );
      case 'failed':
        return (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center">
            <XCircle className="w-4 h-4 mr-1" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My Transactions</h1>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map(transaction => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Transaction ID: {transaction.id}
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      IDR {transaction.total_amount.toLocaleString('id-ID')}
                    </p>
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>

                <div className="space-y-4">
                  {transaction.items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.activity.imageUrls[0]}
                        alt={item.activity.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{item.activity.title}</h3>
                        <p className="text-gray-500">
                          {item.quantity} x IDR {item.activity.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {transaction.status === 'pending' && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => navigate(`/transactions/${transaction.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Upload Payment Proof
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
