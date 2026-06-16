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
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 30%, rgba(45, 212, 191, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 70%, rgba(245, 158, 11, 0.12) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #111827 0.8px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
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
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <Clock className="w-5 h-5 text-teal-500" />
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h2 className="text-teal-600 text-xs sm:text-sm font-light tracking-[4px] uppercase mb-3">
            THE COUNTDOWN
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-light text-zinc-800 tracking-tight">
            Our forever begins
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={cardVariants}
          className="relative w-full max-w-[380px] sm:max-w-[520px] md:max-w-[720px] mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl shadow-zinc-200/80 rounded-3xl border border-white/80 overflow-hidden">
            
            {/* Image Container - Taller + Focus on faces */}
            <div className="relative -mt-8 sm:-mt-12 md:-mt-14 mx-4 sm:mx-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-inset ring-white">
                <motion.img
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  src={Img2}
                  alt="Couple"
                  className="w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[16/11] object-cover object-top"
                />
                
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                
                {/* Overlay text */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-amber-100 text-xs sm:text-sm tracking-[3px] font-light drop-shadow-sm">
                    FOREVER STARTS HERE
                  </p>
                </div>
              </div>

              {/* Decorative border glow */}
              <div className="absolute -inset-[3px] rounded-3xl border border-teal-200/60 pointer-events-none" />
            </div>

            {/* Countdown */}
            <div className="px-6 sm:px-10 pt-8 pb-10">
              <div className="flex justify-center gap-3 sm:gap-6 md:gap-8 text-center">
                {/* Days */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`days-${timeLeft.days}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-teal-700 tabular-nums"
                  >
                    {timeLeft.days}
                  </motion.div>
                  <p className="text-teal-500/80 text-xs sm:text-sm mt-1.5 tracking-widest font-light">DAYS</p>
                </motion.div>
                <div className="flex items-center text-3xl sm:text-4xl text-amber-300/70 font-light pt-2">:</div>

                {/* Hours */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`hours-${timeLeft.hours}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-teal-700 tabular-nums"
                  >
                    {String(timeLeft.hours).padStart(2, '0')}
                  </motion.div>
                  <p className="text-teal-500/80 text-xs sm:text-sm mt-1.5 tracking-widest font-light">HOURS</p>
                </motion.div>
                <div className="flex items-center text-3xl sm:text-4xl text-amber-300/70 font-light pt-2">:</div>

                {/* Minutes */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`mins-${timeLeft.minutes}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-teal-700 tabular-nums"
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </motion.div>
                  <p className="text-teal-500/80 text-xs sm:text-sm mt-1.5 tracking-widest font-light">MINUTES</p>
                </motion.div>
                <div className="flex items-center text-3xl sm:text-4xl text-amber-300/70 font-light pt-2">:</div>

                {/* Seconds */}
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                  <motion.div
                    key={`secs-${timeLeft.seconds}`}
                    variants={numberVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-none font-light text-teal-700 tabular-nums"
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </motion.div>
                  <p className="text-teal-500/80 text-xs sm:text-sm mt-1.5 tracking-widest font-light">SECONDS</p>
                </motion.div>
              </div>
            </div>

            {/* Date Bar */}
            <motion.div
              variants={itemVariants}
              className="border-t border-teal-100 bg-zinc-50 px-6 sm:px-10 py-5 flex items-center justify-center gap-4 text-sm"
            >
              <Calendar className="w-4 h-4 text-teal-500" />
              <span className="font-light text-zinc-600">SEPTEMBER 4, 2026 • 9:00 AM</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </motion.div>
          </div>

          {/* Bottom accent */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center gap-3 text-amber-400/70">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400" />
              <ChevronRight className="w-4 h-4" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CountdownSection;