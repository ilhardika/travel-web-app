import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useActivity from "../../hooks/useActivity"; // Changed from useDestinations
import useCategories from "../../hooks/useCategories";
import Navbar from "../../components/Navbar";
import { MapPin, Star, Users, Clock } from "lucide-react";

const ActivityCard = ({ activity }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        {!imageError && activity.imageUrls[0] ? (
          <img
            src={activity.imageUrls[0]}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-md">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="text-sm font-semibold">{activity.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Main Content */}
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {activity.title}
          </h2>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {activity.city}, {activity.province}
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {activity.description}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{activity.total_reviews} reviews</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>4 hours</span>
            </div>
          </div>
        </div>

        {/* Price and Action Section - Always at Bottom */}
        <div className="flex justify-between items-center pt-4 border-t mt-auto">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-lg font-bold text-blue-600">
              IDR {activity.price.toLocaleString("id-ID")}
            </p>
          </div>
          <Link
            to={`/activity/detail/${activity.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const CategoryFilter = ({ categories, categoryName }) => {
  const scrollContainerRef = React.useRef(null);

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <Link
          to="/activity"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${
              !categoryName
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/activity/${category.name.toLowerCase()}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${
                categoryName?.toLowerCase() === category.name.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const DestinationsPage = () => {
  const { categoryName } = useParams();
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useActivity();
  const { categories, loading: categoriesLoading } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");

  // Show loading state
  if (activitiesLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (activitiesError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            Error: {activitiesError}
          </div>
        </div>
      </div>
    );
  }

  // Filter activities
  const filteredActivities =
    activities?.filter((activity) => {
      const matchesSearch = activity.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !categoryName ||
        categories?.find(
          (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
        )?.id === activity.categoryId;
      return matchesSearch && matchesCategory;
    }) || [];

  // Filter out activities without images
  const validDestinations = filteredActivities.filter(
    (dest) => dest.imageUrls && dest.imageUrls.length > 0 && dest.imageUrls[0]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-5rem)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {categoryName
                ? `${
                    categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                  } Activities`
                : "All Activities"}
            </h1>
            <p className="text-gray-600">
              Discover amazing experiences and adventures
            </p>
          </div>

          {/* Category Filter */}
          <div className="sticky top-20 bg-gray-50 py-4 z-40 -mx-4 px-4">
            <CategoryFilter
              categories={categories}
              categoryName={categoryName}
            />
          </div>
        </div>

        {/* Activities Grid Section - Fixed Position */}
        <div className="flex-1 bg-white">
          <div className="container mx-auto px-4 py-8">
            {validDestinations.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No activities found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {validDestinations.map((destination) => (
                  <ActivityCard key={destination.id} activity={destination} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;
