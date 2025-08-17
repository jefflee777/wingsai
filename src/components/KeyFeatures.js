import { motion } from 'framer-motion';
import { FaCompass, FaMapPin, FaCameraRetro, FaPassport, FaHandshake, FaStar } from 'react-icons/fa';

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
      id: 1,
      emoji: '🧭',
      icon: FaCompass,
      title: 'AI Travel Planner',
      description: 'Smart routes built for you.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      emoji: '📌',
      icon: FaMapPin,
      title: 'Checkpoint Verification',
      description: 'Earn instantly when you check in.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 3,
      emoji: '📸',
      icon: FaCameraRetro,
      title: 'Content Rewards',
      description: 'Share your travel story and earn more.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      emoji: '🌍',
      icon: FaPassport,
      title: 'On-Chain Passport',
      description: 'Collect badges, track milestones, and own your journey.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 5,
      emoji: '🤝',
      icon: FaHandshake,
      title: 'Global Partnerships',
      description: 'Hotels, airlines, and tours accepting tokens.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-full px-4 py-2 mb-6">
            <FaStar className="text-accent-main text-sm" />
            <span className="text-sm font-medium text-text-secondary">What Makes Us Special</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Key <HighlightedText>Features</HighlightedText>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make Wings AI the ultimate travel-to-earn platform
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`relative bg-white/5 backdrop-blur-sm border-2 ${feature.borderColor} rounded-3xl p-8 h-full transition-all duration-300 hover:bg-white/10 hover:border-accent-main hover:shadow-xl hover:transform hover:scale-105`}>
                
                {/* Feature Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent-main text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                  {feature.id}
                </div>

                {/* Icon Container */}
                <div className="mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-20 h-20 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    {/* Emoji Background */}
                    <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">
                      {feature.emoji}
                    </div>
                    
                    {/* React Icon */}
                    <feature.icon className={`${feature.color} w-8 h-8 relative z-10`} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-accent-main transition-colors duration-300">
                    <HighlightedText>{feature.title}</HighlightedText>
                  </h3>
                  
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-6 h-6 border-2 border-accent-main rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent-main rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-6 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent-main text-white rounded-2xl flex items-center justify-center">
                <FaStar className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-foreground">Experience All Features</div>
                <div className="text-sm text-text-secondary">Join the revolution in travel rewards</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-main text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Subtle background decorations */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-20 right-10 w-6 h-6 border border-accent-main/30 rounded-full opacity-30"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 left-8 w-4 h-4 bg-accent-glow/30 rounded-full"
      ></motion.div>
    </section>
  );
}
