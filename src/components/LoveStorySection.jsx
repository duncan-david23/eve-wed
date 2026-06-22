import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  User,
  Coffee,
  Sun,
  Moon,
  Star,
  Camera,
  Gift,
  Flower2
} from 'lucide-react';
import groom_image from '../assets/groom_img.jpg';
import bride_image from '../assets/bride_img.jpg';

// Hook: fires once when the ref element enters the viewport
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// ─── Animated wrappers ────────────────────────────────────────────────────────

// Drops in from above with a spring-like overshoot using pure CSS
function DropIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(-48px) scale(0.97)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Slides up from below — used for header text elements
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const brideStory = {
  name: "EVELYN ABENA KRAMPAH",
  title: "The Bride",
  image: bride_image,
  story: [
    { year: "2020", icon: Coffee, text: "It all started with a coffee date that changed everything. I was immediately drawn to his warmth, his laughter, and the way his eyes lit up when he talked about his dreams." },
    { year: "2021", icon: Sun,    text: "Through the ups and downs of life, we grew together. Every sunrise reminded me that I had found my sunshine in him. Our love deepened with each passing day." },
    { year: "2022", icon: Heart,  text: "He asked me to be his forever under the stars. In that magical moment, I knew I had found my home. My heart said yes before I could even speak the words." },
    { year: "2023", icon: Star,   text: "Planning our future together has been the greatest adventure. From choosing colors to dreaming about our forever, every step has been filled with love and excitement." },
  ],
  quote: "From the moment I met him, I knew he was the one my soul had been searching for.",
};

const groomStory = {
  name: "CHRISTIAN SELORM DZIKUNU",
  title: "The Groom",
  image: groom_image,
  story: [
    { year: "2020", icon: Coffee, text: "That first coffee date was unforgettable. I saw something special in her — a spark, a warmth, a beauty that went far beyond what my eyes could see." },
    { year: "2021", icon: Moon,   text: "She became my peace, my anchor. Through every storm, her love was the calm I needed. I knew I had found someone truly extraordinary." },
    { year: "2022", icon: Gift,   text: "Getting down on one knee was the easiest decision I've ever made. Seeing her eyes fill with tears of joy, I knew I had just made the best promise of my life." },
    { year: "2023", icon: Camera, text: "Every moment with her is a memory I want to capture forever. From wedding planning to building our dreams, I can't wait to start our forever together." },
  ],
  quote: "She is my greatest blessing, my best friend, and the love of my life. Forever with her is not long enough.",
};

const YEAR_COLORS = {
  "2020": "bg-teal-500",
  "2021": "bg-amber-500",
  "2022": "bg-purple-500",
  "2023": "bg-teal-500",
};

// ─── Timeline item with per-item in-view trigger ──────────────────────────────

function TimelineItem({ item, index, cardInView }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!cardInView) return;
    // Stagger each item after the card itself is visible
    const t = setTimeout(() => setVisible(true), 400 + index * 200);
    return () => clearTimeout(t);
  }, [cardInView, index]);

  const Icon = item.icon;
  const yearBg = YEAR_COLORS[item.year] ?? 'bg-teal-500';

  return (
    <div
      className="flex items-start gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-28px)',
        transition: `opacity 0.5s ease, transform 0.65s cubic-bezier(0.34,1.56,0.64,1)`,
      }}
    >
      {/* Year badge */}
      <div
        className={`flex-shrink-0 w-16 h-16 rounded-2xl ${yearBg} flex flex-col items-center justify-center border border-white/20 shadow-sm`}
      >
        <span className="text-[9px] font-medium text-white uppercase tracking-widest">Year</span>
        <span className="text-lg font-light text-white">{item.year}</span>
      </div>

      {/* Content */}
      <div
        className="flex-1 pt-1"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-12px)',
          transition: `opacity 0.5s ease ${0.08}s, transform 0.5s ease ${0.08}s`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-xl bg-white/15 border border-white/20">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div className="h-px flex-1 bg-white/20" />
        </div>
        <p className="text-white/90 text-[13px] md:text-sm leading-relaxed">{item.text}</p>
      </div>
    </div>
  );
}

