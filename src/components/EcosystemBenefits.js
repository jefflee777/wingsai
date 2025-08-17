"use client"
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaHandshake, FaUsers, FaArrowRight, FaCheckCircle, FaCoins, FaStore, FaHeart } from 'react-icons/fa';

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

export default function EcosystemBenefits() {
  const benefits = [
    {
      icon: FaGlobeAmericas,
      title: 'Travelers',
      subtitle: 'Explore & Earn',
      description: 'Transform every journey into a rewarding experience. Earn tokens while discovering new destinations, sharing experiences, and building your travel legacy.',
      features: [
        'Earn tokens for every check-in',
        'AI-powered personalized routes',
        'Exclusive travel rewards & discounts',
        'Build your digital travel passport'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      accentIcon: FaCoins
    },
    {
      icon: FaHandshake,
      title: 'Partners',
      subtitle: 'Grow Your Business',
      description: 'Join our network of hotels, airlines, and tour operators. Accept Wings AI tokens and attract a new generation of tech-savvy travelers.',
      features: [
        'Access to global traveler network',
        'Token payment integration',
        'Increased brand visibility',
        'Data insights & analytics'
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      accentIcon: FaStore
    },
    {
      icon: FaUsers,
      title: 'Community',
      subtitle: 'Global Movement',
      description: 'Be part of a revolutionary travel ecosystem that rewards exploration, fosters connections, and creates lasting memories across the globe.',
      features: [
        'Connect with fellow travelers',
        'Share experiences & earn rewards',
        'Participate in global challenges',
        'Shape the future of travel'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      accentIcon: FaHeart
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
            <span className="text-sm font-medium text-text-secondary">For Everyone</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Ecosystem <HighlightedText>Benefits</HighlightedText>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how Wings AI creates value and opportunities for every participant in our travel ecosystem
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`relative bg-white/5 backdrop-blur-sm border-2 ${benefit.borderColor} rounded-3xl p-8 h-full transition-all duration-300 hover:bg-white/8 hover:border-accent-main hover:shadow-2xl hover:transform hover:scale-105`}>
                
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                    >
                      <benefit.icon className={`${benefit.color} w-8 h-8`} />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-accent-main transition-colors duration-300">
                        <HighlightedText>{benefit.title}</HighlightedText>
                      </h3>
                      <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                        {benefit.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Accent Icon */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <benefit.accentIcon className="w-6 h-6 text-accent-main" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {benefit.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <FaCheckCircle className="text-accent-main w-4 h-4 flex-shrink-0" />
                      <span className="text-text-secondary font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-auto pt-6 border-t border-border-soft">
                  <button className="group/btn flex items-center gap-2 text-accent-main font-semibold hover:text-accent-glow transition-colors duration-300">
                    <span>Join as {benefit.title}</span>
                    <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-accent-main/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Join the <HighlightedText>Wings AI</HighlightedText> Ecosystem?
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Whether you're a traveler seeking rewards, a business looking to grow, or someone passionate about revolutionary travel experiences, there's a place for you in our ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-main text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <FaGlobeAmericas className="w-5 h-5" />
                Start Traveling & Earning
                <FaArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-border-strong text-foreground font-semibold px-8 py-4 rounded-xl hover:border-accent-main hover:text-accent-main transition-all duration-300 flex items-center gap-2"
              >
                <FaHandshake className="w-5 h-5" />
                Become a Partner
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Decorations */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-20 right-10 w-8 h-8 border-2 border-accent-main/20 rounded-full opacity-40"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 left-8 w-6 h-6 bg-accent-glow/30 rounded-2xl"
      ></motion.div>
    </section>
  );
}
