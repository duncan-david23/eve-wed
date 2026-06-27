import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Calendar, MapPin, Camera, HelpCircle, Users, BookOpen, Clock, Sparkles, ArrowRight, Gift, User, Mail } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CountdownSection from '../components/CountdownSection'
import LocationSection from '../components/LocationSection'
import GalleriesSection from '../components/GalleriesSection'
import FAQSection from '../components/FAQSection'
import AttendeesSection from '../components/AttendeesSection'
import LoveStorySection from '../components/LoveStorySection'
import Timeline from '../components/Timeline'
import PaystackPop from '@paystack/inline-js';

const paystackPublicKey = 'pk_test_977623941fe552b3416bc945370b1b21240f26de';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [giverName, setGiverName] = useState('')
  const [giverEmail, setGiverEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const presetAmounts = [50, 100, 200, 500]

  const navItems = [
    { id: 'hero', label: 'Home', icon: Heart },
    { id: 'countdown', label: 'Countdown', icon: Clock },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'lovestory', label: 'Love Story', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ]

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Gift Modal Functions
  const handleGiftClick = () => {
    setIsMenuOpen(false)
    setShowGiftModal(true)
  }

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setSelectedAmount(null)
  }

  const getFinalAmount = () => {
    const amount = selectedAmount || customAmount
    return amount ? parseFloat(amount) : 0
  }

  const isFormValid = () => {
    return giverName.trim() !== '' && 
           giverEmail.trim() !== '' && 
           getFinalAmount() > 0 &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(giverEmail)
  }

  const handlePaystackPayment = () => {
    if (!isFormValid()) return
    
    setIsProcessing(true)

    const popup = new PaystackPop()

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
        console.log('Payment Success:', transaction)
        setShowGiftModal(false)
        setSelectedAmount(null)
        setCustomAmount('')
        setGiverName('')
        setGiverEmail('')
        setIsProcessing(false)
        alert(`Thank you ${giverName}! Your generous gift of ₵${getFinalAmount()} has been received. ❤️`)
      },
      onCancel: () => {
        setIsProcessing(false)
        alert("Payment cancelled. You can try again whenever you're ready.")
      },
      onError: (error) => {
        console.error('Paystack Error:', error)
        setIsProcessing(false)
        alert('There was an error processing your payment. Please try again.')
      }
    })
  }

  return (
    <div className="relative">
      {/* ====== WELCOME MODAL ====== */}
      <AnimatePresence>
        {showWelcomeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowWelcomeModal(false)}
            >
              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 10, opacity: 0 }}
                transition={{ 
                  type: 'spring',
                  damping: 25,
                  stiffness: 500,
                  duration: 0.4
                }}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative top bar */}
                <div className="h-2 bg-gradient-to-r from-teal-400 via-mauve-400 to-amber-400" />
                
                {/* Close button */}
                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                {/* Content */}
                <div className="p-6 pt-8">
                  {/* Header with WhatsApp-style icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30">
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Message from the Couple</h3>
                      <p className="text-xs text-gray-500">❤️ 04.09.2026</p>
                    </div>
                  </div>

                  {/* Main message */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute -top-1 -left-1 text-3xl text-teal-400 opacity-30">"</div>
                      <p className="text-gray-700 text-base leading-relaxed pl-4">
                        <span className="font-medium text-teal-600">Welcome to our little corner of the internet!</span>
                        {' '}We are absolutely thrilled to have you here. This page is a celebration of our beautiful journey - the laughter, the adventures, and the love that has brought us to this special moment.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-teal-50/50 to-mauve-50/50 rounded-xl p-4 border border-teal-100/50">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        <span className="font-medium text-mauve-600">Save the date:</span>
                        {' '}We can't wait to celebrate our Traditional Marriage with you on{' '}
                        <span className="font-semibold text-teal-600">September 4th, 2026</span>.
                        Please remember to RSVP by <span className="font-semibold text-amber-600">September 1st, 2026</span>.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-gray-500 font-light">With love, Selorm & Ewurah</span>
                      </div>
                      <button
                        onClick={() => setShowWelcomeModal(false)}
                        className="group flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-full transition-all hover:shadow-lg hover:shadow-teal-500/30"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative bottom */}
                <div className="px-6 pb-4 flex justify-center gap-1.5">
                  <div className="w-8 h-0.5 rounded-full bg-teal-400" />
                  <div className="w-8 h-0.5 rounded-full bg-mauve-400" />
                  <div className="w-8 h-0.5 rounded-full bg-amber-400" />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ====== GIFT MODAL ====== */}
      <AnimatePresence>
        {showGiftModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
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

      {/* ====== DESKTOP NAVIGATION ====== */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                  isActive 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
          {/* Gift Button in Nav */}
          <button
            onClick={handleGiftClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-300 bg-gradient-to-r from-teal-500 to-mauve-500 text-white shadow-md hover:shadow-lg hover:scale-105"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Bless The Couple</span>
          </button>
        </div>
      </nav>

      {/* ====== MOBILE HAMBURGER BUTTON ====== */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2.5 rounded-full shadow-lg text-teal-600 hover:bg-mauve-600 transition-colors duration-200"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ====== MOBILE MENU OVERLAY ====== */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 20, 
                stiffness: 400,
                mass: 0.5
              }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-40 w-72"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '-20px 0 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
                  <div className="p-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="text-sm font-light text-gray-800">
                    Selorm <span className="text-teal-600">&</span> Ewurah
                  </span>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 ${
                          isActive 
                            ? 'bg-teal-500/20 text-teal-700' 
                            : 'text-gray-600 hover:bg-white/40'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                        <span className={`text-sm ${isActive ? 'font-medium' : 'font-light'}`}>
                          {item.label}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-600" />
                        )}
                      </button>
                    )
                  })}
                  
                  {/* Gift Button in Mobile Menu */}
                  <button
                    onClick={handleGiftClick}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-200 bg-gradient-to-r from-teal-500/10 to-mauve-500/10 text-teal-700 hover:bg-teal-500/20 mt-2 border border-teal-200/50"
                  >
                    <Gift className="w-4 h-4 text-teal-600" />
                    <span className="text-sm font-medium">Send a Gift</span>
                    <span className="ml-auto text-[10px] text-teal-400">❤️</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="py-4 border-t border-white/20 text-center">
                  <p className="text-[10px] text-gray-500 font-light tracking-wider">
                    ❤️ 04.09.2026
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ====== SECTIONS WITH FADE-IN ====== */}
      <div className="pt-0 md:pt-16">
        <section id="hero" className="scroll-mt-20">
          <HeroSection />
        </section>

        <section id="countdown" className="scroll-mt-20">
          <FadeInSection>
            <CountdownSection />
          </FadeInSection>
        </section>

        <section id="location" className="scroll-mt-20">
          <FadeInSection>
            <LocationSection />
          </FadeInSection>
        </section>

        <section id="lovestory" className="scroll-mt-20">
          <FadeInSection>
            <LoveStorySection />
          </FadeInSection>
        </section>

        <section id="gallery" className="scroll-mt-20">
          <FadeInSection>
            <GalleriesSection />
          </FadeInSection>
        </section>

        <section id="timeline" className="scroll-mt-20">
          <FadeInSection>
            <Timeline />
          </FadeInSection>
        </section>

        <section id="attendees" className="scroll-mt-20">
          <FadeInSection>
            <AttendeesSection />
          </FadeInSection>
        </section>

        <section id="faq" className="scroll-mt-20">
          <FadeInSection>
            <FAQSection />
          </FadeInSection>
        </section>
      </div>
    </div>
  )
}

// ====== FADE IN SECTION COMPONENT (inline) ======
const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = React.useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default Home