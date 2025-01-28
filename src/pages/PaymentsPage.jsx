import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useTransaction from "../hooks/useTransaction.jsx";
import Toast from "../components/Toast";
import { Upload, X, CheckCircle } from "lucide-react";

const PaymentsPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const {
    uploadProofOfPayment,
    updateProofPayment,
    fetchTransaction,
    transaction,
    loading,
    error,
  } = useTransaction();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [proofImage, setProofImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchTransaction(transactionId);
  }, [transactionId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProofImage(null);
    setPreviewUrl(null);
  };

  const handleUploadProof = async () => {
    if (proofImage) {
      const uploadResult = await uploadProofOfPayment(proofImage);
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
          setUploadedImageUrl(uploadResult.imageUrl);
          setShowSuccessModal(true);
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

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-500">
            {error === "Transaction not found"
              ? "Transaction not found."
              : "Failed to load transaction details."}
          </p>
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
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Items Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              Activity Summary
            </h2>
            <div className="space-y-4">
              {transaction?.transaction_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover shadow-sm"
                  />
                  <div className="flex justify-between items-center w-full">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">
                      {item.quantity} x IDR {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-400 mt-6 pt-4 text-right">
              <h3 className="text-lg font-semibold text-gray-900">
                Total: IDR {transaction?.totalAmount?.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              Upload Proof of Payment
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="proof-upload"
                accept="image/*"
              />
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="relative w-full max-w-md mx-auto">
                    <img
                      src={previewUrl}
                      alt="Payment proof preview"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Click "Change Image" to upload this proof of payment
                  </p>
                </div>
              ) : (
                <label
                  htmlFor="proof-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <Upload className="w-10 h-10 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Drop your file here or{" "}
                    <span className="text-blue-600">browse</span>
                  </span>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPG, PNG, JPEG
                  </p>
                </label>
              )}
            </div>
            {proofImage && (
              <button
                onClick={handleUploadProof}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Upload Image
              </button>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl w-full max-w-md text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Payment Proof Uploaded Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your payment proof has been uploaded. You can view your
              transactions by clicking the button below.
            </p>
            <button
              onClick={() => navigate("/transactions")}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              My Transactions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
