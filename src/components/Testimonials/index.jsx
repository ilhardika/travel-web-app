import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTestimonials } from "../../hooks/local/useTestimonials";
import CustomPrevArrow from "../Arrows/CustomPrevArrow";
import CustomNextArrow from "../Arrows/CustomNextArrow";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  // Mengambil data testimonials dari hook useTestimonials
  const { testimonials } = useTestimonials();

  // Pengaturan slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="mx-20 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Judul section */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Hear From Our <span className="text-blue-600">Travelers</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from people who've experienced the magic of TravelBook
          </p>
        </div>
        <div className="relative">
          {/* Slider untuk menampilkan testimonial */}
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