// ─── Story card ───────────────────────────────────────────────────────────────

function StoryCard({ storyData, isBride, delay = 0 }) {
  const [cardRef, cardInView] = useInView();
  const cardBg   = isBride ? 'bg-teal-600'   : 'bg-purple-600';
  const subColor = isBride ? 'text-teal-200'  : 'text-purple-200';

  return (
    <div
      ref={cardRef}
      className={`${cardBg} rounded-3xl shadow-2xl overflow-hidden`}
      style={{
        opacity: cardInView ? 1 : 0,
        transform: cardInView ? 'translateY(0) scale(1)' : 'translateY(-52px) scale(0.96)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.75s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      }}
    >
      {/* Header */}
      <div className="p-8 md:p-10">
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img 
              src={storyData.image} 
              alt={storyData.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className=" font-light text-white">{storyData.name}</h3>
            <p className={`${subColor} text-base font-light`}>{storyData.title}</p>
          </div>
        </div>

        {/* Quote — fades in shortly after card lands */}
        <div
          className="p-5 bg-white/10 border border-white/20 rounded-2xl italic text-white/90 leading-relaxed text-sm"
          style={{
            opacity: cardInView ? 1 : 0,
            transform: cardInView ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity 0.55s ease ${delay + 0.25}s, transform 0.55s ease ${delay + 0.25}s`,
          }}
        >
          <span className="text-amber-300 text-xl not-italic">"</span>
          {storyData.quote}
          <span className="text-amber-300 text-xl not-italic">"</span>
        </div>
      </div>

      {/* Timeline — items reveal one by one after card is visible */}
      <div className="px-8 md:px-10 pb-8 md:pb-10 pt-4 bg-white/5 space-y-7">
        {storyData.story.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} cardInView={cardInView} />
        ))}
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

const LoveStorySection = () => {
  const [activeStory, setActiveStory] = useState('both');

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Dot background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #6B7280 0.8px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative py-20 sm:py-24 md:py-28 px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-400" />
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-500 fill-teal-500" />
                <Flower2 className="w-5 h-5 text-purple-500" />
                <Heart className="w-5 h-5 text-teal-500 fill-teal-500" />
              </div>
              <div className="h-px w-12 bg-amber-400" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-teal-600 text-xs font-light tracking-[4px] uppercase mb-3">
              Our Journey
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-800 tracking-tight">
              How We Found Each Other
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm sm:text-base">
              A beautiful story of love, growth, and destiny
            </p>
          </FadeUp>
        </div>

        {/* ── Toggle tabs ── */}
        <DropIn delay={0.35} className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-3xl p-1.5 shadow-lg border border-gray-200">
            {[
              { label: "Both",  value: "both",  Icon: Heart },
              { label: "Bride", value: "bride", Icon: User  },
              { label: "Groom", value: "groom", Icon: User  },
            ].map(({ label, value, Icon }) => (
              <button
                key={value}
                onClick={() => setActiveStory(value)}
                className={`px-6 py-3 rounded-3xl text-sm font-light transition-all flex items-center gap-2 active:scale-95
                  ${activeStory === value
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </DropIn>

        {/* ── Cards ── */}
        <div className="max-w-5xl mx-auto">
          <div
            className={`grid gap-8 md:gap-12 ${
              activeStory === 'both' ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'
            }`}
          >
            {(activeStory === 'both' || activeStory === 'bride') && (
              <StoryCard
                key={`bride-${activeStory}`}
                storyData={brideStory}
                isBride={true}
                delay={0}
              />
            )}
            {(activeStory === 'both' || activeStory === 'groom') && (
              <StoryCard
                key={`groom-${activeStory}`}
                storyData={groomStory}
                isBride={false}
                delay={activeStory === 'both' ? 0.14 : 0}
              />
            )}
          </div>
        </div>

        {/* ── Bottom accent ── */}
        <FadeUp delay={0.5} className="flex justify-center mt-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-teal-400" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <div className="w-12 h-px bg-amber-400" />
          </div>
        </FadeUp>

      </div>
    </div>
  );
};

export default LoveStorySection;