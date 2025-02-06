import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil token dari localStorage untuk cek autentikasi
  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${id},
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [id]);

  const handleAddToCart = (activity) => {
    if (!isAuthenticated) {
      alert("Anda harus login terlebih dahulu untuk menambahkan ke keranjang.");
      navigate("/login");
      return;
    }

    // Mengirim langsung object literal tanpa menggunakan variabel 'payload'
    fetch("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: Bearer ${token},
      },
      body: JSON.stringify({ activityId: activity.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update context cart (misalnya dengan fungsi addToCart)
          addToCart({ activityId: activity.id });
          alert(${activity.title} berhasil ditambahkan ke keranjang.);
        } else {
          console.error("Response error:", data);
          alert("Gagal menambahkan item ke keranjang.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Gagal menambahkan item ke keranjang.");
      });
  };

  if (loading) {
    return <p className="my-8 text-center">Loading activities...</p>;
  }

  if (error) {
    return <p className="my-8 text-center text-red-500">Error: {error}</p>;
  }

  return (
    <section className="container px-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Activities in This Category
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative overflow-hidden shadow-xl group rounded-xl"
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url(${
                  activity.imageUrls?.[0] || "https://via.placeholder.com/300x200"
                })`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="relative z-10 p-6 text-center text-white">
              <h3 className="text-xl font-bold">
                {activity.title || "Activity Name"}
              </h3>
              <p className="mt-2">
                Price: Rp {activity.price.toLocaleString()}
              </p>
              <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
                onClick={() => handleAddToCart(activity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryDetail