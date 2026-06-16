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

  // Set your wedding date here - September 4, 2026 at 9:00 AM
  const weddingDate = new Date(2026, 8, 4, 9, 0, 0);

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
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
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

      {/* Light Ray Effects - Teal and Gold */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-teal-200 rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-200 rounded-full blur-[120px]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-24"
      >
        {/* Section Title - Wedding Colors */}
        <motion.div variants={itemVariants} className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <Clock className="w-4 h-4 text-teal-500" />
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
          <h2 className="text-teal-600 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 font-light">
            COUNTDOWN
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
            to our forever begins
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] mx-auto"
        >
          {/* White Card Background with Teal Border */}
          <div className="bg-white shadow-2xl rounded-3xl border border-teal-100 p-4 sm:p-6 md:p-8">
            
            {/* Image Section - Overlapping Design */}
            <div className="relative -mt-12 sm:-mt-16 md:-mt-20 mb-6 sm:mb-8 md:mb-10">
              {/* Decorative Frame - Wedding Colors */}
              <div className="absolute inset-[-3px] bg-gradient-to-r from-teal-300 via-amber-300 to-red-300 rounded-2xl sm:rounded-3xl" />
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
              
              {/* Decorative Overlay Text - Gold accent */}
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-amber-600/60 text-[8px] sm:text-[10px] tracking-[0.2em] font-light">
                    FOREVER BEGINS
                </p>
              </div>
            </div>

            {/* Countdown Timer - Teal Numbers */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
              {/* Days - NO leading zero */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.days}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-teal-600 mb-1 sm:mb-2"
                >
                  {timeLeft.days}
                </motion.div>
                <div className="text-teal-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  DAYS
                </div>
              </div>

              {/* Colon Separator - Gold */}
              <div className="flex items-center justify-center">
                <div className="text-amber-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">:</div>
              </div>

              {/* Hours - with leading zero */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.hours}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-teal-600 mb-1 sm:mb-2"
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </motion.div>
                <div className="text-teal-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  HOURS
                </div>
              </div>

              {/* Colon Separator - Gold */}
              <div className="flex items-center justify-center">
                <div className="text-amber-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">:</div>
              </div>

              {/* Minutes - with leading zero */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.minutes}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-teal-600 mb-1 sm:mb-2"
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </motion.div>
                <div className="text-teal-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  MINS
                </div>
              </div>

              {/* Colon Separator - Gold */}
              <div className="flex items-center justify-center">
                <div className="text-amber-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">:</div>
              </div>

              {/* Seconds - with leading zero */}
              <div className="text-center">
                <motion.div
                  key={timeLeft.seconds}
                  variants={numberVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-teal-600 mb-1 sm:mb-2"
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </motion.div>
                <div className="text-teal-400 text-[10px] sm:text-xs tracking-wider uppercase">
                  SECS
                </div>
              </div>
            </div>

            {/* Wedding Date Reminder - Updated to September 4, 2026 */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-4 sm:pt-6 border-t border-teal-100"
            >
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" />
                <span className="text-gray-600 font-light">SEPTEMBER 4, 2026</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
                <span className="text-gray-600 font-light">9:00 AM</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Bottom Element - Gold accent */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-amber-300" />
              <ChevronRight className="w-3 h-3 text-amber-400" />
              <div className="w-8 h-px bg-amber-300" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownSection;