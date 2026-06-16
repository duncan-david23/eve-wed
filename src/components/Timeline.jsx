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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Dots Background - Kept */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      {/* Removed heavy blur decorative elements */}

      <div className="relative py-16 sm:py-20 md:py-24 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-400" />
            <Clock className="w-5 h-5 text-teal-500" />
            <div className="w-8 h-px bg-amber-400" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            THE BIG DAY
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Wedding Timeline
          </p>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            A schedule of the most important moments on our special day
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[340px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] mx-auto"
        >
          <div className="relative">
            {/* Central Line - Simplified */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-amber-300 to-red-300 transform sm:-translate-x-1/2" />

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`relative flex flex-col sm:flex-row items-start mb-8 sm:mb-10 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-6 sm:left-1/2 w-4 h-4 rounded-full border-2 border-white transform -translate-x-2 sm:-translate-x-1/2 z-10 ${
                  index % 3 === 0 ? 'bg-teal-500' : 
                  index % 3 === 1 ? 'bg-amber-400' : 'bg-red-500'
                }`} />

                {/* Content */}
                <div className={`pl-14 sm:pl-0 w-full sm:w-5/12 ${
                  index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                }`}>
                  <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Time */}
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span className="text-sm font-medium text-gray-700">{event.time}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-light text-gray-800">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Empty spacer for alignment */}
                <div className="hidden sm:block sm:w-1/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Event Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-gray-600 text-sm font-light">
              {timelineEvents.length} unforgettable moments
            </span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-amber-400" />
            <Sparkles className="w-3 h-3 text-amber-400" />
            <div className="w-12 h-px bg-amber-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;