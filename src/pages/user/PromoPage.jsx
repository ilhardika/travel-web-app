import usePromos from "../../hooks/usePromo";
import Navbar from "../../components/Navbar";

// Komponen untuk menampilkan halaman promo
const PromoPage = () => {
  // Mengambil data promo menggunakan custom hook
  const { promos, loading, error } = usePromos();

  // Menampilkan animasi loading saat data sedang diambil
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Menampilkan pesan error jika terjadi kesalahan
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Promo Spesial</h1>

        {/* Menampilkan pesan jika tidak ada promo atau daftar promo yang tersedia */}
        {promos.length === 0 ? (
          // Pesan saat tidak ada promo
          <div className="text-center text-gray-500 py-8">
            Tidak ada promo saat ini.
          </div>
        ) : (
          // Grid layout untuk menampilkan kartu promo
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promos.map((promo) => (
              // Kartu promo individual
              <div
                key={promo.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                {/* Gambar banner promo */}
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-48 object-cover"
                />

                {/* Informasi detail promo */}
                <div className="p-4">
                  {/* Judul promo */}
                  <h2 className="text-xl font-semibold mb-2">{promo.title}</h2>

                  {/* Deskripsi promo */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {promo.description}
                  </p>

                  {/* Syarat dan ketentuan */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {promo.terms_condition.replace(/<\/?p>/g, "")}
                  </p>

                  {/* Kode promo */}
                  <h2 className="text-xl font-semibold my-2">
                    Promo Code : {promo.promo_code}
                  </h2>

                  {/* Informasi diskon dan minimum pembelian */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-green-600 font-bold text-lg">
                      Diskon Rp.{promo.promo_discount_price}
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      Minimum Claim Rp.{promo.minimum_claim_price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoPage;
