import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBanners } from '../hooks/useBanners';

// Komponen slider banner
const BannerSlider = ({ title, description }) => {
  const { banners, loading } = useBanners();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mengatur interval untuk perpindahan slide otomatis
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  // Fungsi untuk slide berikutnya
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  // Fungsi untuk slide sebelumnya
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Menampilkan pesan loading jika banner belum dimuat
  if (loading || banners.length === 0) {
    return (
      <div className="h-[400px] bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Loading banners...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[400px] overflow-hidden group">
      {/* Gambar Banner */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Konten */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-white/90">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Navigasi */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indikator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all
              ${index === currentSlide ? 'bg-white w-4' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
