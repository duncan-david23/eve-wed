import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Clock, 
  Sun,
  Moon
} from 'lucide-react';

const Timeline = () => {
  const [activeView, setActiveView] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      time: "8:00 AM",
      title: "Morning Preparations",
    },
    {
      id: 2,
      time: "9:00 AM",
      title: "Traditional Wedding Ceremony",
    },
    {
      id: 3,
      time: "9:15 AM",
      title: "Groom's Entry",
    },
    {
      id: 4,
      time: "9:30 AM",
      title: "Bride's Entry",
    },
    {
      id: 5,
      time: "9:45 AM",
      title: "Exchange of Rings",
    },
    {
      id: 6,
      time: "10:00 AM",
      title: "Marriage Blessings & Prayers",
    },
    {
      id: 7,
      time: "10:30 AM",
      title: "Group Photography",
    },
    {
      id: 8,
      time: "11:00 AM",
      title: "Happy Hour 🍻",
    },
    {
      id: 9,
      time: "12:00 PM",
      title: "Reception & Luncheon",
    },
    {
      id: 10,
      time: "2:00 PM",
      title: "Cake Cutting Ceremony",
    },
    {
      id: 11,
      time: "3:00 PM",
      title: "Speeches & Toasts",
    },
    {
      id: 12,
      time: "4:00 PM",
      title: "Last Dance 💃",
    },
    {
      id: 13,
      time: "5:00 PM",
      title: "Final Photography Session",
    },
    {
      id: 14,
      time: "6:00 PM",
      title: "Departure & Farewell",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Each child waits 0.15s before next starts
        delayChildren: 0.3, // Initial delay before first child
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: -30, // Start from above (drop effect)
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Mauve Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.06) 0%, transparent 70%)
            `,
          }}
        />
        
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-purple-400/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-pink-400/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-300/5 blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative py-16 sm:py-20 md:py-24 px-4">
        {/* Section Header - Drops in first */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <Clock className="w-5 h-5 text-purple-500" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>
          <h2 className="text-purple-600 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            THE BIG DAY
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Wedding Timeline
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4" />
          <p className="text-gray-500 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            A schedule of the most important moments on our special day
          </p>
        </motion.div>

        {/* Timeline - Staggered drop effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] mx-auto"
        >
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400 transform sm:-translate-x-1/2" />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`relative flex flex-col sm:flex-row items-start mb-8 sm:mb-10 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-6 sm:left-1/2 w-4 h-4 rounded-full border-2 border-white transform -translate-x-2 sm:-translate-x-1/2 z-10 shadow-md ${
                  index % 3 === 0 ? 'bg-purple-500' : 
                  index % 3 === 1 ? 'bg-pink-500' : 'bg-violet-500'
                }`} />

                {/* Content - Drops in from above */}
                <div className={`pl-14 sm:pl-0 w-full sm:w-5/12 ${
                  index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                }`}>
                  <motion.div 
                    className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-100/50 shadow-lg shadow-purple-100/20 hover:shadow-xl hover:shadow-purple-100/30 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Time */}
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">{event.time}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-light text-gray-800">
                      {event.title}
                    </h3>
                  </motion.div>
                </div>

                {/* Empty spacer for alignment */}
                <div className="hidden sm:block sm:w-1/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Counter - Drops in last */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-purple-100/50 shadow-lg shadow-purple-100/20">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="text-gray-700 text-sm font-light">
              {timelineEvents.length} unforgettable moments
            </span>
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          </div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <Sparkles className="w-3 h-3 text-purple-400" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;