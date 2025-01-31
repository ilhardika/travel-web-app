import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, CreditCard, ChevronRight } from "lucide-react";
import useTransactions from "../../hooks/useTransaction";
import Navbar from "../../components/Navbar";

const TransactionsPage = () => {
  const navigate = useNavigate();
  const { transactions, loading, error } = useTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 p-8 rounded-2xl text-center">
            <p className="text-red-600 text-xl mb-4">{error}</p>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sort transactions by latest created
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          All Transactions
        </h1>
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions yet</p>
            <button
              onClick={() => navigate("/activity")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Explore Activities
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => navigate(`/transactions/${transaction.id}`)}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {transaction.invoiceId}
                  </h3>
                  <div className="flex flex-col md:flex-row items-start gap-1 mt-1">
                    <span className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(transaction.orderDate).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      {transaction.transaction_items.length} items
                    </span>
                  </div>
                  {transaction.proofPaymentUrl && (
                    <div className="mt-2">
                      <a
                        href={transaction.proofPaymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Proof of Payment
                      </a>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    IDR {(transaction.totalAmount || 0).toLocaleString("id-ID")}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      transaction.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status || "PENDING"}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        )}
        {/* Pagination Controls */}
        {sortedTransactions.length > transactionsPerPage && (
          <div className="flex justify-center gap-5 items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
