import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Upload} from "lucide-react";
import useTransaction from "../hooks/useTransaction";
import Toast from "../components/Toast";

const TransactionDetailPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { uploadProofOfPayment, updateProofPayment } = useTransaction();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        const response = await fetch(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transaction/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        const data = await response.json();
        if (data.code === "200") {
          setTransaction(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transactionId]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadResult = await uploadProofOfPayment(file);
      if (uploadResult.success) {
        const updateResult = await updateProofPayment(
          transactionId,
          uploadResult.imageUrl
        );
        if (updateResult.success) {
          setToast({
            show: true,
            message: "Payment proof uploaded successfully",
            type: "success",
          });
          // Refresh transaction details
          window.location.reload();
        } else {
          setToast({
            show: true,
            message: updateResult.error,
            type: "error",
          });
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toast
        {...toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Transaction Detail</h1>

          {/* Transaction Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-medium">{transaction?.id}</p>
                <p className="text-2xl font-bold mt-2">
                  IDR {transaction?.total_amount.toLocaleString("id-ID")}
                </p>
              </div>
              {/* Status Badge */}
            </div>

            {/* Items */}
            <div className="space-y-4">
              {transaction?.items.map((item) => (
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Proof Section */}
          {transaction?.status === "pending" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">
                Upload Payment Proof
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                    <span>Click to upload proof of payment</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
