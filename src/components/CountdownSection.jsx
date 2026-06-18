import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import Img2 from '../assets/countdown_img.jpg';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const numberVariants = {
    hidden: { scale: 0.6, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-teal-100/30 to-teal-50 overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Teal gradient blobs */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(13, 148, 136, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.08) 0%, transparent 70%)
            `,
          }}
        />
        
        {/* Decorative dots pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        
        {/* Floating teal circles */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-400/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 sm:py-24 md:py-28"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-teal-600 fill-teal-600" />
              <Sparkles className="w-5 h-5 text-teal-400" />
              <Heart className="w-5 h-5 text-teal-600 fill-teal-600" />
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
          </div>
          <h2 className="text-teal-700 text-xs sm:text-sm font-light tracking-[4px] uppercase mb-3">
            THE COUNTDOWN
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-light text-teal-900 tracking-tight">
            Our forever begins
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={cardVariants}
          className="relative w-full max-w-[380px] sm:max-w-[520px] md:max-w-[720px] mx-auto"
        >
          {/* Card with teal background */}
          <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-teal-950 backdrop-blur-xl shadow-2xl shadow-teal-900/30 rounded-3xl border border-teal-400/20 overflow-hidden">
            
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-teal-600/5 pointer-events-none" />
            
            {/* Image Container */}
            <div className="relative -mt-8 sm:-mt-12 md:-mt-14 mx-4 sm:mx-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-inset ring-teal-400/30">
                <motion.img
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={Img2}
                  alt="Couple"
                  className="w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[16/11] object-cover object-top"
                />
                
                {/* Elegant overlay gradient with teal */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-900/20 to-transparent" />
                
                {/* Overlay text */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-teal-200 text-xs sm:text-sm tracking-[3px] font-light drop-shadow-sm">
                    ✦ FOREVER STARTS HERE ✦
                  </p>
                </div>
              </div>

              {/* Decorative border glow */}
              <div className="absolute -inset-[3px] rounded-3xl border border-teal-300/40 pointer-events-none" />
            </div>

            {/* Countdown - WHITE NUMBERS FOR CONTRAST */}
            <div className="px-6 sm:px-10 pt-8 pb-10">
              <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 text-center">
                {/* Days */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`days-${timeLeft.days}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-white tabular-nums"
                  >
                    {timeLeft.days}
                  </motion.div>
                  <p className="text-teal-300 text-xs sm:text-sm mt-1.5 tracking-widest font-light">DAYS</p>
                  <div className="w-8 h-0.5 mx-auto mt-1.5 bg-teal-400/30 rounded-full" />
                </motion.div>
                
                <div className="flex items-center text-3xl sm:text-4xl text-teal-400/50 font-light pt-2">:</div>

                {/* Hours */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`hours-${timeLeft.hours}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-white tabular-nums"
                  >
                    {String(timeLeft.hours).padStart(2, '0')}
                  </motion.div>
                  <p className="text-teal-300 text-xs sm:text-sm mt-1.5 tracking-widest font-light">HOURS</p>
                  <div className="w-8 h-0.5 mx-auto mt-1.5 bg-teal-400/30 rounded-full" />
                </motion.div>
                
                <div className="flex items-center text-3xl sm:text-4xl text-teal-400/50 font-light pt-2">:</div>

                {/* Minutes */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`mins-${timeLeft.minutes}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-white tabular-nums"
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </motion.div>
                  <p className="text-teal-300 text-xs sm:text-sm mt-1.5 tracking-widest font-light">MINUTES</p>
                  <div className="w-8 h-0.5 mx-auto mt-1.5 bg-teal-400/30 rounded-full" />
                </motion.div>
                
                <div className="flex items-center text-3xl sm:text-4xl text-teal-400/50 font-light pt-2">:</div>

                {/* Seconds */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`secs-${timeLeft.seconds}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-white tabular-nums"
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </motion.div>
                  <p className="text-teal-300 text-xs sm:text-sm mt-1.5 tracking-widest font-light">SECONDS</p>
                  <div className="w-8 h-0.5 mx-auto mt-1.5 bg-teal-400/30 rounded-full" />
                </motion.div>
              </div>
            </div>

            {/* Date Bar with teal theme */}
            <motion.div
              variants={itemVariants}
              className="border-t border-teal-400/20 bg-teal-900/50 backdrop-blur-sm px-6 sm:px-10 py-5 flex items-center justify-center gap-4 text-sm"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span className="font-light text-white/90">SEPTEMBER 4, 2026 • 9:00 AM</span>
              <Heart className="w-4 h-4 text-teal-300 fill-teal-300/50" />
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center gap-3 text-teal-400/60">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-teal-400" />
              <ChevronRight className="w-4 h-4" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-teal-400" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownSection;