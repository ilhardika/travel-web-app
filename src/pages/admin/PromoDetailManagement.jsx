import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePromos from "../../hooks/usePromo";
import AdminSidebar from "../../components/AdminSidebar";

const PromoDetailManagement = () => {
  const { promoId } = useParams();
  const { promos, loading: promoLoading } = usePromos();
  const [promo, setPromo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (promos && promoId) {
      const selectedPromo = promos.find((p) => p.id === promoId);
      setPromo(selectedPromo);
    }
  }, [promos, promoId]);

  if (promoLoading || !promo) {
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
          <h1 className="text-3xl font-bold text-white">Detail Promo</h1>
          <p className="text-gray-400">Informasi detail tentang promo.</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white">{promo.title}</h2>
          <p className="text-gray-400 mt-2">{promo.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <img
              src={promo.imageUrl}
              alt={`Promo Image`}
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Kode Promo:</span> {promo.promo_code}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Diskon Promo:</span> {promo.promo_discount_price}
              </p>
              <p className="text-gray-400 mt-2">
                <span className="font-bold">Minimal Klaim:</span> {promo.minimum_claim_price}
              </p>
              <h3 className="text-xl font-bold text-white mt-4">Syarat dan Ketentuan</h3>
              <div
                className="text-gray-400 mt-2"
                dangerouslySetInnerHTML={{ __html: promo.terms_condition }}
              />
            </div>
          </div>
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

export default PromoDetailManagement;
