import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles,
  ZoomIn,
  Download,
  Grid,
  List
} from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [isDownloading, setIsDownloading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleItems, setVisibleItems] = useState([]);

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

  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    imageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

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

  const downloadImage = useCallback(async (image, e) => {
    e.stopPropagation();
    setIsDownloading(true);
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title || 'wedding'}-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to download image');
    } finally {
      setIsDownloading(false);
    }
  }, []);

  // ZOOM IN EFFECT - Starts small and grows to full size
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6,
      y: 60,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1.2,
        duration: 1.2,
      },
    },
  };

  // Image fade-in from white with zoom
  const imageFadeVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.7,
    },
    visible: (loaded) => ({
      opacity: loaded ? 1 : 0,
      scale: loaded ? 1 : 0.7,
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 0.1,
      },
    }),
  };

  const whiteOverlayVariants = {
    hidden: { opacity: 1 },
    visible: (loaded) => ({
      opacity: loaded ? 0 : 1,
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 0.1,
      },
    }),
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 25, mass: 0.8, duration: 0.8 },
    },
    exit: {
      opacity: 0,
      scale: 0.88,
      y: 30,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const floatingHeart = {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [-6, 6, -6],
      scale: [1, 1.05, 1],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const getSizeClass = (size) => {
    switch(size) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'wide': return 'md:col-span-2';
      case 'tall': return 'md:row-span-2';
      default: return '';
    }
  };

  const getMobileHeight = (size) => {
    switch(size) {
      case 'large': return 'h-72 sm:h-80';
      case 'wide': return 'h-56 sm:h-64';
      case 'tall': return 'h-80 sm:h-96';
      case 'portrait': return 'h-64 sm:h-72';
      default: return 'h-56 sm:h-64';
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #111827 0.8px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
      </div>

      <div className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div variants={floatingHeart} initial="initial" animate="animate">
              <Camera className="w-6 h-6 text-teal-500" />
            </motion.div>
            <motion.div variants={floatingHeart} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </motion.div>
            <motion.div variants={floatingHeart} initial="initial" animate="animate" transition={{ delay: 0.6 }}>
              <Camera className="w-6 h-6 text-teal-500" />
            </motion.div>
          </div>
          <h2 className="text-teal-600 text-sm font-light tracking-[4px] uppercase mb-3">PRECIOUS MOMENTS</h2>
          <p className="text-4xl sm:text-5xl md:text-6xl font-light text-zinc-800 tracking-tight">
            Our Gallery
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mt-5" />
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-white rounded-3xl p-1.5 shadow-sm border border-zinc-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2.5 rounded-3xl text-sm flex items-center gap-2 transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/30' 
                  : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Grid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-5 py-2.5 rounded-3xl text-sm flex items-center gap-2 transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/30' 
                  : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid - ZOOM IN EFFECT */}
        <div className="max-w-7xl mx-auto">
          <div className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-min' 
              : 'grid-cols-1 gap-6'
          }`}>
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                ref={el => imageRefs.current[index] = el}
                data-index={index}
                variants={itemVariants}
                initial="hidden"
                animate={visibleItems.includes(index) ? "visible" : "hidden"}
                whileHover={{ 
                  scale: 1.04, 
                  y: -6,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.97 }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-white border border-white/50 ${
                  viewMode === 'grid' ? getSizeClass(image.size) : ''
                }`}
                onClick={() => openLightbox(image, index)}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'grid' ? getMobileHeight(image.size) : 'h-72 sm:h-96'
                }`}>
                  {/* Image with zoom-in from small */}
                  <motion.img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    custom={loadedImages[image.id]}
                    variants={imageFadeVariants}
                    initial="hidden"
                    animate="visible"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  
                  {/* White overlay that fades out */}
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    custom={loadedImages[image.id]}
                    variants={whiteOverlayVariants}
                    initial="hidden"
                    animate="visible"
                  />

                  {/* Zoom indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                      <ZoomIn className="w-8 h-8 text-white mb-3 drop-shadow-lg" />
                      {image.title && (
                        <p className="text-white text-sm sm:text-base font-light tracking-wide px-4 text-center drop-shadow-lg">
                          {image.title}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-14 text-zinc-400 text-sm flex items-center justify-center gap-4"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          {galleryImages.length} Timeless Memories
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-20"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.05 }}
              onClick={(e) => { e.stopPropagation(); downloadImage(selectedImage, e); }}
              disabled={isDownloading}
              className="absolute top-4 right-20 sm:top-6 sm:right-20 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-20 disabled:opacity-50"
            >
              <Download className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-20 hidden sm:block"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </motion.button>

            <motion.button
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-20 hidden sm:block"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </motion.button>

            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-[95vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-white rounded-2xl"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              {selectedImage.title && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-white/95 text-zinc-800 px-8 py-3 rounded-2xl text-center shadow-lg text-lg font-light whitespace-nowrap"
                >
                  {selectedImage.title}
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 left-4 text-white/50 text-sm font-light bg-black/30 px-4 py-2 rounded-full"
              >
                {currentIndex + 1} / {galleryImages.length}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;