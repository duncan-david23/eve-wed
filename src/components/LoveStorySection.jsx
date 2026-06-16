import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  User,
  Coffee,
  Sun,
  Moon,
  Star,
  Camera,
  Gift
} from 'lucide-react';

const LoveStorySection = () => {
  const [activeStory, setActiveStory] = useState('both');

  const brideStory = {
    name: "Ewurah",
    title: "The Bride",
    emoji: "👰",
    story: [
      {
        year: "2020",
        icon: Coffee,
        text: "It all started with a coffee date that changed everything. I was immediately drawn to his warmth, his laughter, and the way his eyes lit up when he talked about his dreams.",
        color: "text-teal-500"
      },
      {
        year: "2021",
        icon: Sun,
        text: "Through the ups and downs of life, we grew together. Every sunrise reminded me that I had found my sunshine in him. Our love deepened with each passing day.",
        color: "text-amber-400"
      },
      {
        year: "2022",
        icon: Heart,
        text: "He asked me to be his forever under the stars. In that magical moment, I knew I had found my home. My heart said yes before I could even speak the words.",
        color: "text-red-500"
      },
      {
        year: "2023",
        icon: Star,
        text: "Planning our future together has been the greatest adventure. From choosing colors to dreaming about our forever, every step has been filled with love and excitement.",
        color: "text-teal-500"
      }
    ],
    quote: "From the moment I met him, I knew he was the one my soul had been searching for."
  };

  const groomStory = {
    name: "Selorm",
    title: "The Groom",
    emoji: "🤵",
    story: [
      {
        year: "2020",
        icon: Coffee,
        text: "That first coffee date was unforgettable. I saw something special in her - a spark, a warmth, a beauty that went far beyond what my eyes could see.",
        color: "text-teal-500"
      },
      {
        year: "2021",
        icon: Moon,
        text: "She became my peace, my anchor. Through every storm, her love was the calm I needed. I knew I had found someone truly extraordinary.",
        color: "text-amber-400"
      },
      {
        year: "2022",
        icon: Gift,
        text: "Getting down on one knee was the easiest decision I've ever made. Seeing her eyes fill with tears of joy, I knew I had just made the best promise of my life.",
        color: "text-red-500"
      },
      {
        year: "2023",
        icon: Camera,
        text: "Every moment with her is a memory I want to capture forever. From wedding planning to building our dreams, I can't wait to start our forever together.",
        color: "text-teal-500"
      }
    ],
    quote: "She is my greatest blessing, my best friend, and the love of my life. Forever with her is not long enough."
  };

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
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  // Render story card component
  const renderStoryCard = (story, type) => {
    const isBride = type === 'bride';
    const name = isBride ? brideStory.name : groomStory.name;
    const title = isBride ? brideStory.title : groomStory.title;
    const emoji = isBride ? brideStory.emoji : groomStory.emoji;
    const quote = isBride ? brideStory.quote : groomStory.quote;
    const storyData = isBride ? brideStory.story : groomStory.story;

    return (
      <motion.div
        key={type}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl border border-teal-100 shadow-md overflow-hidden"
      >
        {/* Header - Simplified */}
        <div className="bg-gradient-to-r from-teal-50 via-amber-50 to-red-50 p-6 sm:p-8 border-b border-teal-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">
              {emoji}
            </div>
            <div>
              <h3 className="text-gray-800 text-2xl font-light">{name}</h3>
              <p className="text-teal-500 text-sm font-light">{title}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-xl border border-teal-100">
            <p className="text-gray-600 text-sm italic font-light">"{quote}"</p>
          </div>
        </div>

        {/* Timeline - Simplified */}
        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            {storyData.map((item, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-teal-200 last:border-l-0"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-white border-2 border-teal-200 flex items-center justify-center">
                  <item.icon className={`w-3 h-3 ${item.color}`} />
                </div>
                <div className="mb-1">
                  <span className="text-amber-400 text-sm font-light">{item.year}</span>
                </div>
                <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
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

      {/* Removed heavy decorative blur elements */}

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
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <div className="w-8 h-px bg-amber-400" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            OUR LOVE STORY
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            How We Found
          </p>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide -mt-2">
            Each Other
          </p>
          <div className="w-12 h-px bg-amber-400 mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            A journey of love, laughter, and happily ever after
          </p>
        </motion.div>

        {/* Toggle Buttons - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex rounded-full border border-gray-200 p-1 bg-white shadow-sm">
            <button
              onClick={() => setActiveStory('both')}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm transition-all duration-200 ${
                activeStory === 'both' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Heart className="w-4 h-4 inline mr-2 fill-current" />
              Both
            </button>
            <button
              onClick={() => setActiveStory('bride')}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm transition-all duration-200 ${
                activeStory === 'bride' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Bride's Story
            </button>
            <button
              onClick={() => setActiveStory('groom')}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm transition-all duration-200 ${
                activeStory === 'groom' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Groom's Story
            </button>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="max-w-[340px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] mx-auto">
          <div className={`grid gap-8 md:gap-10 ${
            activeStory === 'both' 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-1 max-w-3xl mx-auto'
          }`}>
            <AnimatePresence mode="wait">
              {activeStory === 'both' ? (
                <>
                  {renderStoryCard(brideStory, 'bride')}
                  {renderStoryCard(groomStory, 'groom')}
                </>
              ) : activeStory === 'bride' ? (
                renderStoryCard(brideStory, 'bride')
              ) : (
                renderStoryCard(groomStory, 'groom')
              )}
            </AnimatePresence>
          </div>
        </div>

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

export default LoveStorySection;