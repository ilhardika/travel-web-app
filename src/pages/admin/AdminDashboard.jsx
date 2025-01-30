import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useCategories } from "../../hooks/useCategories";
import { usePromo } from "../../hooks/usePromo";
import { useBanners } from "../../hooks/useBanners";
import useUserProfile  from "../../hooks/useUserProfile";

const AdminDashboard = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { promos, loading: promosLoading } = usePromo();
  const { banners, loading: bannersLoading } = useBanners();
  const { userData, loading: userLoading } = useUserProfile();
  const [stats, setStats] = useState({
    users: 0,
    activities: 0,
    promos: 0,
    banners: 0,
  });
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (!categoriesLoading && !promosLoading && !bannersLoading) {
      setStats({
        activities: categories?.length || 0,
        promos: promos?.length || 0,
        banners: banners?.length || 0,
      });
    }
  }, [categories, promos, banners, categoriesLoading, promosLoading, bannersLoading]);

  if (categoriesLoading || promosLoading || bannersLoading || userLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isExpanded ? "ml-64" : "ml-20"}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {userData?.name || 'Admin'}!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total Activities</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.activities}</p>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total Categories</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.categories}</p>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Active Promos</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.promos}</p>
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total Banners</h3>
            <p className="text-3xl font-bold text-white mt-2">{stats.banners}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;