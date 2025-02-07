/* ===== IMPORT DEPENDENCIES ===== */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useActivity from "../../hooks/useActivity";
import AdminSidebar from "../../components/AdminSidebar";

const ActivityDetailManagement = () => {
  /* ===== INISIALISASI DATA ===== */
  // Mengambil ID aktivitas dari parameter URL
  const { activityId } = useParams();

  // Mengambil detail aktivitas dari API
  const { activity, loading } = useActivity(activityId);

  // State untuk mengatur lebar sidebar
  const [isExpanded, setIsExpanded] = useState(true);

  /* ===== CONDITIONAL RENDERING ===== */
  // Tampilkan loading spinner saat mengambil data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  /* ===== MAIN RENDER ===== */
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar dengan kontrol lebar */}
      <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Main content area */}
      <div className={`flex-1 p-8 ${isExpanded ? "ml-64" : "ml-20"}`}>
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Detail Aktivitas</h1>
          <p className="text-gray-400">Informasi detail tentang aktivitas.</p>
        </div>

        {/* Detail card */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          {/* Basic info */}
          <h2 className="text-2xl font-bold text-white">{activity.title}</h2>
          <p className="text-gray-400 mt-2">{activity.description}</p>

          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {activity.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Activity Image ${index + 1}`}
                className="rounded-lg"
              />
            ))}
          </div>

          {/* Detailed information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Kategori:</span>{" "}
                {activity.category.name}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Harga:</span> {activity.price}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Harga Diskon:</span>{" "}
                {activity.price_discount}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Rating:</span> {activity.rating}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Total Ulasan:</span>{" "}
                {activity.total_reviews}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Alamat:</span> {activity.address}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Provinsi:</span> {activity.province}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Kota:</span> {activity.city}
              </p>
              <h3 className="text-xl font-bold text-white mt-4">Fasilitas</h3>
              <div
                className="text-gray-400 mt-2"
                dangerouslySetInnerHTML={{ __html: activity.facilities }}
              />
              <h3 className="text-xl font-bold text-white mt-4">Peta Lokasi</h3>
              <div
                className="text-gray-400 mt-2"
                dangerouslySetInnerHTML={{ __html: activity.location_maps }}
              />
            </div>
          </div>

          {/* Back button */}
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
    </div>
  );
};

export default ActivityDetailManagement;
