import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useActivity from "../../hooks/useActivity";
import AdminSidebar from "../../components/AdminSidebar";

const ActivityDetailManagement = () => {
  const { activityId } = useParams();
  const { activity, loading: activityLoading } = useActivity(activityId);
  const [isExpanded, setIsExpanded] = useState(true);

  if (activityLoading) {
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
          <h1 className="text-3xl font-bold text-white">Activity Detail</h1>
          <p className="text-gray-400">Detailed information about the activity.</p>
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white">{activity.title}</h2>
          <p className="text-gray-400 mt-2">{activity.description}</p>
          <p className="text-gray-400 mt-2">Category: {activity.category.name}</p>
          <p className="text-gray-400 mt-2">Price: {activity.price}</p>
          <p className="text-gray-400 mt-2">Price Discount: {activity.priceDiscount}</p>
          <p className="text-gray-400 mt-2">Rating: {activity.rating}</p>
          <p className="text-gray-400 mt-2">Total Reviews: {activity.totalReviews}</p>
          <p className="text-gray-400 mt-2">Address: {activity.address}</p>
          <p className="text-gray-400 mt-2">Province: {activity.province}</p>
          <p className="text-gray-400 mt-2">City: {activity.city}</p>
          <div className="text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: activity.facilities }} />
          <div className="text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: activity.locationMaps }} />
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {activity.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Activity Image ${index + 1}`} className="rounded-lg" />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 bg-gray-500 text-white rounded"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailManagement;
