import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Navigation,
  Users,
  Music,
  Camera,
  Gift,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import location_img from '../assets/venue_img.jpg';

const LocationSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  // Wedding details
  const weddingDetails = {
    date: "SEPTEMBER 4, 2026",
    time: "9:00 AM",
    dressCode: "Teal, Mauve & Gold Elegance",
    reception: "Immediately Following Ceremony",
    venue: "Pinnacle College",
    address: "Akweteyman, Accra",
    googleMapsUrl: "https://www.google.com/maps/dir//Pinnacle+College,+Akweteyman/@5.6182397,-0.1340423,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xfdf996faabe9be7:0x47e5bfccde59d735!2m2!1d-0.2362034!2d5.6167762?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
    whatsappNumber: "233508925171",
  };

  const detailsList = [
    { icon: Calendar, label: "DATE", value: weddingDetails.date },
    { icon: Clock, label: "TIME", value: weddingDetails.time },
    { icon: Users, label: "COLORS", value: weddingDetails.dressCode },
    { icon: Music, label: "RECEPTION", value: weddingDetails.reception },
  ];

  const openGoogleMaps = () => {
    window.open(weddingDetails.googleMapsUrl, '_blank');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in getting more information about Evelyn & Christian's wedding on ${weddingDetails.date} at ${weddingDetails.time}. Could you please provide more details? Thank you!`
    );
    window.open(`https://wa.me/${weddingDetails.whatsappNumber}?text=${message}`, '_blank');
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

      {/* Removed Light Ray Effects - Performance */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-24"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-400" />
            <Sparkles className="w-4 h-4 text-amber-400" />
            <div className="w-8 h-px bg-amber-400" />
          </div>
          <h2 className="text-teal-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            THE
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Details
          </p>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-4" />
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-[340px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            
            {/* Left Side - Details List */}
            <div className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 md:mb-8">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="text-teal-600 text-xs tracking-wider uppercase">Essential Information</span>
                </div>
                
                <div className="space-y-5 md:space-y-6">
                  {detailsList.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center">
                        <detail.icon className="w-4 h-4 text-teal-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-teal-400 text-[10px] tracking-wider mb-1">{detail.label}</div>
                        <div className="text-gray-700 text-sm sm:text-base md:text-lg font-light">
                          {detail.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6 md:p-8">
                <h3 className="text-teal-600 text-lg md:text-xl font-light mb-4 tracking-wide">What to Expect</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Camera className="w-3.5 h-3.5 text-teal-400" />
                    <span>Professional photography & videography</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Gift className="w-3.5 h-3.5 text-amber-400" />
                    <span>Gift registry available upon request</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Location Card */}
            <div className="space-y-6">
              {/* Image Card */}
              <div className="relative">
                {/* Decorative Frame - Solid border */}
                <div className="absolute inset-[-1px] border-4 border-teal-300 rounded-2xl shadow-lg" />
                <div className="absolute inset-[-0.5px] bg-white rounded-2xl" />
                
                <img
                  src={location_img}
                  alt="Wedding Location"
                  className="relative w-full rounded-2xl shadow-lg"
                  loading="lazy"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                
                {/* Venue Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-amber-300/80 text-[10px] tracking-wider mb-1">VENUE</p>
                  <p className="text-white text-lg sm:text-xl font-light">{weddingDetails.venue}</p>
                </div>
              </div>

              {/* Location Details Card */}
              <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6 md:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-teal-400 text-[10px] tracking-wider mb-1">ADDRESS</div>
                    <p className="text-gray-700 text-sm md:text-base font-light leading-relaxed">
                      {weddingDetails.address}
                    </p>
                  </div>
                </div>

                {/* Two Button Row */}
                <div className="flex gap-3 mt-4">
                  {/* Google Maps Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openGoogleMaps}
                    className="flex-1 rounded-xl bg-teal-500 border border-teal-500 px-4 py-3 text-white transition-all duration-300 hover:bg-teal-600 hover:border-teal-600"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm font-light tracking-wide">Locate Us</span>
                    </div>
                  </motion.button>

                  {/* WhatsApp Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openWhatsApp}
                    className="flex-1 rounded-xl bg-amber-500 border border-amber-500 px-4 py-3 text-white transition-all duration-300 hover:bg-amber-600 hover:border-amber-600"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-light tracking-wide">WhatsApp</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Bottom */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-12 md:mt-16"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-px bg-amber-400" />
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <div className="w-12 h-px bg-amber-400" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocationSection;