import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useActivityDetail from "../hooks/useActivityDetails";
import { ChevronLeft, MapPin, Star, Calendar } from "lucide-react";

const DestinationDetailPage = () => {
  const { activityId } = useParams();
  const { activity, loading, error } = useActivityDetail(activityId);
  const [selectedImage, setSelectedImage] = useState(0);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <Link
            to="/destinations"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Destinasi
          </Link>
        </div>
      </div>
    );
  }

  // Tidak ada aktivitas
  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">
            Aktivitas tidak ditemukan
          </div>
          <Link
            to="/destinations"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Destinasi
          </Link>
        </div>
      </div>
    );
  }

  // Tambahkan logging tambahan
  useEffect(() => {
    console.log("Component mounted with Activity ID:", activityId);
    console.log("Current Activity:", activity);
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [activityId, activity, loading, error]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigasi Kembali */}
      <Link
        to="/destinations"
        className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
      >
        <ChevronLeft className="mr-2" /> Kembali ke Destinasi
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Galeri Gambar */}
        <div>
          <div className="mb-4">
            <img
              src={activity.imageUrls[selectedImage]}
              alt={activity.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Thumbnail Gambar */}
          {activity.imageUrls.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {activity.imageUrls.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                    selectedImage === index
                      ? "border-2 border-blue-500"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Informasi Detail */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{activity.title}</h1>

          {/* Kategori dan Rating */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 flex items-center">
              <MapPin className="mr-2 text-blue-600" />
              {activity.category.name}
            </span>
            <div className="flex items-center">
              <Star className="mr-2 text-yellow-500" />
              <span>
                {activity.rating} ({activity.total_reviews} reviews)
              </span>
            </div>
          </div>

          {/* Harga */}
          <div className="mb-4">
            {activity.price_discount > 0 ? (
              <div>
                <span className="text-red-500 line-through mr-2 text-xl">
                  Rp {activity.price.toLocaleString("id-ID")}
                </span>
                <span className="text-blue-600 font-bold text-2xl">
                  Rp {activity.price_discount.toLocaleString("id-ID")}
                </span>
              </div>
            ) : (
              <span className="text-blue-600 font-bold text-2xl">
                Rp {activity.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {/* Deskripsi */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
            <p className="text-gray-600">{activity.description}</p>
          </div>

          {/* Fasilitas */}
          {activity.facilities && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Fasilitas</h2>
              <p className="text-gray-600">{activity.facilities}</p>
            </div>
          )}

          {/* Lokasi */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Lokasi</h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="mr-2 text-blue-600" />
              <span>
                {activity.province}, {activity.city}
              </span>
            </div>
            <div className="mt-2 text-gray-600">{activity.address}</div>

            {/* Embedded Maps */}
            {activity.location_maps && (
              <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
                <div
                  dangerouslySetInnerHTML={{ __html: activity.location_maps }}
                  className="w-full h-64"
                />
              </div>
            )}
          </div>

          {/* Tombol Booking */}
          <div className="flex space-x-4">
            <button
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              onClick={() => {
                // Implementasi booking logic
                alert("Fitur booking akan segera hadir!");
              }}
            >
              <Calendar className="mr-2" />
              Booking Sekarang
            </button>

            <button
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
              onClick={() => {
                // Implementasi WhatsApp chat
                const phoneNumber = "+6281234567890"; // Ganti dengan nomor resmi
                const message = `Saya tertarik dengan aktivitas ${activity.title}`;
                window.open(
                  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    message
                  )}`,
                  "_blank"
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.036 5.339c-1.487 0-2.415.834-2.415 2.184v1.426h-1.445v1.979h1.445v5.095h2.145v-5.095h1.953l.252-1.979h-2.205V7.389c0-.541.295-.677.769-.677h1.436V5.339h-1.979z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.141.732 4.106 1.969 5.689l-1.255 3.72 3.809-1.24A11.893 11.893 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.964 0-3.79-.57-5.324-1.548l-3.801 1.235 1.245-3.682A9.887 9.887 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              Chat WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
