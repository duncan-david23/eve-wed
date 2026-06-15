import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Sparkles, 
  UserCheck, 
  Calendar, 
  MapPin,
  X,
  Loader2
} from 'lucide-react';

const AttendeesSection = () => {
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Your Google Form Embed URL (without the iframe wrapper)
  const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc4wWFujI-6mLDoug0o66CUEbQFSh0Z08KYXJCrPck6yZhMeA/viewform?embedded=true";

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
    <div className="relative bg-white min-h-screen overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      {/* Light Ray Effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-amber-200 rounded-full blur-[120px] opacity-20" />

      <div className="relative py-16 sm:py-20 md:py-24 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <Users className="w-5 h-5 text-rose-400" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            JOIN THE CELEBRATION
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Will You Attend?
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            Please let us know if you can make it to our special day
          </p>
        </motion.div>

        {/* RSVP Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[90%] sm:max-w-[500px] lg:max-w-[600px] mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Illustration Area */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-6 sm:p-8 text-center border-b border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-md mb-4">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400" />
              </div>
              <h3 className="text-gray-800 text-xl sm:text-2xl font-light mb-2">Save the Date</h3>
              <p className="text-gray-500 text-sm font-light px-4">
                We'd love to have you at our wedding celebration
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
                <Calendar className="w-3 h-3" />
                <span>NOVEMBER 26, 2026</span>
                <MapPin className="w-3 h-3 ml-0 sm:ml-2" />
                <span>The Grand Estate</span>
              </div>
            </div>

            {/* RSVP Button */}
            <div className="p-6 sm:p-8 text-center">
              <button
                onClick={() => setShowRSVPModal(true)}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium tracking-wide">RSVP Now</span>
              </button>
              <p className="text-gray-400 text-xs mt-4">
                Please RSVP by October 26, 2026
              </p>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8"
          >
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Heart className="w-3 h-3" />
              <span>Your presence is the greatest gift of all</span>
              <Heart className="w-3 h-3" />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 md:mt-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-gray-300" />
            <Sparkles className="w-3 h-3 text-gray-400" />
            <div className="w-12 h-px bg-gray-300" />
          </div>
        </motion.div>
      </div>

      {/* RSVP Modal with Embedded Google Form */}
      {showRSVPModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-4 sm:py-8"
          onClick={() => setShowRSVPModal(false)}
        >
          <div
            className="relative w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowRSVPModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/90 hover:bg-white shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center pt-6 pb-2 px-4 border-b border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 mb-3">
                <UserCheck className="w-7 h-7 text-rose-500" />
              </div>
              <h3 className="text-gray-800 text-xl font-light tracking-wide">RSVP Form</h3>
              <p className="text-gray-500 text-sm mt-1 font-light">
                Please fill out the form below to confirm your attendance
              </p>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                <span className="ml-2 text-gray-500">Loading form...</span>
              </div>
            )}

            {/* Embedded Google Form */}
            <iframe
              src={GOOGLE_FORM_EMBED_URL}
              width="100%"
              height="550"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              onLoad={() => setIsLoading(false)}
              className={`rounded-b-2xl ${isLoading ? 'hidden' : 'block'}`}
              title="RSVP Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeesSection;