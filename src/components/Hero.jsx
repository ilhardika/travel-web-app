import { useState, useEffect } from "react";
import { ArrowRight, Map, Users } from "lucide-react";
import { Link } from "react-router-dom";
import useBanners from "../hooks/useBanners";

const AnimatedNumber = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - percentage, 3);

      setCount(Math.floor(end * easeOutQuad));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { banners, loading } = useBanners();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Banner Slider */}
      <div className="absolute inset-0 z-0">
        {loading || banners.length === 0 ? (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-blue-900" />
        ) : (
          banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 
                ${index === currentBanner ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 to-blue-900/80" />
            </div>
          ))
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small Highlight Text */}
          <div className="inline-block animate-fade-in">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              ✨ Temukan Petualangan Baru
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-fade-up-1">
              Jelajahi Keindahan
            </span>
            <br />
            <span className="inline-block animate-fade-up-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Indonesia
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-white/80 mb-8 animate-fade-up-3">
            Dari gunung berapi yang megah hingga pantai yang mempesona, temukan
            destinasi impianmu bersama kami
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up-4">
            <Link
              to={"/destinations"}
              className="group px-8 py-4 bg-white rounded-xl text-blue-950 font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Mulai Petualangan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={"/destinations"}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-20 text-white/90 animate-fade-up-5">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
              <Map className="w-8 h-8 mx-auto mb-4 text-blue-400 stroke-2" />
              <div className="text-3xl font-bold mb-1">
                {isVisible && <AnimatedNumber end={10} />}+
              </div>
              <div className="text-sm text-white/70">Destinasi Wisata</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
              <Users className="w-8 h-8 mx-auto mb-4 text-purple-400 stroke-2" />
              <div className="text-3xl font-bold mb-1">
                {isVisible && <AnimatedNumber end={10000} />}+
              </div>
              <div className="text-sm text-white/70">Pelanggan Puas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent" />
    </div>
  );
};

export default Hero;
