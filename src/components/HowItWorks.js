import { motion } from 'framer-motion';
import { FaRoute, FaMapMarkerAlt, FaShare, FaGift, FaArrowRight, FaBrain, FaCamera, FaCoins, FaTicketAlt } from 'react-icons/fa';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Plan",
      description: "AI suggests personalized routes based on your budget, time, and interests.",
      icon: FaBrain,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-500/10",
      features: ["Smart Route Planning", "Budget Optimization", "Interest Matching"]
    },
    {
      id: 2,
      title: "Explore",
      description: "Visit locations, verify check-ins with GPS or photos, and unlock instant rewards.",
      icon: FaMapMarkerAlt,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      features: ["GPS Verification", "Photo Check-ins", "Instant Rewards"]
    },
    {
      id: 3,
      title: "Earn & Share",
      description: "Upload reviews, photos, or videos — the more popular your content, the more you earn.",
      icon: FaCamera,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      features: ["Content Upload", "Social Sharing", "Popularity Rewards"]
    },
    {
      id: 4,
      title: "Redeem",
      description: "Use Wings AI tokens for travel discounts, partner perks, and real-world rewards.",
      icon: FaGift,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      features: ["Travel Discounts", "Partner Perks", "Real Rewards"]
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-accent-glow/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-border-soft backdrop-blur-sm border border-border-soft rounded-full px-6 py-3 mb-6">
            <FaRoute className="text-accent-main" />
            <span className="text-sm font-medium text-text-secondary">Simple Process</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-foreground">
            How It <span className="text-accent-main">Works</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Transform your travels into rewards with our simple 4-step process
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border-soft to-transparent transform -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="group relative bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-3xl p-8 h-full transition-all duration-300 hover:bg-border-soft/50 hover:border-border-hover hover:transform hover:scale-105">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-accent-main to-accent-glow rounded-2xl flex items-center justify-center font-bold text-white shadow-lg">
                  {step.id}
                </div>

                {/* Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className={`text-2xl bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-accent-main transition-colors duration-300">
                  Step {step.id} – {step.title}
                </h3>
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {step.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <div className="w-1.5 h-1.5 bg-accent-glow rounded-full"></div>
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <motion.div 
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent-main z-20"
                  >
                    <FaArrowRight className="text-xl" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-8 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <FaCoins className="text-2xl text-accent-main" />
              <div className="text-left">
                <div className="text-lg font-semibold text-foreground">Start Earning Today</div>
                <div className="text-sm text-text-secondary">Join thousands of travelers earning rewards</div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-accent-main to-accent-glow text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <FaArrowRight className="inline ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-6 h-6 bg-accent-glow/30 rounded-full"
      ></motion.div>
      
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-8 w-4 h-4 bg-accent-main/30 rounded-full"
      ></motion.div>
    </section>
  );
}
