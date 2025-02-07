// Mengimpor ikon ChevronRight dari pustaka lucide-react
import { ChevronRight } from "lucide-react";

// Komponen CustomNextArrow menerima properti onClick
const CustomNextArrow = ({ onClick }) => (
  // Tombol yang akan memicu fungsi onClick saat diklik
  <button
    onClick={onClick}
    // Kelas CSS untuk mengatur posisi, gaya, dan animasi tombol
    className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
  >
    <ChevronRight className="w-6 h-6 text-blue-600" />
  </button>
);

// Mengekspor komponen CustomNextArrow sebagai default
export default CustomNextArrow;
