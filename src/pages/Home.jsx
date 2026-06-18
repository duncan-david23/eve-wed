import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Calendar, MapPin, Camera, HelpCircle, Users, BookOpen, Clock } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import CountdownSection from '../components/CountdownSection'
import LocationSection from '../components/LocationSection'
import GalleriesSection from '../components/GalleriesSection'
import FAQSection from '../components/FAQSection'
import AttendeesSection from '../components/AttendeesSection'
import LoveStorySection from '../components/LoveStorySection'
import Timeline from '../components/Timeline'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

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

  return (
    <div className="relative">
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
        </div>
      </nav>

      {/* ====== MOBILE HAMBURGER BUTTON ====== */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2.5 rounded-full  shadow-lg  text-teal-600 hover:bg-mauve-600 transition-colors duration-200"
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

                {/* Menu Items - No animations */}
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