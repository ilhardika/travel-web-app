import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  EyeIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useActivities from "../../hooks/useActivity";
import useCategories from "../../hooks/useCategory";
import AdminSidebar from "../../components/AdminSidebar";

const ActivityManagement = () => {
  const {
    activities,
    loading: activitiesLoading,
    createActivity,
    updateActivity,
    deleteActivity,
    refreshActivities,
  } = useActivities();
  const { categories } = useCategories();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    categoryId: "",
    price: "",
    priceDiscount: "",
    rating: "",
    totalReviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    imageUrls: [],
    locationMaps: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredActivities(
      activities.filter((activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, activities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId || !formData.title) {
      alert("Category and Title are required!");
      return;
    }
    const success = formData.id
      ? await updateActivity(formData.id, formData)
      : await createActivity(formData);
    if (success) {
      setShowForm(false);
      await refreshActivities();
    }
  };

  const handleEdit = (activity) => {
    setFormData({
      id: activity.id,
      title: activity.title,
      description: activity.description,
      categoryId: activity.categoryId,
      price: activity.price,
      priceDiscount: activity.price_discount,
      rating: activity.rating,
      totalReviews: activity.total_reviews,
      facilities: activity.facilities,
      address: activity.address,
      province: activity.province,
      city: activity.city,
      imageUrls: activity.imageUrls,
      locationMaps: activity.location_maps,
    });
    setShowForm(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddActivity = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      categoryId: "",
      price: "",
      priceDiscount: "",
      rating: "",
      totalReviews: "",
      facilities: "",
      address: "",
      province: "",
      city: "",
      imageUrls: [],
      locationMaps: "",
    });
    setShowForm(true);
  };

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  if (activitiesLoading) {
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
          <h1 className="text-3xl font-bold text-white">Manajemen Aktivitas</h1>
          <p className="text-gray-400">Kelola semua aktivitas di sini.</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari aktivitas..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleAddActivity}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Tambah Aktivitas
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-gray-800 p-6 rounded-lg w-96 max-h-[90%] overflow-y-auto">
              <h2 className="text-xl font-bold text-white mb-4">
                {formData.id ? "Edit Aktivitas" : "Tambah Aktivitas"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="text-white">Judul</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Judul"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                      maxLength={20}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Kategori</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="p-2 rounded bg-gray-700 text-white w-full"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="text-white">Deskripsi</label>
                    <textarea
                      name="description"
                      placeholder="Deskripsi"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Harga</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Harga"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Harga Diskon</label>
                    <input
                      type="number"
                      name="priceDiscount"
                      placeholder="Harga Diskon"
                      value={formData.priceDiscount}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      placeholder="Rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Total Ulasan</label>
                    <input
                      type="number"
                      name="totalReviews"
                      placeholder="Total Ulasan"
                      value={formData.totalReviews}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="text-white">Fasilitas</label>
                    <textarea
                      name="facilities"
                      placeholder="Fasilitas"
                      value={formData.facilities}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Alamat</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Alamat"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Provinsi</label>
                    <input
                      type="text"
                      name="province"
                      placeholder="Provinsi"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-white">Kota</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Kota"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="text-white">
                      URL Gambar (dipisahkan koma)
                    </label>
                    <input
                      type="text"
                      name="imageUrls"
                      placeholder="URL Gambar (dipisahkan koma)"
                      value={formData.imageUrls.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          imageUrls: e.target.value.split(", "),
                        })
                      }
                      className="p-2 rounded w-full"
                    />
                  </div>
                  <div className="col-span-2 mb-4">
                    <label className="text-white">Peta Lokasi</label>
                    <input
                      type="text"
                      name="locationMaps"
                      placeholder="Peta Lokasi"
                      value={formData.locationMaps}
                      onChange={handleInputChange}
                      className="p-2 rounded w-full"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentActivities.map((activity) => (
                <tr key={activity.id} className="text-gray-300">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.title.length > 20
                      ? `${activity.title.substring(0, 20)}...`
                      : activity.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                    <button
                      onClick={() =>
                        navigate(`/activity-management/${activity.id}`)
                      }
                      className="text-green-400 hover:text-green-300"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(activity)}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteActivity(activity.id)}
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
      </div>
    </div>
  );
};

export default ActivityManagement;
