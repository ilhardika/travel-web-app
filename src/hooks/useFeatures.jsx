import { useState } from "react";
import { Globe, Compass, Headphones, Paperclip } from "lucide-react";

export const useFeatures = () => {
  const [features] = useState([
    {
      icon: Globe,
      title: "Explore Destinations",
      description:
        "Discover breathtaking locations curated by expert travelers.",
      color: "text-blue-500",
    },
    {
      icon: Compass,
      title: "Book Activities",
      description: "Seamless booking for unique and unforgettable experiences.",
      color: "text-teal-500",
    },
    {
      icon: Headphones,
      title: "Travel Support",
      description: "24/7 personalized assistance for a worry-free journey.",
      color: "text-purple-500",
    },
    {
      icon: Paperclip,
      title: "Custom Itineraries",
      description: "Tailored travel plans that match your dream adventure.",
      color: "text-pink-500",
    },
  ]);

  return { features };
};
