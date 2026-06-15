import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Calendar, ChevronRight } from 'lucide-react';
import Img2 from '../assets/sample_img.png';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set your wedding date here - November 26, 2026 at 3:00 PM
  const weddingDate = new Date(2026, 10, 26, 15, 0, 0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, type: 'spring', stiffness: 200 },
    },
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Light Ray Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-amber-200 rounded-full blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-24"
      >
        {/* Section Title */}
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <Clock className="w-4 h-4 text-gray-400" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 font-light">
            COUNTDOWN
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
            to our forever begins
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto"
        >
          {/* White Card Background */}
          <div className="bg-white shadow-2xl rounded-3xl border border-gray-100 p-4 sm:p-6 md:p-8">
            
            {/* Image Section - Overlapping Design */}
            <div className="relative -mt-12 sm:-mt-16 md:-mt-20 mb-6 sm:mb-8 md:mb-10">
              {/* Decorative Frame */}
              <div className="absolute inset-[-3px] bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 rounded-2xl sm:rounded-3xl" />
              <div className="absolute inset-[-1px] bg-white rounded-2xl sm:rounded-3xl" />
              
              {/* Image */}
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={Img2}
                alt="Couple Image"
                className="relative w-full rounded-2xl sm:rounded-3xl shadow-xl"
              />
              
              {/* Decorative Overlay Text */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-gray-400 text-[8px] sm:text-[10px] tracking-[0.2em] font-light">
                    FOREVER BEGINS
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
              {/* Days */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.days}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-1 sm:mb-2"
                >
                  {String(timeLeft.days).padStart(3, '0')}
                </motion.div>
                <div className="text-gray-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  DAYS
                </div>
              </div>

              {/* Colon Separator */}
              <div className="flex items-center justify-center">
                <div className="text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">:</div>
              </div>

              {/* Hours */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.hours}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-1 sm:mb-2"
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </motion.div>
                <div className="text-gray-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  HOURS
                </div>
              </div>

              {/* Colon Separator */}
              <div className="flex items-center justify-center">
                <div className="text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">:</div>
              </div>

              {/* Minutes */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.minutes}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-1 sm:mb-2"
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </motion.div>
                <div className="text-gray-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  MINS
                </div>
              </div>

              {/* Colon Separator */}
              <div className="flex items-center justify-center">
                <div className="text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">:</div>
              </div>

              {/* Seconds */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.seconds}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-1 sm:mb-2"
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </motion.div>
                <div className="text-gray-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  SECS
                </div>
              </div>
            </div>

            {/* Wedding Date Reminder */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-4 sm:pt-6 border-t border-gray-100"
            >
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>NOVEMBER 26, 2026</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400 fill-rose-400" />
                <span>3:00 PM</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Bottom Element */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-gray-300" />
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <div className="w-8 h-px bg-gray-300" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownSection;