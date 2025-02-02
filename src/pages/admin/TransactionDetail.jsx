import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTransaction from "../../hooks/useTransaction";
import AdminSidebar from "../../components/AdminSidebar";
import Toast from "../../components/Toast";

const TransactionDetail = () => {
  const { transactionId } = useParams();
  const {
    transaction,
    loading: transactionLoading,
    fetchTransaction,
    updateTransactionStatus,
    deleteTransaction,
  } = useTransaction();
  const [isExpanded, setIsExpanded] = useState(true);
  const [status, setStatus] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchTransaction(transactionId);
  }, [transactionId]);

  useEffect(() => {
    if (transaction) {
      setStatus(transaction.status);
    }
  }, [transaction]);

  const handleStatusChange = async () => {
    if (transaction.status !== "pending") {
      setToastMessage("Failed to update status, only 'pending' status are allowed");
      setShowToast(true);
      return;
    }
    const { success, error } = await updateTransactionStatus(transactionId, status);
    if (success) {
      setToastMessage("Status updated successfully");
    } else {
      setToastMessage(error || "Failed to update status");
    }
    setShowToast(true);
  };

  const handleCancelTransaction = async () => {
    const { success, error } = await deleteTransaction(transactionId);
    if (success) {
      setToastMessage("Transaction cancelled successfully");
    } else {
      setToastMessage(error || "Failed to cancel transaction");
    }
    setShowToast(true);
  };

  if (transactionLoading || !transaction) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Detail Transaksi</h1>
          <p className="text-gray-400">Informasi detail tentang transaksi.</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white">
            ID Transaksi: {transaction.id}
          </h2>
          <p className="text-gray-400 mt-2">
            Tanggal: {new Date(transaction.orderDate).toLocaleDateString()}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Informasi Pengguna
              </h3>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Nama:</span>{" "}
                {transaction.user?.name || "N/A"}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Email:</span>{" "}
                {transaction.user?.email || "N/A"}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">No. Telepon:</span>{" "}
                {transaction.user?.phoneNumber || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Daftar Aktivitas yang Dibeli
              </h3>
              {transaction.transaction_items?.map((item, index) => (
                <div key={index} className="text-gray-400 mt-2">
                  <p>
                    <span className="font-bold">Nama:</span> {item.title}
                  </p>
                  <p>
                    <span className="font-bold">Harga:</span> {item.price}
                  </p>
                  <p>
                    <span className="font-bold">Jumlah:</span> {item.quantity}
                  </p>
                </div>
              )) || (
                <p className="text-gray-400 mt-2">
                  Tidak ada aktivitas yang dibeli
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white">Bukti Pembayaran</h3>
            {transaction.proofPaymentUrl ? (
              <img
                src={transaction.proofPaymentUrl}
                alt="Proof of Payment"
                className="rounded-lg mt-2"
              />
            ) : (
              <p className="text-gray-400 mt-2">Tidak ada bukti pembayaran</p>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white">Status Transaksi</h3>
            {transaction.status === "pending" ? (
              <>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white w-full mt-2"
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>
                <button
                  onClick={handleStatusChange}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-2"
                >
                  Simpan Perubahan Status
                </button>
              </>
            ) : (
              <p className="text-gray-400 mt-2">{transaction.status}</p>
            )}
          </div>
          {transaction.status === "pending" && (
            <div className="mt-4">
              <button
                onClick={handleCancelTransaction}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Batalkan Transaksi
              </button>
            </div>
          )}
          <div className="mt-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 bg-gray-500 text-white rounded"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} show={showToast} />}
    </div>
  );
};

export default TransactionDetail;
