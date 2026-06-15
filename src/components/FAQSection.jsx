import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  Heart, 
  Sparkles,
  MapPin,
  Clock,
  Gift,
  Camera,
  Music,
  Car,
  Droplets,
  Moon
} from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is the dress code?",
      answer: "Black Tie Optional. We'd love to see you dress up for our special day! Tuxedos and evening gowns are welcome, but a dark suit and cocktail dress are also perfectly appropriate.",
      icon: HelpCircle
    },
    {
      id: 2,
      question: "Can I bring a plus one?",
      answer: "Due to limited venue capacity, we are only able to accommodate guests formally invited on your wedding invitation. Please check your invitation for the number of seats reserved in your honor.",
      icon: Heart
    },
    {
      id: 3,
      question: "What time should I arrive?",
      answer: "The ceremony will begin promptly at 3:00 PM. We recommend arriving at least 30 minutes early to find parking and get settled before the celebration begins.",
      icon: Clock
    },
    {
      id: 4,
      question: "Will there be parking available?",
      answer: "Yes, complimentary valet parking will be available at the venue. There will also be additional parking spaces nearby for overflow.",
      icon: Car
    },
    {
      id: 5,
      question: "Can I take photos during the ceremony?",
      answer: "We kindly request an unplugged ceremony. Please silence your phones and allow our professional photographer to capture the best moments. We'll share all the photos with you afterward!",
      icon: Camera
    },
    {
      id: 6,
      question: "Are children welcome?",
      answer: "While we love your little ones, we have decided to keep our ceremony and reception an adults-only event. We appreciate your understanding and hope you can enjoy a night off!",
      icon: Moon
    },
    {
      id: 7,
      question: "Will there be food and drinks?",
      answer: "Yes! We will be serving a full dinner followed by an open bar with signature cocktails, wine, and beer. Please let us know of any dietary restrictions when you RSVP.",
      icon: Music
    },
    {
      id: 8,
      question: "Where can I find gift registry information?",
      answer: "Your presence is the greatest gift, but if you wish to bless us, we have registered at our Gift Registry page. Please click the 'Bless the Couple' button at the top right corner of the page.",
      icon: Gift
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
            <HelpCircle className="w-5 h-5 text-rose-400" />
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>
          <h2 className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-light">
            HAVE QUESTIONS?
          </h2>
          <p className="text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Frequently Asked
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4" />
          <p className="text-gray-400 text-xs sm:text-sm mt-4 max-w-2xl mx-auto">
            Everything you need to know about our special day
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[340px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1000px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="relative"
              >
                <div 
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between p-4 md:p-6">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                        <faq.icon className="w-4 h-4 text-rose-400" />
                      </div>
                      <h3 className="text-gray-800 text-sm sm:text-base md:text-lg font-light tracking-wide">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0 border-t border-gray-100">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-rose-300 mt-2 flex-shrink-0" />
                            <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-6 md:p-8 max-w-[600px] mx-auto border border-rose-100">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md mb-4">
              <Heart className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="text-gray-800 text-xl md:text-2xl font-light mb-2 tracking-wide">
              Still Have Questions?
            </h3>
            <p className="text-gray-500 text-sm md:text-base font-light mb-4">
              Can't find what you're looking for? We're here to help!
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-rose-200 rounded-full text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-300">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-light tracking-wide">Contact Us</span>
            </button>
          </div>
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
    </div>
  );
};

export default FAQSection;