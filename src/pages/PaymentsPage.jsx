import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useTransaction from "../hooks/useTransaction.jsx";
import Toast from "../components/Toast";
import { Upload, X } from "lucide-react";

const PaymentsPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { uploadProofOfPayment, updateProofPayment, fetchTransaction } =
    useTransaction();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true);
      const result = await fetchTransaction(transactionId);
      if (result.success) {
        setTransaction(result.transaction);
        setUploadedImageUrl(result.transaction.proofPaymentUrl);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    getTransaction();
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
        <div className="max-w-3xl mx-auto">
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
    </div>
  );
};

export default PaymentsPage;
