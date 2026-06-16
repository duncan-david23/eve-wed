import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, Diamond, ArrowDown, Gift, X, User } from 'lucide-react';
import HeroImage from '../assets/sample_hero_img.png';
import PaystackPop from '@paystack/inline-js';

const HeroSection = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [giverName, setGiverName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [50, 100, 200, 500];
  
  // Paystack Public Key - Replace with your actual public key
  const paystackPublicKey = 'pk_test_3bdc97b024233bb522a068bfefbbe9292322b0fa';

  const handleGiftClick = () => {
    setShowGiftModal(true);
  };

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
        console.log('Giver Name:', giverName);
        console.log('Amount: ₵' + getFinalAmount());
        
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

  const isFormValid = () => {
    return giverName.trim() !== '' && getFinalAmount() > 0;
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Light Luxury Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Elegant Light Rays - Teal/Gold blend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-teal-200 rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-200 rounded-full blur-[120px]"
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20"
      >
        {/* Gift Button - Top Right - Wedding Colors */}
        <motion.div
          variants={itemVariants}
          className="absolute top-6 right-4 sm:top-8 sm:right-8 z-30"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGiftClick}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-teal-600 to-teal-700 backdrop-blur-sm border border-teal-400/30 shadow-lg hover:shadow-teal-500/30 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-teal-400/0 group-hover:translate-x-full transition-transform duration-500" />
            <div className="relative flex items-center gap-2">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">Bless the Couple</span>
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            </div>
          </motion.button>
        </motion.div>

        {/* Top Luxury Decoration - Gold accent */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <Diamond className="w-4 h-4 text-amber-400" />
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </motion.div>

        {/* Names */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-800 tracking-wide">
            EVELYN
          </h1>
          
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block my-4 md:my-6"
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 fill-red-500/80" />
          </motion.div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-800 tracking-wide">
            CHRISTIAN
          </h1>
        </motion.div>

        {/* Invitation Line */}
        <motion.div
          variants={itemVariants}
          className="relative mt-6 md:mt-8 mb-10 md:mb-14"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-8 h-px bg-amber-400" />
          <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] font-light">
            invite you to their wedding celebration
          </p>
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-8 h-px bg-amber-400" />
        </motion.div>

        {/* Image Container with Overlapping Blur - Wedding Colors Frame */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-[300px] sm:max-w-[420px] md:max-w-[580px] lg:max-w-[680px] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute inset-[-2px] bg-gradient-to-r from-teal-300 via-amber-300 to-red-300 rounded-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="absolute inset-[-1px] bg-white rounded-2xl"
          />
          
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            src={HeroImage}
            className="relative w-full rounded-2xl shadow-2xl z-10"
            alt="Hero Image"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-md rounded-b-2xl z-20"
            style={{
              height: 'clamp(70px, 18%, 110px)',
              minHeight: '70px',
            }}
          >
            <div className="h-full w-full flex flex-col items-center justify-end pb-4 px-4">
              <motion.p
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-gray-800 text-sm sm:text-base md:text-lg font-serif tracking-wide"
              >
                Evelyn <Heart className="inline-block w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500 mx-1" /> Christian
              </motion.p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 text-teal-500" />
                <span className="text-teal-600 text-[10px] sm:text-xs tracking-wider">SEPTEMBER 4, 2026</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Wedding Details Card - Wedding Colors */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-14 md:mt-16 bg-white/80 backdrop-blur-md rounded-2xl border border-teal-200 shadow-xl px-6 sm:px-8 md:px-10 py-6 sm:py-7 md:py-8 max-w-[340px] sm:max-w-[420px] md:max-w-[520px] w-full"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-5 md:mb-7">
            <div className="text-center">
              <div className="text-teal-500 text-[10px] sm:text-xs font-light tracking-wider mb-1">MONTH</div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-700 tracking-wide"
              >
                SEP
              </motion.div>
            </div>
            <div className="text-3xl sm:text-4xl text-amber-300">•</div>
            <div className="text-center">
              <div className="text-teal-500 text-[10px] sm:text-xs font-light tracking-wider mb-1">DAY</div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-700"
              >
                4
              </motion.div>
            </div>
            <div className="text-3xl sm:text-4xl text-amber-300">•</div>
            <div className="text-center">
              <div className="text-teal-500 text-[10px] sm:text-xs font-light tracking-wider mb-1">YEAR</div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-500"
              >
                2026
              </motion.div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-300 to-transparent my-4 md:my-5" />

          <div className="text-center">
            <div className="mb-3 md:mb-4">
              <div className="text-teal-500 text-[10px] sm:text-xs font-light tracking-wider mb-1">DAY</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-700 tracking-wide">FRIDAY</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500" />
                <div className="text-teal-500 text-[10px] sm:text-xs font-light tracking-wider">AT</div>
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-700"
              >
                9:00 AM
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={fadeInVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="w-px h-10 bg-gradient-to-b from-teal-400 to-transparent" />
            <ArrowDown className="w-3 h-3 text-teal-400" />
            <span className="text-[8px] text-teal-400 tracking-[0.2em]">SCROLL</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gift Modal - Wedding Colors */}
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {!isProcessing && (
                <button
                  onClick={() => setShowGiftModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Header - Wedding Colors */}
              <div className="text-center pt-8 pb-4 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-100 via-amber-100 to-red-100 mb-4">
                  <Gift className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-gray-800 text-2xl font-serif tracking-wide">Bless the Couple</h3>
                <p className="text-gray-500 text-sm mt-2 font-light">
                  Your generous gift will help start their new journey together
                </p>
              </div>

              {/* Name Input */}
              <div className="px-6 py-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-light">Your Name *</p>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 w-4 h-4" />
                  <input
                    type="text"
                    value={giverName}
                    onChange={(e) => setGiverName(e.target.value)}
                    disabled={isProcessing}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="px-6 py-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-light">Select Amount (GHS)</p>
                <div className="grid grid-cols-4 gap-3">
                  {presetAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAmountSelect(amount)}
                      disabled={isProcessing}
                      className={`py-3 rounded-xl border transition-all duration-200 ${
                        selectedAmount === amount
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 border-transparent text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-teal-400'
                      } disabled:opacity-50`}
                    >
                      <span className="text-lg font-light">₵{amount}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="px-6 py-3">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 font-light">Custom Amount (GHS)</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 text-xl">₵</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    disabled={isProcessing}
                    placeholder="Enter amount"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                    min="1"
                    step="1"
                  />
                </div>
              </div>

              {/* Paystack Button - Wedding Colors */}
              <div className="px-6 py-6">
                {isFormValid() ? (
                  <button
                    onClick={handlePaystackPayment}
                    disabled={isProcessing}
                    className="w-full rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 py-4 text-white font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Pay with Paystack</span>
                        <span className="text-amber-300">₵{getFinalAmount()}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-xl bg-gray-200 py-4 text-gray-400 font-medium tracking-wide cursor-not-allowed"
                  >
                    Enter Name & Amount to Continue
                  </button>
                )}
              </div>

              {/* Footer Note */}
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