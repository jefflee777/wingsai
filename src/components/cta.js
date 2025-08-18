"use client"
import { motion } from 'framer-motion';
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
      {/* Premium background elements */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-10 right-16 w-32 h-32 bg-gradient-to-r from-accent-main/20 to-accent-glow/20 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear",
          delay: 2
        }}
        className="absolute bottom-16 left-10 w-40 h-40 bg-gradient-to-r from-accent-glow/20 to-accent-main/20 rounded-full blur-3xl"
      ></motion.div>

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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-accent-main text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl overflow-hidden transition-all duration-300 w-full sm:w-auto premium-button-primary"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-glow to-accent-main opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <FaRocket className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                  Try Wings AI
                  <FaArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-transparent border-2 border-border-strong text-foreground font-semibold px-8 py-4 rounded-xl text-lg overflow-hidden transition-all duration-300 w-full sm:w-auto premium-button-secondary"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-main to-accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                  <FaMobileAlt className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Open Mini App
                </div>
              </motion.button>
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
                <span className="text-sm font-medium">Trusted by 10K+ Travelers</span>
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

      {/* Additional floating elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-20 right-8 w-4 h-4 bg-accent-glow/40 rounded-full"
      ></motion.div>

      {/* Custom 3D Button Styles */}
      <style jsx>{`
        .premium-button-primary {
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 10px 20px rgba(255, 111, 97, 0.3),
            0 6px 0 rgba(220, 95, 82, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: perspective(100px) rotateX(5deg);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .premium-button-primary:hover {
          transform: perspective(100px) rotateX(5deg) translateY(-2px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 15px 30px rgba(255, 111, 97, 0.4),
            0 8px 0 rgba(220, 95, 82, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        .premium-button-primary:active {
          transform: perspective(100px) rotateX(5deg) translateY(2px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 5px 10px rgba(255, 111, 97, 0.2),
            0 2px 0 rgba(220, 95, 82, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .premium-button-secondary {
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.3),
            0 10px 20px rgba(0, 0, 0, 0.1),
            0 6px 0 rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: perspective(100px) rotateX(5deg);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .premium-button-secondary:hover {
          transform: perspective(100px) rotateX(5deg) translateY(-2px);
          box-shadow: 
            0 0 0 2px rgba(255, 111, 97, 0.5),
            0 15px 30px rgba(0, 0, 0, 0.15),
            0 8px 0 rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .premium-button-secondary:active {
          transform: perspective(100px) rotateX(5deg) translateY(2px);
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.3),
            0 5px 10px rgba(0, 0, 0, 0.1),
            0 2px 0 rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
}
