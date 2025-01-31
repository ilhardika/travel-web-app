import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import {
  PencilIcon,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useUserManagement from "../../hooks/useUserManagement";
import useAuth from "../../hooks/useAuth";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { users: initialUsers, loading, error } = useUserManagement();
  const { updateUserRole } = useAuth();
  const [users, setUsers] = useState([]); // Local state for users
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Default to true

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination calculations
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRoleUpdate = async () => {
    if (selectedUser) {
      console.log(
        `Updating role for user ${selectedUser.id} to ${selectedUser.role}`
      );
      const success = await updateUserRole(selectedUser.id, selectedUser.role);
      if (success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, role: selectedUser.role }
              : user
          )
        );
        setShowEditModal(false);
        setSelectedUser(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h3 className="text-xl">Error: {error}</h3>
        </div>
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
          <h1 className="text-3xl font-bold text-white">Manajemen Pengguna</h1>
          <p className="text-gray-400">Kelola data pengguna aplikasi</p>
        </div>

        {/* Filter and Search Section */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pengguna..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentUsers?.map((user) => (
                <tr key={user.id} className="text-gray-300">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModal(true);
                      }}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {[...Array(totalPages)]
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1)
            )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Edit Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-white mb-4">
                Edit User Role
              </h2>
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleRoleUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
