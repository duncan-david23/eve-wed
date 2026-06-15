import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Heart, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles,
  ZoomIn,
  Image as ImageIcon
} from 'lucide-react';

const GalleriesSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  // Gallery Images - Just ID and URL with different sizes for shapes
  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop", size: "large" },
    { id: 2, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=800&fit=crop", size: "square" },
    { id: 3, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop", size: "portrait" },
    { id: 4, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop", size: "wide" },
    { id: 5, url: "https://images.unsplash.com/photo-1511795409674-a3212fa0ad27?w=800&h=1000&fit=crop", size: "portrait" },
    { id: 6, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop", size: "square" },
    { id: 7, url: "https://images.unsplash.com/photo-1475499112825-d6f2f3c2bd89?w=800&h=1200&fit=crop", size: "tall" },
    { id: 8, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop", size: "wide" },
    { id: 9, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop", size: "portrait" },
    { id: 10, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop", size: "tall" },
    { id: 11, url: "https://images.unsplash.com/photo-1511795409674-a3212fa0ad27?w=800&h=800&fit=crop", size: "square" },
    { id: 12, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop", size: "portrait" }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id'));
            setVisibleItems(prev => [...prev, id]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateImage = useCallback((direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % galleryImages.length 
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  }, [currentIndex, galleryImages]);

  // Get size classes for desktop (different shapes)
  const getSizeClass = (size) => {
    switch(size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      default:
        return '';
    }
  };

  // Get different heights for mobile (2 columns with different shapes)
  const getMobileHeight = (size) => {
    switch(size) {
      case 'large':
        return 'h-64';
      case 'wide':
        return 'h-48';
      case 'tall':
        return 'h-72';
      case 'portrait':
        return 'h-56';
      case 'square':
        return 'h-48';
      default:
        return 'h-48';
    }
  };

  return (
    <div className="relative bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      {/* Light Ray Effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-amber-200 rounded-full blur-[120px] opacity-20" />

      <div className="relative py-12 sm:py-16 md:py-20 px-4">
        {/* Section Header with fade-in animation */}
        <div 
          className="text-center mb-10 md:mb-14 animate-fadeIn"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-4 h-4 text-gray-400" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Sparkles className="w-4 h-4 text-gray-400" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Camera className="w-4 h-4 text-gray-400" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            PRECIOUS MOMENTS
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Our Gallery
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            Capturing the beautiful moments of our special day
          </p>
        </div>

        {/* Gallery Grid - 2 columns on mobile with different shapes */}
        <div className="max-w-[340px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-min">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                data-id={image.id}
                className={`gallery-item relative group cursor-pointer overflow-hidden rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getSizeClass(image.size)} ${
                  visibleItems.includes(image.id) ? 'animate-slideUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => openLightbox(image, index)}
              >
                <div className={`relative w-full ${getMobileHeight(image.size)} overflow-hidden`}>
                  <img
                    src={image.url}
                    alt={`Gallery ${image.id}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-rose-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white animate-pulse-once" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button with hover animation */}
        <div className="flex justify-center mt-10 md:mt-14">
          <button className="group px-8 py-3 bg-white border border-gray-300 rounded-full hover:border-rose-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <span className="text-gray-600 text-sm tracking-wide group-hover:text-rose-500 transition-colors duration-300">
              View Full Gallery
            </span>
          </button>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 animate-fadeIn"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <div
              className="relative max-w-[90vw] max-h-[90vh] animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={`Gallery ${selectedImage.id}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Decorative Bottom */}
        <div className="flex justify-center mt-10 md:mt-14">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-gray-300" />
            <ImageIcon className="w-3 h-3 text-gray-400" />
            <div className="w-12 h-px bg-gray-300" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseOnce {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-pulse-once {
          animation: pulseOnce 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GalleriesSection;