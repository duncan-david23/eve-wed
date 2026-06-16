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
  const weddingDetails = {
    date: "SEPTEMBER 4, 2026",
    time: "9:00 AM",
    dressCode: "Teal, Mauve & Gold Elegance",
    reception: "Immediately Following Ceremony",
    venue: "Pinnacle College",
    address: "Akweteyman, Accra",
    googleMapsUrl: "https://www.google.com/maps/dir//Pinnacle+College,+Akweteyman/@5.6182397,-0.1340423,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xfdf996faabe9be7:0x47e5bfccde59d735!2m2!1d-0.2362034!2d5.6167762?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D",
    whatsappNumber: "233531037580",
  };

  const detailsList = [
    { icon: Calendar, label: "DATE", value: weddingDetails.date },
    { icon: Clock, label: "TIME", value: weddingDetails.time },
    { icon: Users, label: "COLORS", value: weddingDetails.dressCode },
    { icon: Music, label: "RECEPTION", value: weddingDetails.reception },
  ];

  const openGoogleMaps = () => window.open(weddingDetails.googleMapsUrl, '_blank');
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in getting more information about Selorm & Ewurah's wedding on ${weddingDetails.date} at ${weddingDetails.time}. Could you please provide more details? Thank you!`
    );
    window.open(`https://wa.me/${weddingDetails.whatsappNumber}?text=${message}`, '_blank');
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 30%, rgba(45, 212, 191, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 75% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)
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
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h2 className="text-teal-600 text-xs sm:text-sm font-light tracking-[4px] uppercase mb-3">
            WEDDING DETAILS
          </h2>
          <p className="text-4xl sm:text-5xl md:text-6xl font-light text-zinc-800 tracking-tight">
            The Big Day
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="w-full max-w-[380px] sm:max-w-[620px] md:max-w-[1100px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column - Details */}
            <div className="space-y-6">
              {/* Main Details Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-7 md:p-9"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span className="uppercase text-teal-600 text-sm tracking-widest font-light">Essential Information</span>
                </div>

                <div className="space-y-7">
                  {detailsList.map((detail, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-5"
                    >
                      <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mt-0.5">
                        <detail.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-teal-500 text-xs tracking-[2px] uppercase mb-1 font-light">{detail.label}</div>
                        <p className="text-zinc-700 text-[15px] sm:text-base leading-relaxed font-light">
                          {detail.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* What to Expect */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-7 md:p-9"
              >
                <h3 className="text-xl font-light text-zinc-800 mb-6">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 text-zinc-600">
                    <Camera className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[15px]">Professional photography &amp; videography</span>
                  </div>
                  <div className="flex gap-4 text-zinc-600">
                    <Gift className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[15px]">Gift registry available upon request</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Venue */}
            <div className="space-y-6">
              {/* Venue Image */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/70">
                  <motion.img
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    src={location_img}
                    alt="Wedding Venue"
                    className="w-full aspect-[16/11] object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-amber-200 text-xs tracking-widest mb-1">VENUE</p>
                    <p className="text-white text-2xl sm:text-3xl font-light tracking-tight">{weddingDetails.venue}</p>
                  </div>
                </div>
                {/* Decorative border */}
                <div className="absolute -inset-1 rounded-3xl border border-teal-200/60 pointer-events-none" />
              </motion.div>

              {/* Location Info Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-7 md:p-9"
              >
                <div className="flex gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-teal-500 text-xs tracking-widest uppercase mb-1">LOCATION</div>
                    <p className="text-zinc-700 leading-relaxed text-[15px]">{weddingDetails.address}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openGoogleMaps}
                    className="flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white py-4 px-6 rounded-2xl transition-all duration-300 font-light"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={openWhatsApp}
                    className="flex items-center justify-center gap-3 bg-rose-500 hover:bg-rose-600 text-white py-4 px-6 rounded-2xl transition-all duration-300 font-light"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message Us</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div variants={itemVariants} className="flex justify-center mt-16">
          <div className="flex items-center gap-4 text-amber-400/70">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-amber-400" />
            <Heart className="w-4 h-4" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocationSection;