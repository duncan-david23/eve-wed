import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, Gift, X, User, Mail } from 'lucide-react';
import HeroImage from '../assets/hero_img.jpg';
import PaystackPop from '@paystack/inline-js';

const HeroSection = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [giverName, setGiverName] = useState('');
  const [giverEmail, setGiverEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);

  const presetAmounts = [50, 100, 200, 500];
  
  const paystackPublicKey = 'pk_test_977623941fe552b3416bc945370b1b21240f26de';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyButton(true);
      } else {
        setShowStickyButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGiftClick = () => setShowGiftModal(true);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    const amount = selectedAmount || customAmount;
    return amount ? parseFloat(amount) : 0;
  };

  const isFormValid = () => {
    return giverName.trim() !== '' && 
           giverEmail.trim() !== '' && 
           getFinalAmount() > 0 &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giverEmail);
  };

  const handlePaystackPayment = () => {
    if (!isFormValid()) return;
    
    setIsProcessing(true);

    const popup = new PaystackPop();

    popup.newTransaction({
      key: paystackPublicKey,
      email: giverEmail,
      amount: getFinalAmount() * 100,
      currency: 'GHS',
      metadata: {
        custom_fields: [
          {
            display_name: "Giver's Name",
            variable_name: "giver_name",
            value: giverName,
          },
        ],
      },
      onSuccess: (transaction) => {
        console.log('Payment Success:', transaction);
        setShowGiftModal(false);
        setSelectedAmount(null);
        setCustomAmount('');
        setGiverName('');
        setGiverEmail('');
        setIsProcessing(false);
        alert(`Thank you ${giverName}! Your generous gift of ₵${getFinalAmount()} has been received. ❤️`);
      },
      onCancel: () => {
        setIsProcessing(false);
        alert("Payment cancelled. You can try again whenever you're ready.");
      },
      onError: (error) => {
        console.error('Paystack Error:', error);
        setIsProcessing(false);
        alert('There was an error processing your payment. Please try again.');
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sticky Gift Button */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleGiftClick}
              className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 px-8 py-3.5 flex items-center gap-3"
            >
              <Gift className="w-5 h-5" />
              <span className="text-sm font-light tracking-wide">Bless the Couple</span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col md:flex-row">
        
        {/* Image Section with Zoom Animation */}
        <div className="relative w-full h-screen md:h-auto md:w-1/2 lg:w-3/5 overflow-hidden">
          {/* Animated Image Container - Faster Zoom */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ 
              scale: [0.8, 1.2, 1.05, 1.15, 1.1],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <img
              src={HeroImage}
              alt="Selorm & Ewurah Abena"
              className="w-full h-full md:object-contain object-cover"
            />
          </motion.div>
          
          {/* Overlay with subtle pulse */}
          <motion.div 
            className="absolute inset-0 bg-black/40"
            animate={{
              opacity: [0.4, 0.3, 0.4]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          {/* Mobile Content */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center z-10"
            >
              <motion.h1 variants={itemVariants} className="font-light text-5xl text-white tracking-[0.15em]">
                SELORM
              </motion.h1>
              
              <motion.div
                variants={itemVariants}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block my-4"
              >
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400/80" />
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="font-light text-5xl text-white tracking-[0.15em]">
                EWURAH ABENA
              </motion.h1>

              <motion.div variants={itemVariants} className="relative mt-6">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-12 h-px bg-amber-400/40" />
                <p className="text-white/70 text-[10px] uppercase tracking-[0.3em] font-light">
                  invite you to their wedding celebration
                </p>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-12 h-px bg-amber-400/40" />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/70 text-xs">
                <div className="text-center">
                  <div className="text-[10px] tracking-wider uppercase">Month</div>
                  <div className="text-lg font-light">SEP</div>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-center">
                  <div className="text-[10px] tracking-wider uppercase">Day</div>
                  <div className="text-xl font-light">4</div>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-center">
                  <div className="text-[10px] tracking-wider uppercase">Year</div>
                  <div className="text-base font-light">2026</div>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-center">
                  <div className="text-[10px] tracking-wider uppercase">Day</div>
                  <div className="text-sm font-light">FRIDAY</div>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-center">
                  <div className="text-[10px] tracking-wider uppercase">At</div>
                  <div className="text-sm font-light">9:00 AM</div>
                </div>
              </motion.div>

              {/* Scroll Indicator - Mobile */}
              <motion.div variants={itemVariants} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
                  <span className="text-[8px] text-white/60 tracking-[0.3em]">SCROLL</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex md:w-1/2 lg:w-2/5 items-center justify-center px-8 lg:px-12 bg-[#faf8f6]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md"
          >
            <motion.h1 variants={itemVariants} className="font-light text-6xl lg:text-7xl text-gray-800 tracking-[0.15em]">
              SELORM
            </motion.h1>
            
            <motion.div
              variants={itemVariants}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block my-4"
            >
              <Heart className="w-10 h-10 text-rose-500 fill-rose-500/80" />
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-light text-6xl lg:text-7xl text-gray-800 tracking-[0.15em]">
              EWURAH ABENA
            </motion.h1>

            <motion.div variants={itemVariants} className="relative mt-6">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-12 h-px bg-amber-400/40" />
              <p className="text-gray-400 text-xs uppercase tracking-[0.5em] font-light">
                invite you to their wedding celebration
              </p>
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-12 h-px bg-amber-400/40" />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex items-center gap-6 text-gray-500">
              <div className="text-center">
                <div className="text-[10px] tracking-wider uppercase">Month</div>
                <div className="text-xl font-light">SEP</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-[10px] tracking-wider uppercase">Day</div>
                <div className="text-2xl font-light">4</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-[10px] tracking-wider uppercase">Year</div>
                <div className="text-lg font-light">2026</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-[10px] tracking-wider uppercase">Day</div>
                <div className="text-base font-light">FRIDAY</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-[10px] tracking-wider uppercase">At</div>
                <div className="text-base font-light">9:00 AM</div>
              </div>
            </motion.div>

            {/* Scroll Indicator - Desktop */}
            <motion.div variants={itemVariants} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent" />
                <span className="text-[8px] text-gray-400 tracking-[0.3em]">SCROLL</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gift Modal - Cleaner & Smaller */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !isProcessing && setShowGiftModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-sm w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {!isProcessing && (
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/80"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Header */}
              <div className="text-center pt-6 pb-3 px-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-50 mb-3">
                  <Gift className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-gray-800 text-lg font-light tracking-wide">Bless the Couple</h3>
                <p className="text-gray-400 text-xs mt-1 font-light">
                  Your generous gift starts their new journey
                </p>
              </div>

              <div className="px-5 space-y-3 pb-5">
                {/* Name */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-wider font-light block mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                    <input
                      type="text"
                      value={giverName}
                      onChange={(e) => setGiverName(e.target.value)}
                      disabled={isProcessing}
                      placeholder="Enter your name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-wider font-light block mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                    <input
                      type="email"
                      value={giverEmail}
                      onChange={(e) => setGiverEmail(e.target.value)}
                      disabled={isProcessing}
                      placeholder="you@email.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Preset Amounts */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-wider font-light block mb-1.5">Amount (GHS)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        disabled={isProcessing}
                        className={`py-1.5 rounded-xl border text-sm transition-all duration-200 ${
                          selectedAmount === amount
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-teal-400'
                        } disabled:opacity-50`}
                      >
                        ₵{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-wider font-light block mb-1">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">₵</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      disabled={isProcessing}
                      placeholder="Enter amount"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-7 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handlePaystackPayment}
                  disabled={isProcessing || !isFormValid()}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₵{getFinalAmount() || 0}</span>
                      <span className="text-xs opacity-70">with Paystack</span>
                    </>
                  )}
                </button>

                <p className="text-gray-400 text-[9px] text-center">
                  Secured by Paystack • Ghana Cedis (GHS)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;