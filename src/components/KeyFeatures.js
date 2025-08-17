"use client"
import { motion } from 'framer-motion';
import { FaCompass, FaMapPin, FaCameraRetro, FaPassport, FaHandshake, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

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

export default function KeyFeatures() {
  const features = [
    {
      icon: FaCompass,
      title: 'AI Travel Planner',
      description: 'Harness the power of artificial intelligence to craft personalized travel routes that perfectly match your budget, available time, and personal interests.',
      highlights: ['Smart Route Optimization', 'Budget-Based Planning', 'Interest Matching'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FaMapPin,
      title: 'Checkpoint Verification',
      description: 'Verify your visits using GPS technology or photo confirmation and earn instant rewards for each authentic check-in at your travel destinations.',
      highlights: ['GPS Verification', 'Photo Authentication', 'Instant Rewards'],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: FaCameraRetro,
      title: 'Content Rewards',
      description: 'Share your unique travel experiences through reviews, photos, and videos. The more engaging your content, the higher your token earnings.',
      highlights: ['Review Sharing', 'Photo Uploads', 'Video Content'],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FaPassport,
      title: 'On-Chain Passport',
      description: 'Build a permanent, blockchain-secured travel passport that records your journeys, achievements, and milestones, giving you true ownership of your travel history.',
      highlights: ['Blockchain Security', 'Digital Badges', 'Milestone Tracking'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FaHandshake,
      title: 'Global Partnerships',
      description: 'Access exclusive benefits and discounts through our extensive network of partner hotels, airlines, tour operators, and local services worldwide.',
      highlights: ['Hotel Discounts', 'Airline Benefits', 'Tour Packages'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-accent-main rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-text-secondary">Platform Capabilities</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Key <HighlightedText><span className='font2'>Features</span></HighlightedText>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl text-balance mx-auto leading-relaxed">
            Discover the comprehensive features that make Wings AI the most advanced travel-to-earn platform
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-border-soft rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:bg-white/8 hover:border-accent-main hover:shadow-2xl hover:transform hover:scale-105">
                
                {/* Icon */}
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mr-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <feature.icon className={`${feature.color} w-8 h-8`} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent-main transition-colors duration-300 flex-1">
                    <HighlightedText>{feature.title}</HighlightedText>
                  </h3>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm text-balance leading-relaxed mb-6 flex-grow">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <FaCheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                      <span className="text-text-secondary text-sm font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-12 border-t border-border-soft"
        >
          <div className="inline-flex items-center gap-4 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent-main text-white rounded-2xl flex items-center justify-center">
                <FaCheckCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-foreground">Ready to Experience These Features?</div>
                <div className="text-sm text-text-secondary">Start your journey with Wings AI today</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-main text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              Get Started
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
