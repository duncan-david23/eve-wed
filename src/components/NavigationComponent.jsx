import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Calendar, MapPin, Camera, HelpCircle, Users, BookOpen, Clock } from 'lucide-react';

const Navigation = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { id: 'hero', label: 'Home', icon: Heart },
    { id: 'countdown', label: 'Countdown', icon: Clock },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'lovestory', label: 'Love Story', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Desktop Navigation - Fixed on Hero */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-light transition-all duration-300 ${
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-100/20"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed top-0 right-0 bottom-0 z-40 w-64 bg-white shadow-2xl"
          >
            <div className="flex flex-col h-full pt-20 px-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <Heart className="w-5 h-5 text-teal-600 fill-teal-600" />
                <span className="text-sm font-light tracking-wide text-gray-800">
                  Selorm & Ewurah
                </span>
              </div>

              <div className="flex-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      variants={itemVariants}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                      <span className={`text-sm font-light ${isActive ? 'font-medium' : ''}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-600" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="py-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 text-center font-light tracking-wider">
                  ❤️ 04.09.2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;