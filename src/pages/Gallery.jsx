import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles,
  ZoomIn,
  Image as ImageIcon,
  Grid,
  List
} from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Gallery Images - Replace with your actual images
  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop", size: "large", title: "The Vows" },
    { id: 2, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=800&fit=crop", size: "square", title: "First Look" },
    { id: 3, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1000&fit=crop", size: "portrait", title: "The Rings" },
    { id: 4, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop", size: "wide", title: "Wedding Decor" },
    { id: 5, url: "https://images.unsplash.com/photo-1511795409674-a3212fa0ad27?w=800&h=1000&fit=crop", size: "portrait", title: "Bridal Portrait" },
    { id: 6, url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=800&fit=crop", size: "square", title: "Together" },
    { id: 7, url: "https://images.unsplash.com/photo-1475499112825-d6f2f3c2bd89?w=800&h=1200&fit=crop", size: "tall", title: "Groom Portrait" },
    { id: 8, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop", size: "wide", title: "Wedding Details" },
    { id: 9, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop", size: "portrait", title: "The Altar" },
    { id: 10, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1200&fit=crop", size: "tall", title: "Bridal Details" },
    { id: 11, url: "https://images.unsplash.com/photo-1511795409674-a3212fa0ad27?w=800&h=800&fit=crop", size: "square", title: "Happiness" },
    { id: 12, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop", size: "portrait", title: "Flower Arrangements" },
    { id: 13, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop", size: "square", title: "The Celebration" },
    { id: 14, url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop", size: "wide", title: "Venue" },
    { id: 15, url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop", size: "tall", title: "The Dress" },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Dots Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <div className="relative py-12 sm:py-16 md:py-20 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-4 h-4 text-gray-400" />
            <div className="w-8 h-px bg-gray-300" />
            <Sparkles className="w-4 h-4 text-gray-400" />
            <div className="w-8 h-px bg-gray-300" />
            <Camera className="w-4 h-4 text-gray-400" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            PRECIOUS MOMENTS
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Our Gallery
          </p>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            Capturing the beautiful moments of our special day
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-full border border-gray-200 p-1 bg-white shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4 inline mr-2" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4 inline mr-2" />
              List
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="max-w-[340px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-min'
                : 'grid-cols-1 gap-4'
            }`}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                data-id={image.id}
                className={`gallery-item relative group cursor-pointer overflow-hidden rounded-xl bg-gray-50 border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  viewMode === 'grid' ? getSizeClass(image.size) : ''
                }`}
                onClick={() => openLightbox(image, index)}
              >
                <div className={`relative w-full ${
                  viewMode === 'grid' 
                    ? getMobileHeight(image.size) 
                    : 'h-64 sm:h-80'
                } overflow-hidden`}>
                  <img
                    src={image.url}
                    alt={image.title || `Gallery ${image.id}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-teal-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white mb-2" />
                    {image.title && (
                      <span className="text-white text-sm font-light">{image.title}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Image Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          {galleryImages.length} precious memories
        </motion.div>

        {/* Decorative Bottom */}
        <div className="flex justify-center mt-10 md:mt-14">
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-gray-300" />
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <div className="w-12 h-px bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title || `Gallery ${selectedImage.id}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              {selectedImage.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <p className="text-white text-lg font-light">{selectedImage.title}</p>
                </div>
              )}
              <div className="absolute top-4 left-4 text-white/60 text-sm">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;