"use client"
import { motion } from 'framer-motion';
import { FaRobot, FaMobileAlt, FaArrowRight } from 'react-icons/fa';

// Custom underline SVG for highlighted text
const HighlightedText = ({ children }) => (
  <span className="relative inline-block font-semibold text-accent-main">
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

export default function CTASection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background relative overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: 'spring' }}
        className="max-w-4xl mx-auto rounded-3xl bg-white/5 backdrop-blur-sm border border-border-soft shadow-2xl p-10 flex flex-col items-center gap-10"
      >
        {/* Decorative floating icons */}
        <motion.div
          animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-9 left-10 w-12 h-12 bg-accent-main rounded-full flex items-center justify-center shadow-xl"
        >
          <FaRobot className="text-2xl text-white" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -14, 0], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-9 right-10 w-10 h-10 bg-accent-glow rounded-full flex items-center justify-center shadow-xl"
        >
          <FaMobileAlt className="text-xl text-white" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-black text-center mb-4"
        >
          <HighlightedText>
            Your journey, rewarded.
          </HighlightedText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-xl sm:text-2xl text-text-secondary text-center max-w-2xl mb-8 font-medium"
        >
          Every adventure is unique. With <span className="font-semibold text-accent-main">Wings AI</span>, your stories turn into real rewards. Explore. Share. Earn.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 w-full justify-center"
        >
          <button className="group bg-accent-main text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg flex items-center gap-3 w-full sm:w-auto transition-all duration-300 hover:bg-accent-glow focus:outline-none">
            <FaRobot className="text-2xl" />
            Try Wings AI
            <FaArrowRight className="ml-2 text-base group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button className="group bg-white/10 border border-border-soft text-foreground px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 w-full sm:w-auto backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-accent-main hover:text-accent-main focus:outline-none">
            <FaMobileAlt className="text-2xl" />
            Open Mini App
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
