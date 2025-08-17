"use client"
import { motion } from 'framer-motion';
import { PieChart } from 'react-minimal-pie-chart';
import { FaCoins, FaHandshake, FaUsers, FaWallet, FaBullhorn, FaStar, FaBolt } from 'react-icons/fa';

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

export default function Tokenomics() {
  const tokenData = [
    { 
      title: 'Travel Rewards', 
      value: 40, 
      color: '#0058FF',
      icon: FaCoins,
      description: 'Direct rewards for travelers exploring destinations'
    },
    { 
      title: 'Ecosystem & Partnerships', 
      value: 25, 
      color: '#FF6F61',
      icon: FaHandshake,
      description: 'Building strategic partnerships and ecosystem growth'
    },
    { 
      title: 'Team & Advisors', 
      value: 15, 
      color: '#00F6FF',
      icon: FaUsers,
      description: 'Core team and advisor allocations'
    },
    { 
      title: 'Liquidity & Reserve', 
      value: 10, 
      color: '#0058FF80',
      icon: FaWallet,
      description: 'Market liquidity and emergency reserves'
    },
    { 
      title: 'Marketing & Growth', 
      value: 10, 
      color: '#FF6F6180',
      icon: FaBullhorn,
      description: 'User acquisition and platform growth'
    }
  ];

  const totalSupply = '2B $WINGS';

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground relative overflow-hidden">
      {/* Background decorations */}
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
        className="absolute top-20 right-10 w-8 h-8 border border-accent-main/20 rounded-full opacity-30"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        
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
            <span className="text-sm font-medium text-text-secondary">Token Distribution</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <HighlightedText>Tokenomics</HighlightedText> <span className="text-text-secondary font-light">(simplified)</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 text-2xl font-bold">
            <span className="text-3xl">💠</span>
            <span className="text-foreground">Total Supply:</span>
            <span className="text-accent-main">{totalSupply}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          
          {/* Pie Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white/5 backdrop-blur-sm border border-border-soft rounded-3xl p-8 shadow-2xl">
              {/* Pie Chart */}
              <div className="w-80 h-80 mx-auto">
                <PieChart
                  data={tokenData.map(item => ({
                    title: item.title,
                    value: item.value,
                    color: item.color
                  }))}
                  radius={45}
                  lineWidth={25}
                  paddingAngle={2}
                  rounded
                  animate
                  animationDuration={1200}
                  animationEasing="ease-out"
                  label={({ dataEntry }) => `${dataEntry.value}%`}
                  labelStyle={{
                    fontSize: '5px',
                    fill: '#ffffff',
                    fontWeight: 'bold'
                  }}
                  labelPosition={75}
                />
              </div>
              
              {/* Central Logo/Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 bg-accent-main rounded-full flex items-center justify-center shadow-xl">
                  <FaCoins className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legend and Details */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {tokenData.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-border-soft rounded-2xl hover:bg-white/8 hover:border-accent-main transition-all duration-300"
                >
                  {/* Color Indicator */}
                  <div 
                    className="w-6 h-6 rounded-full shadow-lg flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-border-soft rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-foreground" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-accent-main transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="text-2xl font-black text-accent-main">
                        {item.value}%
                      </span>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Special Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-accent-main/10 border border-accent-main/20 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaBolt className="text-accent-main text-xl" />
                <span className="text-lg font-bold text-foreground">Instant Rewards</span>
              </div>
              <p className="text-accent-main font-semibold italic">
                ⚡ No lockups. Rewards flow instantly to travelers.
              </p>
              <p className="text-text-secondary mt-2">
                Experience immediate gratification as you explore the world and earn tokens in real-time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-2xl">
            <FaStar className="w-8 h-8 text-accent-main mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">800M</div>
            <div className="text-sm text-text-secondary">Tokens for Travel Rewards</div>
          </div>
          
          <div className="text-center p-6 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-2xl">
            <FaHandshake className="w-8 h-8 text-accent-main mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">500M</div>
            <div className="text-sm text-text-secondary">Ecosystem Development</div>
          </div>
          
          <div className="text-center p-6 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-2xl">
            <FaBolt className="w-8 h-8 text-accent-main mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">0%</div>
            <div className="text-sm text-text-secondary">Locked Tokens</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
