// pages/DestinationsPage.jsx
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDestinations } from "../../hooks/useDestinations";
import { useCategories } from "../../hooks/useCategories";
import Navbar from "../../components/Navbar";

const DestinationsPage = () => {
  const { categoryName } = useParams();
  const { destinations, loading, error } = useDestinations(categoryName);
  const { categories, loading: categoriesLoading } = useCategories();

  // Tampilan loading untuk categories
  if (categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Tampilan error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // Tampilan loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {categoryName
              ? `Destinations - ${
                  categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                }`
              : "All Destinations"}
          </h1>

          {/* Kategori Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            <Link
              to="/destinations"
              className={`px-4 py-2 rounded-lg shrink-0 ${
                !categoryName
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/destinations/${category.name.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg shrink-0 ${
                  categoryName?.toLowerCase() === category.name.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {destinations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No destinations found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={destination.imageUrls[0]}
                  alt={destination.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {destination.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      Rp {destination.price.toLocaleString("id-ID")}
                    </span>
                    <Link
                      to={`/destination/${destination.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Detail
                    </Link>
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

export default DestinationsPage;
