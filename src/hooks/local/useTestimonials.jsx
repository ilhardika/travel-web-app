import { useState } from "react";
import {
  UserCircle2,
  Plane,
  MapPin,
  UserCheck,
  Compass,
  Globe,
} from "lucide-react";

export const useTestimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "TravelBook made my trip planning so easy and intuitive. I found the perfect destinations with just a few clicks!",
      location: "Bali, Indonesia",
      rating: 5,
      icon: Plane,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "The activities I booked through TravelBook were absolutely incredible. Highly recommended for adventure seekers!",
      location: "Tokyo, Japan",
      rating: 5,
      icon: MapPin,
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      quote:
        "Exceptional customer service and a wide range of travel options. TravelBook has become my go-to travel companion.",
      location: "Paris, France",
      rating: 4,
      icon: UserCircle2,
    },
    {
      id: 4,
      name: "Emily Wong",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "Incredible travel experiences curated perfectly. Every detail was thought out, making my journey unforgettable.",
      location: "Singapore",
      rating: 5,
      icon: Compass,
    },
    {
      id: 5,
      name: "Carlos Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      quote:
        "TravelBook understands travelers. Their personalized recommendations are spot on and save me so much time!",
      location: "Mexico City",
      rating: 4,
      icon: Globe,
    },
    {
      id: 6,
      name: "Sarah Kim",
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      quote:
        "From booking to travel, everything was seamless. I'll definitely use TravelBook for all my future trips!",
      location: "Seoul, Korea",
      rating: 5,
      icon: UserCheck,
    },
  ]);

  return { testimonials };
};
