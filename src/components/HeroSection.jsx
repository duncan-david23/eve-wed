import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, Gift, X, User } from 'lucide-react';
import HeroImage from '../assets/sample_hero_img.png';
import PaystackPop from '@paystack/inline-js';

const HeroSection = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [giverName, setGiverName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);

  const presetAmounts = [50, 100, 200, 500];
  
  const paystackPublicKey = 'pk_test_3bdc97b024233bb522a068bfefbbe9292322b0fa';

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
    return giverName.trim() !== '' && getFinalAmount() > 0;
  };

  const handlePaystackPayment = () => {
    if (!isFormValid()) return;
    
    setIsProcessing(true);

    const popup = new PaystackPop();

    popup.newTransaction({
      key: paystackPublicKey,
      email: `${giverName.toLowerCase().replace(/\s/g, '')}@wedding.com`,
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
              className="rounded-full bg-white/10 backdrop-blur-md border border-white/20  shadow-2xl hover:bg-white/20 transition-all duration-300 px-8 py-3.5 flex items-center gap-3"
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
        
        {/* Image Section - Full width on mobile, Left on desktop */}
        <div className="relative w-full h-screen md:h-auto md:w-1/2 lg:w-3/5">
          <div className="absolute inset-0">
            <img
              src={HeroImage}
              alt="Selorm & Ewurah"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Mobile Content - Overlay on Image */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
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
                EWURAH
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

        {/* Desktop Content - Right Side */}
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
              EWURAH
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

      {/* Gift Modal */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => !isProcessing && setShowGiftModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!isProcessing && (
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="text-center pt-8 pb-4 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Gift className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-gray-800 text-2xl font-light tracking-wide">Bless the Couple</h3>
                <p className="text-gray-500 text-sm mt-2 font-light">
                  Your generous gift will help start their new journey together
                </p>
              </div>

              <div className="px-6 py-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-light">Your Name *</p>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={giverName}
                    onChange={(e) => setGiverName(e.target.value)}
                    disabled={isProcessing}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="px-6 py-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-light">Select Amount (GHS)</p>
                <div className="grid grid-cols-4 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      disabled={isProcessing}
                      className={`py-3 rounded-xl border transition-all duration-200 ${
                        selectedAmount === amount
                          ? 'bg-gray-800 border-gray-800 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400'
                      } disabled:opacity-50`}
                    >
                      <span className="text-lg font-light">₵{amount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 py-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-light">Custom Amount (GHS)</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">₵</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    disabled={isProcessing}
                    placeholder="Enter amount"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
                    min="1"
                    step="1"
                  />
                </div>
              </div>

              <div className="px-6 py-6">
                {isFormValid() ? (
                  <button
                    onClick={handlePaystackPayment}
                    disabled={isProcessing}
                    className="w-full rounded-xl bg-gray-800 py-4 text-white font-light tracking-wide hover:bg-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay with Paystack</span>
                        <span className="text-gray-300">₵{getFinalAmount()}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-xl bg-gray-200 py-4 text-gray-400 font-light tracking-wide cursor-not-allowed"
                  >
                    Enter Name & Amount to Continue
                  </button>
                )}
              </div>

              <div className="text-center pb-6 px-6">
                <p className="text-gray-400 text-[10px] tracking-wide">
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