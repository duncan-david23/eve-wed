import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, BookOpen, Sparkles, Diamond, ArrowDown } from 'lucide-react';
import HeroImage from '../assets/sample_hero_img.png';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Elegant Light Rays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      {/* Subtle Red Accent Light */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5, delay: 0.6 }}  
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20"
      >
        {/* Top Luxury Decoration */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <Diamond className="w-4 h-4 text-white/40" />
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wide">
            EVELYN
          </h1>
          
          {/* Red Heart - Rotating */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block my-4 md:my-6"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 fill-red-500/80" />
          </motion.div>
          
          <h1 className="font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wide">
            JOE
          </h1>
        </motion.div>

        {/* Invitation Line */}
        <motion.div
          variants={itemVariants}
          className="relative mt-6 md:mt-8 mb-10 md:mb-14"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-8 h-px bg-white/20" />
          <p className="text-white/40 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] font-light">
            invite you to their wedding celebration
          </p>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-8 h-px bg-white/20" />
        </motion.div>

        {/* Image Container with Overlapping Blur */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-[300px] sm:max-w-[420px] md:max-w-[580px] lg:max-w-[680px] mx-auto"
        >
          {/* Elegant Frame with Red Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-[-2px] bg-gradient-to-r from-white/20 via-red-500/20 to-white/20 rounded-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="absolute inset-[-1px] bg-black rounded-2xl"
          />
          
          {/* Hero Image */}
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            src={HeroImage}
            className="relative w-full rounded-2xl shadow-2xl grayscale-[30%] contrast-[110%] z-10"
            alt="Hero Image"
          />

          {/* Overlapping White/Gray Blur Div - Bottom of Image with Red Heart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent backdrop-blur-md rounded-b-2xl z-20"
            style={{
              height: 'clamp(70px, 18%, 110px)',
              minHeight: '70px',
            }}
          >
            <div className="h-full w-full flex flex-col items-center justify-end pb-4 px-4">
              <motion.p
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white text-sm sm:text-base md:text-lg font-light tracking-wide"
              >
                Evelyn <Heart className="inline-block w-3 h-3 sm:w-4 sm:h-4 text-red-400 fill-red-400 mx-1" /> Joe
              </motion.p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 text-white/30" />
                <span className="text-white/30 text-[10px] sm:text-xs tracking-wider">NOVEMBER 26, 2026</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Wedding Details Card - Luxury Style with Red Accents */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-14 md:mt-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 px-6 sm:px-8 md:px-10 py-6 sm:py-7 md:py-8 max-w-[340px] sm:max-w-[420px] md:max-w-[520px] w-full"
        >
          {/* Date */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-5 md:mb-7">
            <div className="text-center">
              <div className="text-white/30 text-[10px] sm:text-xs font-light tracking-wider mb-1">MONTH</div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide"
              >
                NOV
              </motion.div>
            </div>
            <div className="text-3xl sm:text-4xl text-white/10">•</div>
            <div className="text-center">
              <div className="text-white/30 text-[10px] sm:text-xs font-light tracking-wider mb-1">DAY</div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-4xl sm:text-5xl md:text-6xl font-light text-white"
              >
                26
              </motion.div>
            </div>
            <div className="text-3xl sm:text-4xl text-white/10">•</div>
            <div className="text-center">
              <div className="text-white/30 text-[10px] sm:text-xs font-light tracking-wider mb-1">YEAR</div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-xl sm:text-2xl md:text-3xl font-light text-white/70"
              >
                2026
              </motion.div>
            </div>
          </div>

          {/* Divider with Red Accent */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent my-4 md:my-5" />

          {/* Day & Time */}
          <div className="text-center">
            <div className="mb-3 md:mb-4">
              <div className="text-white/30 text-[10px] sm:text-xs font-light tracking-wider mb-1">DAY</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">SUNDAY</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/30" />
                <div className="text-white/30 text-[10px] sm:text-xs font-light tracking-wider">AT</div>
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white"
              >
                3:00 PM
              </motion.div>
            </div>
          </div>
        </motion.div>

      

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
            <ArrowDown className="w-3 h-3 text-white/20" />
            <span className="text-[8px] text-white/20 tracking-[0.2em]">SCROLL</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;