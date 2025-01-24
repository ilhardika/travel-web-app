import React from "react";
import { ChevronRight } from "lucide-react";

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
  >
    <ChevronRight className="w-6 h-6 text-blue-600" />
  </button>
);

export default CustomNextArrow;
