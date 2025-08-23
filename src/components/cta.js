"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRocket, FaMobileAlt, FaArrowRight, FaPlane, FaCoins, FaStar } from 'react-icons/fa';

// Custom SVG underline component for highlighted text
const HighlightedText = ({ children }) => {
  return (
    <span className="relative font2 inline-block font-semibold text-accent-main">
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full h-2"
        viewBox="0 0 100 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path 
          d="M2 8C25 12 75 2 98 8" 
          stroke="#FE6F61" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
};

export default function CTASection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main CTA Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-white/5 backdrop-blur-sm border border-border-soft rounded-3xl overflow-hidden shadow-2xl"
        > 
          {/* Content */}
          <div className="px-8 sm:px-12 lg:px-16 py-16 text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-full px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 bg-accent-main rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-text-secondary">Start Your Journey Today</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl text-balance font-black mb-6 leading-tight max-w-5xl mx-auto"
            >
              Every trip is a <HighlightedText><span className='tracking-wide pr-1'>story</span></HighlightedText>,
              <br />
              With Wings AI, every story <HighlightedText><span className='tracking-wide pr-1'>earns value</span></HighlightedText>.
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl text-text-secondary text-balance mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Transform your travel experiences into meaningful rewards. Explore the world, share your adventures, and earn tokens with every journey you take.
            </motion.p>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 w-full justify-center"
        >
          <Link href='/ai'>
          <button className="group bg-accent-main text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg flex items-center gap-3 justify-center w-full sm:w-auto transition-all duration-300 hover:bg-accent-main/90cc focus:outline-none">
            Try Wings AI
            <FaArrowRight className="ml-2 text-base group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          </Link>
          <a href='https://t.me/wingsaibot' target='_blank'>
          <button className="group bg-white/10 border border-border-soft text-foreground px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 w-full sm:w-auto backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-accent-main hover:text-accent-main focus:outline-none">
            <FaMobileAlt className="text-2xl" />
            Open Mini App
          </button>
          </a>
        </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border-soft"
            >
              <div className="flex items-center gap-2 text-text-secondary">
                <FaStar className="text-accent-main" />
                <span className="text-sm font-medium">Trusted by 110K+ Travelers</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <FaCoins className="text-accent-glow" />
                <span className="text-sm font-medium">Instant Rewards</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <FaPlane className="text-accent-main" />
                <span className="text-sm font-medium">Global Coverage</span>
              </div>
            </motion.div>
          </div>

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}
