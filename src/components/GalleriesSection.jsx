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
import { featured_images } from '../data/images';

const GalleriesSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const navigate = useNavigate();

  const galleryImages = featured_images;

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

  // --- EFFECT VARIANTS COPIED DIRECTLY FROM YOUR ORIGINAL CODE ---
  
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
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ 
                  scale: 1.04, 
                  y: -6,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group cursor-pointer break-inside-avoid mb-4 overflow-hidden rounded-3xl shadow-lg bg-white"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden bg-white">
                  {/* Image with zoom-in from small */}
                  <motion.img
                    src={image.img}
                    alt={`Wedding moment ${image.id}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    custom={loadedImages[image.id]}
                    variants={imageFadeVariants}
                    initial="hidden"
                    animate="visible"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  
                  {/* White overlay that fades out */}
                  <motion.div 
                    className="absolute inset-0 bg-white pointer-events-none"
                    custom={loadedImages[image.id]}
                    variants={whiteOverlayVariants}
                    initial="hidden"
                    animate="visible"
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

      {/* Lightbox Modal using your exact variations */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
            <div className="absolute inset-0" onClick={closeLightbox} />

            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur hidden md:block"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur hidden md:block"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            <motion.div
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-[92vw] max-h-[92vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src={selectedImage.img}
                  alt="Wedding moment"
                  className="max-w-full max-h-[88vh] object-contain rounded-2xl"
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
              </div>
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