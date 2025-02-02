import { useEffect, useState } from "react";
import usePromos from "../../hooks/usePromo";
import useUserProfile from "../../hooks/useUser";
import useTransactions from "../../hooks/useTransaction";
import useActivities from "../../hooks/useActivity"; // Import the useActivities hook
import AdminSidebar from "../../components/AdminSidebar";

const AdminDashboard = () => {
  const { promos, loading: promosLoading } = usePromos();
  const { userData, users, loading: usersLoading } = useUserProfile();
  const { transactions, loading: transactionsLoading } = useTransactions();
  const { activities, loading: activitiesLoading } = useActivities(); // Use the useActivities hook
  const [stats, setStats] = useState({
    users: 0,
    activities: 0,
    promos: 0,
    transactions: 0,
  });
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {userData?.name || "Admin"}!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Active Promos</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.promos}</p>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.users}</p>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">
              Total Transactions
            </h3>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.transactions}
            </p>
          </div>
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
