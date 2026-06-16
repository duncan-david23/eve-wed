import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles,
  ZoomIn 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GalleriesSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop" },
    { id: 2, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=800&fit=crop" },
    { id: 3, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop" },
    { id: 4, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop" },
    { id: 5, url: "https://images.unsplash.com/photo-1511795409674-a3212fa0ad27?w=800&h=1000&fit=crop" },
    { id: 6, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop" },
    { id: 7, url: "https://images.unsplash.com/photo-1475499112825-d6f2f3c2bd89?w=800&h=1200&fit=crop" },
    { id: 8, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop" },
    { id: 9, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop" },
    { id: 10, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop" },
    { id: 11, url: "https://images.unsplash.com/photo-1511795409674-a3212fa0ad27?w=800&h=800&fit=crop" },
    { id: 12, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop" }
  ];

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
  }, [currentIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateImage, closeLightbox]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #111827 0.8px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
      </div>

      <div className="relative py-20 sm:py-24 md:py-28 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Camera className="w-6 h-6 text-teal-500" />
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <Camera className="w-6 h-6 text-teal-500" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          
          <h2 className="text-teal-600 text-sm font-light tracking-[4px] uppercase mb-3">CAPTURED MOMENTS</h2>
          <p className="text-4xl sm:text-5xl md:text-6xl font-light text-zinc-800 tracking-tight">
            Our Gallery
          </p>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto">
            Timeless memories from our love story
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.6) }}
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-pointer break-inside-avoid mb-4 overflow-hidden rounded-3xl shadow-lg"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={`Wedding moment ${image.id}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                    <div className="flex flex-col items-center">
                      <ZoomIn className="w-9 h-9 text-white mb-3 drop-shadow" />
                      <p className="text-white/90 text-sm tracking-widest font-light">View Moment</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Full Gallery Button */}
        <div className="flex justify-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/gallery')}
            className="group flex items-center gap-3 px-10 py-4 bg-white border border-zinc-200 hover:border-teal-300 rounded-2xl text-zinc-700 hover:text-teal-700 transition-all shadow-sm hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="font-light tracking-wider">EXPLORE FULL GALLERY</span>
          </motion.button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95" onClick={closeLightbox}>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur hidden md:block"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur hidden md:block"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-w-[92vw] max-h-[92vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt="Wedding moment"
                className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-8 text-white/70 text-sm font-light tracking-widest">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleriesSection;