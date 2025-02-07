/* ===== IMPORT DEPENDENCIES ===== */
// Import hooks React yang diperlukan
import { useEffect, useState } from "react";
// Import komponen dan fungsi lainnya
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
  /* ===== INISIALISASI HOOKS DAN STATE ===== */
  // Mengambil data dan fungsi dari custom hook aktivitas
  const {
    activities, // Data aktivitas dari API
    loading, // Status loading saat fetch data
    createActivity, // Fungsi untuk membuat aktivitas baru
    updateActivity, // Fungsi untuk memperbarui aktivitas
    deleteActivity, // Fungsi untuk menghapus aktivitas
    refreshActivities, // Fungsi untuk memuat ulang data
  } = useActivities();

  // Mengambil data kategori untuk dropdown pilihan
  const { categories } = useCategories();

  /* ===== STATE MANAGEMENT ===== */
  // State untuk kontrol UI
  const [isExpanded, setIsExpanded] = useState(true); // Mengatur lebar sidebar
  const [searchTerm, setSearchTerm] = useState(""); // Input pencarian
  const [filteredActivities, setFilteredActivities] = useState([]); // Hasil filter
  const [showForm, setShowForm] = useState(false); // Tampilkan/sembunyikan form

  // State untuk form input dengan nilai default kosong
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

  /* ===== PAGINATION STATE ===== */
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 10; // Jumlah item per halaman
  const navigate = useNavigate(); // Fungsi untuk navigasi

  /* ===== EFFECTS & FILTERS ===== */
  // Effect untuk memfilter aktivitas berdasarkan kata kunci pencarian
  useEffect(() => {
    setFilteredActivities(
      activities.filter((activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, activities]);

  /* ===== EVENT HANDLERS ===== */
  // Menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Menangani submit form (tambah/edit)
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

  // Mengisi form untuk edit aktivitas
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

  // Menangani perubahan halaman pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Membuka form untuk tambah aktivitas baru
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

  /* ===== PAGINATION CALCULATIONS ===== */
  // Menghitung total halaman dan data yang ditampilkan
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  /* ===== RENDER CONDITIONS ===== */
  // Tampilan loading saat mengambil data
  if (loading) {
    return (
      <div className="min-h-full bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  /* ===== MAIN RENDER ===== */
  return (
    <div className="min-h-screen w-full bg-gray-900 flex">
      {/* Sidebar dengan toggle ekspansi */}
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Main content area */}
      <div className={`w-full p-4 ${isExpanded ? "ml-64" : "pl-14"}`}>
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Manajemen Aktivitas</h1>
          <p className="text-gray-400">Kelola semua aktivitas di sini.</p>
        </div>

        {/* Search and Add button section */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 mr-12 lg:mr-0">
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

        {/* Modal form untuk tambah/edit */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-[90%] overflow-y-auto">
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

        {/* Table section */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
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
        </div>

        {/* Pagination controls */}
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
