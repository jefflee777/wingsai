"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdGeneratingTokens, MdOutlineVerified } from "react-icons/md";


export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row items-center px-4 sm:px-6 md:px-12 lg:px-20 py-12 bg-background text-foreground relative overflow-hidden">
      {/* Content Section - Left Side */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl relative z-10">
        <motion.h1 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl sm:text-left text-center font-bold mb-6 leading-[1.1] tracking-tight"
        >
          Travel{' '}
          <span className="relative px-2 text-4xl sm:text-5xl lg:text-7xl">
            Smarter
            <div className="absolute left-0 sm:top-4 top-2 w-full h-fit rounded-full">
                <Image src='/circle.svg' alt='svg' width={300} height={200} className='scale-[124%]'/>
            </div>
          </span>
          <br />
          <span className="text-accent-main font-black">Earn</span> as You{' '}
          <span className="italic font-light font2">Go</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm sm:text-2xl sm:text-left text-center text-balance text-text-secondary mb-10 leading-relaxed font-light max-w-xl"
        >
          Transform every journey into rewards with{' '}
          <span className="font-semibold text-foreground">Wings AI</span>. 
          Explore destinations, earn tokens, and unlock real-world value through 
          our AI-powered blockchain ecosystem.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          {/* Primary Button */}
          <button className="group relative sm:scale-100 scale-75 bg-white text-background font-bold px-8 py-4 rounded-xl text-lg overflow-hidden premium-button-primary">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-main to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-center flex items-center justify-center group-hover:text-white transition-colors duration-300">
              {/* <FaRocket className="mr-3 text-xl group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" /> */}
              Start Your Journey
              <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>

          {/* Secondary Button */}
          <button className="group relative bg-transparent sm:scale-100 scale-75 border-2 border-border-strong text-foreground font-semibold px-8 py-4 rounded-xl text-lg overflow-hidden premium-button-secondary">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-glow to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center group-hover:text-background transition-colors duration-300">
              <FaMobileAlt className="mr-3 text-xl group-hover:scale-110 transition-transform duration-300" />
              Try Mini App
            </div>
          </button>
        </motion.div>

        {/* Stats or trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.9 }}
          className="sm:flex hidden flex-wrap gap-8 mt-12 pt-8 border-t border-border-soft"
        >
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-accent-glow">110K+</span>
            <span className="text-sm text-text-secondary">Early Users</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-accent-main">150+</span>
            <span className="text-sm text-text-secondary">Destinations</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">24/7</span>
            <span className="text-sm text-text-secondary">AI Support</span>
          </div>
        </motion.div>
      </div>

      {/* Image Section - Right Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, delay: 0.4 }}
        className="flex-1 mt-16 lg:mt-0 flex justify-center items-center relative z-10"
      >
        <div className="relative">
          {/* Floating cards around the main image */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -left-8 z-10 bg-border-soft backdrop-blur-sm rounded-2xl p-2.5 border border-border-soft"
          >
            <div className="text-sm font-semibold text-text-secondary flex items-center gap-2"><div className='bg-[#FF5300] inline-block p-1 rounded-lg'><GiArtificialIntelligence size={30} color='white'/></div> AI Recommendations</div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 -left-6 z-10 bg-border-soft backdrop-blur-sm rounded-2xl p-2.5 border border-border-soft"
          >
            <div className="text-sm font-semibold text-text-secondary flex items-center gap-2"><div className='bg-green-600 inline-block p-1 rounded-lg'><MdGeneratingTokens size={30} color='white'/></div> Earn Tokens</div>
          </motion.div>
          
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 -right-28 z-10 bg-border-soft backdrop-blur-sm rounded-2xl p-2.5 border border-border-soft"
          >
            <div className="text-sm font-semibold text-text-secondary flex items-center gap-2"><div className='bg-blue-700 inline-block p-1 rounded-lg'><MdOutlineVerified size={30} color='white'/></div> Blockchain Verified</div>
          </motion.div>
          
            <Image 
              src="/heroimage.png" 
              alt="Wings AI Travel to Earn Platform" 
              width={500} 
              height={500} 
              quality={100}
              className="rounded-2xl object-contain max-w-full h-auto sm:scale-125 scale-100"
              priority
            />
        </div>
      </motion.div>

      {/* Custom 3D Button Styles */}
      <style jsx>{`
        .premium-button-primary {
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.1),
            0 4px 0 rgba(200, 200, 200, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transform: perspective(100px) rotateX(5deg);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .premium-button-primary:hover {
          transform: perspective(100px) rotateX(5deg) translateY(-2px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 12px 24px rgba(0, 0, 0, 0.15),
            0 6px 0 rgba(200, 200, 200, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        
        .premium-button-primary:active {
          transform: perspective(100px) rotateX(5deg) translateY(2px);
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 4px 8px rgba(0, 0, 0, 0.1),
            0 1px 0 rgba(200, 200, 200, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        
        .premium-button-secondary {
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.05),
            0 4px 0 rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: perspective(100px) rotateX(5deg);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .premium-button-secondary:hover {
          transform: perspective(100px) rotateX(5deg) translateY(-2px);
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.5),
            0 12px 24px rgba(0, 0, 0, 0.1),
            0 6px 0 rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .premium-button-secondary:active {
          transform: perspective(100px) rotateX(5deg) translateY(2px);
          box-shadow: 
            0 0 0 2px rgba(255, 255, 255, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.05),
            0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 640px) {
          .premium-button-primary,
          .premium-button-secondary {
            width: 100%;
            transform: perspective(100px) rotateX(3deg);
          }
          
          .premium-button-primary:hover,
          .premium-button-secondary:hover {
            transform: perspective(100px) rotateX(3deg) translateY(-1px);
          }
        }
      `}</style>
    </section>
  );
}
