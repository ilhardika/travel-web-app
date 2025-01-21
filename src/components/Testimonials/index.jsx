import React from "react";
import Slider from "react-slick";
import { useTestimonials } from "../../hooks/useTestimonials";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Import slick CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomPrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
    >
      <ChevronLeft className="w-6 h-6 text-blue-600" />
    </button>
  );
}

function CustomNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
    >
      <ChevronRight className="w-6 h-6 text-blue-600" />
    </button>
  );
}

function Testimonials() {
  const { testimonials } = useTestimonials();

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
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Hear From Our <span className="text-blue-600">Travelers</span>
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from people who've experienced the magic of TravelBook
          </p>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4">
                <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl border border-gray-100">
                  <div className="p-6 relative z-10">
                    <Quote className="absolute top-4 left-4 text-blue-100 w-16 h-16 -z-10" />

                    <p className="text-gray-700 italic mb-6 relative z-20 min-h-[120px]">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-100"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <div className="flex items-center text-gray-600">
                          <testimonial.icon className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-sm">
                            {testimonial.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-4">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Star
                          key={index}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
