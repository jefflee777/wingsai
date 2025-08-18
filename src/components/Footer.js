"use client"
import { motion } from 'framer-motion';
import { FaTwitter, FaTelegramPlane, FaEthereum, FaCoins, FaArrowUp } from 'react-icons/fa';

// Custom SVG underline component for highlighted text
const HighlightedText = ({ children }) => {
  return (
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
};

export default function Footer() {
  const socialLinks = [
    { 
      icon: FaTwitter, 
      label: "Twitter", 
      href: "https://twitter.com/wingsai",
      color: "hover:text-blue-400"
    },
    { 
      icon: FaTelegramPlane, 
      label: "Telegram", 
      href: "https://t.me/wingsai",
      color: "hover:text-blue-500"
    },
    { 
      icon: FaEthereum, 
      label: "BSC Scan", 
      href: "https://bscscan.com/token/wingsai",
      color: "hover:text-yellow-500"
    },
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Tokenomics", href: "#tokenomics" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground border-t border-border-soft overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-10 right-10 w-32 h-32 border border-accent-main/10 rounded-full opacity-20"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-8 w-24 h-24 bg-accent-glow/5 rounded-2xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-main to-accent-glow rounded-2xl flex items-center justify-center shadow-xl">
                <FaCoins className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black">
                Wings <HighlightedText>AI</HighlightedText>
              </h2>
            </div>
            <p className="text-lg text-text-secondary max-w-md leading-relaxed">
              Revolutionizing travel experiences through AI-powered rewards and blockchain technology. 
              <span className="block mt-2 font-semibold text-accent-main">Your journey, your rewards.</span>
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="text-text-secondary hover:text-accent-main transition-all duration-300 font-semibold text-lg relative group"
              >
                {link.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-main transition-all duration-300 group-hover:w-full"></div>
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <span className="text-text-secondary font-medium mr-2">Follow us:</span>
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`w-12 h-12 bg-white/5 backdrop-blur-sm border border-border-soft rounded-xl flex items-center justify-center text-text-secondary ${social.color} transition-all duration-300 hover:border-accent-main hover:shadow-lg`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border-soft to-transparent mb-8"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="text-text-secondary text-sm">
            <span>&copy; {new Date().getFullYear()} Wings AI. All rights reserved.</span>
            <span className="mx-2">•</span>
            <span>Built with ❤️ for travelers worldwide</span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-text-secondary hover:text-accent-main transition-colors duration-300 bg-white/5 backdrop-blur-sm border border-border-soft rounded-xl px-4 py-2 hover:border-accent-main"
          >
            <FaArrowUp className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Top</span>
          </motion.button>
        </motion.div>

        {/* Token Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-border-soft text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent-main/10 border border-accent-main/20 rounded-full px-6 py-3">
            <FaCoins className="text-accent-main w-5 h-5" />
            <span className="text-accent-main font-semibold">$WINGS Token</span>
            <span className="text-text-secondary mx-2">•</span>
            <span className="text-sm text-text-secondary">Powering the future of travel rewards</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
