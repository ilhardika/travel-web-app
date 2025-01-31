import { ChevronLeft } from "lucide-react";

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
  >
    <ChevronLeft className="w-6 h-6 text-blue-600" />
  </button>
);

export default CustomPrevArrow;
