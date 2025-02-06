// Mengimpor ikon ChevronLeft dari pustaka lucide-react
import { ChevronLeft } from "lucide-react";

// Komponen CustomPrevArrow menerima properti onClick
const CustomPrevArrow = ({ onClick }) => (
  // Tombol yang akan memicu fungsi onClick saat diklik
  <button
    onClick={onClick}
    // Kelas CSS untuk mengatur posisi, gaya, dan animasi tombol
    className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
  >
    // Ikon ChevronLeft dengan ukuran dan warna yang ditentukan
    <ChevronLeft className="w-6 h-6 text-blue-600" />
  </button>
);

// Mengekspor komponen CustomPrevArrow sebagai default
export default CustomPrevArrow;
