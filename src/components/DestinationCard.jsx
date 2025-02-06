import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

// Komponen kartu destinasi
const DestinationCard = ({ destination }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={destination.imageUrls[0]}
          alt={destination.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">{destination.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">
          {destination.title}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {destination.city}, {destination.province}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="text-blue-600 font-bold">
            {destination.price_discount > 0 ? (
              <>
                <span className="line-through text-gray-400 text-sm">
                  Rp {destination.price.toLocaleString("id-ID")}
                </span>
                <br />
                <span className="text-blue-600">
                  Rp {destination.price_discount.toLocaleString("id-ID")}
                </span>
              </>
            ) : (
              <span>Rp {destination.price.toLocaleString("id-ID")}</span>
            )}
          </div>

          <Link
            to={`/destination/${destination.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
