import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useCategories from "../../hooks/useCategory";
import useAuth from "../../hooks/useAuth";
import AdminSidebar from "../../components/AdminSidebar";

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const { token } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCategories = categories?.filter((category) => {
    return category.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(
    (filteredCategories?.length || 0) / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    const success = await createCategory({
      name: categoryData.name,
      imageUrl: categoryData.imageUrl, // Ensure imageUrl is included
    });
    if (success) {
      setShowCreateModal(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (selectedCategory) {
      const success = await updateCategory(selectedCategory.id, {
        name: selectedCategory.name,
        imageUrl: selectedCategory.imageUrl, // Ensure imageUrl is included
      });
      if (success) {
        setShowEditModal(false);
        setSelectedCategory(null);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    const success = await deleteCategory(id);
    if (success) {
      setSelectedCategory(null);
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
          <h1 className="text-3xl font-bold text-white">Manajemen Kategori</h1>
          <p className="text-gray-400">Kelola data kategori aplikasi</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari kategori..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Tambah Kategori
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Gambar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentCategories?.map((category) => (
                <tr key={category.id} className="text-gray-300 ">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-9  text-sm font-medium h-full flex gap-4">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowEditModal(true);
                      }}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-white mb-4">
                Tambah Kategori
              </h2>
              <input
                type="text"
                placeholder="Nama Kategori"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="URL Gambar"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedCategory?.imageUrl || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    imageUrl: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => handleCreateCategory(selectedCategory)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {showEditModal && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-white mb-4">
                Edit Kategori
              </h2>
              <input
                type="text"
                placeholder="Nama Kategori"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="URL Gambar"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
                value={selectedCategory.imageUrl || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    imageUrl: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleUpdateCategory}
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

export default CategoryManagement;
