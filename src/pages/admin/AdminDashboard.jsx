/* ===== IMPORT DAN DEPENDENCIES ===== */
// Import hooks dan komponen yang dibutuhkan
import { useEffect, useState } from "react";
import usePromos from "../../hooks/usePromo";
import useUserProfile from "../../hooks/useUser";
import useTransactions from "../../hooks/useTransaction";
import useActivities from "../../hooks/useActivity";
import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => {
  /* ===== PENGATURAN STATE DAN HOOKS ===== */
  // Mengambil data dari berbagai custom hooks
  const { promos, loading: promosLoading } = usePromos(); // Data promo
  const { userData, users, loading: usersLoading } = useUserProfile(); // Data user
  const {
    transactions,
    loading: transactionsLoading,
    refreshTransactions, // Add this to get the fetchAllTransactions function
  } = useTransactions(); // Data transaksi
  const { activities, loading: activitiesLoading } = useActivities(); // Data aktivitas

  // State untuk statistik dashboard
  const [stats, setStats] = useState({
    users: 0, // Jumlah total pengguna
    activities: 0, // Jumlah total aktivitas
    promos: 0, // Jumlah total promo
    transactions: 0, // Jumlah total transaksi
  });

  // State untuk kontrol sidebar
  const [isExpanded, setIsExpanded] = useState(true);
  const [didInitialFetch, setDidInitialFetch] = useState(false);

  // IMPORTANT: Only fetch transactions once when component mounts
  useEffect(() => {
    if (!didInitialFetch && refreshTransactions) {
      console.log("Fetching all transactions for admin dashboard");
      refreshTransactions();
      setDidInitialFetch(true);
    }
  }, [refreshTransactions, didInitialFetch]);

  // Effect untuk menghitung statistik ketika data tersedia
  useEffect(() => {
    // Update statistik hanya jika semua data sudah dimuat
    if (
      !promosLoading &&
      !usersLoading &&
      !transactionsLoading &&
      !activitiesLoading
    ) {
      setStats({
        promos: promos?.length || 0,
        users: users?.length || 0,
        transactions: transactions?.length || 0,
        activities: activities?.length || 0,
      });
    }
  }, [
    promos,
    users,
    transactions,
    activities,
    promosLoading,
    usersLoading,
    transactionsLoading,
    activitiesLoading,
  ]);

  /* ===== RENDER CONDITIONS ===== */
  // Tampilkan loading jika masih mengambil data
  if (
    promosLoading ||
    usersLoading ||
    transactionsLoading ||
    activitiesLoading
  ) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  /* ===== RENDER KOMPONEN ===== */
  return (
    <div className="min-h-screen w-full bg-gray-900 flex">
      {/* Sidebar dengan toggle ekspansi */}
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Area konten utama */}
      <div
        className={`w-full p-4 transition-all duration-300 ${
          isExpanded ? "ml-64" : "pl-14"
        }`}
      >
        {/* Header dengan sapaan */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {userData?.name || "Admin"}!
          </p>
        </div>

        {/* Grid statistik dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Kartu statistik promo */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Active Promos</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.promos}</p>
          </div>

          {/* Kartu statistik pengguna */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.users}</p>
          </div>

          {/* Kartu statistik transaksi */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">
              Total Transactions
            </h3>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.transactions}
            </p>
          </div>

          {/* Kartu statistik aktivitas */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">
              Total Activities
            </h3>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.activities}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
