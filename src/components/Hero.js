"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRocket, FaMobileAlt } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row items-center px-4 sm:px-6 md:px-12 lg:px-20 py-12 bg-background text-foreground relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-800 opacity-90"></div>
      
      {/* Content Section - Left Side */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-5xl md:text-6xl" role="img" aria-label="airplane">✈️</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          Travel Smarter.{' '}
          <span className="text-transparent bg-gradient-to-r from-accent-main to-accent-glow bg-clip-text">
            Earn as You Go.
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-10 leading-relaxed"
        >
          Wings AI is the world's first{' '}
          <span className="font-semibold text-accent-glow">Travel-to-Earn platform</span>{' '}
          that rewards you with tokens for exploring destinations, checking in, and sharing your journey. 
          Powered by AI + blockchain, your adventures now come with real value.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-br from-accent-main via-red-500 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg text-lg premium-button-3d transform-gpu transition-all duration-200"
          >
            <FaRocket className="inline mr-3 text-xl align-middle group-active:rotate-12 transition-transform duration-200" />
            Start Your Journey
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-br from-accent-glow via-cyan-400 to-blue-500 text-white font-semibold px-8 py-4 rounded-lg text-lg premium-button-3d-secondary transform-gpu transition-all duration-200"
          >
            <FaMobileAlt className="inline mr-3 text-xl align-middle group-active:scale-110 transition-transform duration-200" />
            Try the Mini App
          </motion.button>
        </motion.div>
      </div>

      {/* Image Section - Right Side */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 mt-12 lg:mt-0 flex justify-center items-center relative z-10"
      >
        <div className="relative">
          {/* Glow effect behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-accent-main to-accent-glow rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
          
          {/* <Image 
            src="" 
            alt="Wings AI Travel to Earn Platform" 
            width={600} 
            height={500} 
            className="relative rounded-2xl object-contain max-w-full h-auto"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          /> */}
        </div>
      </motion.div>

      {/* Custom 3D Button Styles */}
      <style jsx>{`
        .premium-button-3d {
          box-shadow: 
            0 6px 0 #d63031,
            0 12px 20px rgba(214, 48, 49, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .premium-button-3d:active {
          box-shadow: 
            0 2px 0 #d63031,
            0 4px 8px rgba(214, 48, 49, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(4px);
        }
        
        .premium-button-3d-secondary {
          box-shadow: 
            0 6px 0 #0984e3,
            0 12px 20px rgba(9, 132, 227, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .premium-button-3d-secondary:active {
          box-shadow: 
            0 2px 0 #0984e3,
            0 4px 8px rgba(9, 132, 227, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(4px);
        }
        
        @media (max-width: 640px) {
          .premium-button-3d,
          .premium-button-3d-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
