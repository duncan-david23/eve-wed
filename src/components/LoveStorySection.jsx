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
      { year: "2020", icon: Coffee, text: "It all started with a coffee date that changed everything. I was immediately drawn to his warmth, his laughter, and the way his eyes lit up when he talked about his dreams.", color: "text-teal-500" },
      { year: "2021", icon: Sun, text: "Through the ups and downs of life, we grew together. Every sunrise reminded me that I had found my sunshine in him. Our love deepened with each passing day.", color: "text-amber-400" },
      { year: "2022", icon: Heart, text: "He asked me to be his forever under the stars. In that magical moment, I knew I had found my home. My heart said yes before I could even speak the words.", color: "text-rose-500" },
      { year: "2023", icon: Star, text: "Planning our future together has been the greatest adventure. From choosing colors to dreaming about our forever, every step has been filled with love and excitement.", color: "text-teal-500" }
    ],
    quote: "From the moment I met him, I knew he was the one my soul had been searching for."
  };

  const groomStory = {
    name: "Selorm",
    title: "The Groom",
    emoji: "🤵",
    story: [
      { year: "2020", icon: Coffee, text: "That first coffee date was unforgettable. I saw something special in her - a spark, a warmth, a beauty that went far beyond what my eyes could see.", color: "text-teal-500" },
      { year: "2021", icon: Moon, text: "She became my peace, my anchor. Through every storm, her love was the calm I needed. I knew I had found someone truly extraordinary.", color: "text-amber-400" },
      { year: "2022", icon: Gift, text: "Getting down on one knee was the easiest decision I've ever made. Seeing her eyes fill with tears of joy, I knew I had just made the best promise of my life.", color: "text-rose-500" },
      { year: "2023", icon: Camera, text: "Every moment with her is a memory I want to capture forever. From wedding planning to building our dreams, I can't wait to start our forever together.", color: "text-teal-500" }
    ],
    quote: "She is my greatest blessing, my best friend, and the love of my life. Forever with her is not long enough."
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
    }),
  };

  const renderStoryCard = (storyData, type) => {
    const isBride = type === 'bride';
    const { name, title, emoji, quote, story } = isBride ? brideStory : groomStory;

    return (
      <motion.div
        key={type}
        variants={itemVariants}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-50 via-amber-50 to-rose-50 p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-md flex items-center justify-center text-5xl flex-shrink-0">
              {emoji}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-3xl sm:text-4xl font-light text-zinc-800">{name}</h3>
              <p className="text-teal-600 text-lg font-light">{title}</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/70 backdrop-blur rounded-2xl border border-white/80 italic text-zinc-600 leading-relaxed">
            “{quote}”
          </div>
        </div>

        {/* Timeline */}
        <div className="p-8 md:p-10">
          <div className="space-y-10 relative before:absolute before:left-6 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-teal-200 before:via-amber-200 before:to-transparent">
            {story.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={timelineItemVariants}
                initial="hidden"
                animate="visible"
                className="relative pl-16"
              >
                <div className="absolute left-0 w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center border border-teal-100">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                
                <div className="text-amber-400 text-sm tracking-widest font-light mb-2">{item.year}</div>
                <p className="text-zinc-600 leading-relaxed text-[15px] md:text-base">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #111827 0.8px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />
      </div>

      <div className="relative py-20 sm:py-24 md:py-28 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          
          <h2 className="text-teal-600 text-sm font-light tracking-[4px] uppercase mb-3">OUR JOURNEY</h2>
          <p className="text-4xl sm:text-5xl md:text-6xl font-light text-zinc-800 tracking-tight">
            How We Found Each Other
          </p>
          <p className="text-zinc-500 mt-4 max-w-md mx-auto text-sm sm:text-base">
            A beautiful story of love, growth, and destiny
          </p>
        </motion.div>

        {/* Toggle Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white rounded-3xl p-1.5 shadow-lg border border-zinc-100">
            {[
              { label: "Both", value: "both", icon: Heart },
              { label: "Bride", value: "bride", icon: User },
              { label: "Groom", value: "groom", icon: User }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveStory(tab.value)}
                className={`px-6 py-3 rounded-3xl text-sm font-light transition-all flex items-center gap-2
                  ${activeStory === tab.value 
                    ? 'bg-teal-600 text-white shadow' 
                    : 'text-zinc-500 hover:text-zinc-700'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stories Container */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className={`grid gap-8 md:gap-12 ${
                activeStory === 'both' 
                  ? 'lg:grid-cols-2' 
                  : 'max-w-2xl mx-auto'
              }`}
            >
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4 text-amber-400/60">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
            <Sparkles className="w-5 h-5" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveStorySection;