import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Edit,
  LogOut,
  ShieldEllipsis,
  MapPin,
  Calendar,
  CreditCard,
  ChevronRight,
  Clock,
  Heart,
} from "lucide-react";
import useTransactions from "../hooks/useTransactions";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { transactions, loading: transactionsLoading } = useTransactions();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect ke halaman login jika tidak ada token
        navigate("/signin");
        return;
      }

      try {
        const response = await fetch(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data profil");
        }

        const data = await response.json();
        setUserData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Redirect ke halaman login
    navigate("/signin");
  };

  const handleEditProfile = () => {
    // Navigasi ke halaman edit profil (bisa Anda buat nanti)
    navigate("/edit-profile");
  };

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

  const recentActivities = [
    {
      id: 1,
      title: "Booked Bali Adventure Tour",
      date: "2024-02-15",
      status: "Completed",
    },
    {
      id: 2,
      title: "Reserved Beach Resort",
      date: "2024-02-10",
      status: "Pending",
    },
    // Add more activities as needed
  ];

  const savedDestinations = [
    {
      id: 1,
      name: "Bali Beach Resort",
      location: "Bali, Indonesia",
      image: "https://source.unsplash.com/800x600/?bali,beach",
    },
    {
      id: 2,
      name: "Mount Bromo",
      location: "East Java, Indonesia",
      image: "https://source.unsplash.com/800x600/?bromo",
    },
    // Add more destinations as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-blue-600  rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full border-4 border-white/30 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {userData.name}
              </h1>
              <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                {userData.city || "Jakarta, Indonesia"}
              </p>
            </div>
            <div className="md:ml-auto flex gap-4">
              <button
                onClick={() => navigate("/edit-profile")}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{userData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">
                    {userData.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <ShieldEllipsis className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium capitalize">{userData.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <button
                  onClick={() => navigate('/transactions')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>

              {transactionsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-gray-200 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions yet</p>
                  <button
                    onClick={() => navigate('/activity')}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Explore Activities
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
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
                          Transaction #{transaction.id}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          IDR {(transaction.totalPrice || 0).toLocaleString('id-ID')}
                        </p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          transaction.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-700'
                            : transaction.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {transaction.status || 'PENDING'}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
