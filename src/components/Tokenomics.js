"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaCoins, FaHandshake, FaUsers, FaWallet, FaBullhorn, FaBolt, FaStar } from 'react-icons/fa';

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

// Premium Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/90 backdrop-blur-sm text-white p-4 rounded-xl shadow-2xl border border-white/20 min-w-[200px]">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-4 h-4 rounded-full shadow-sm" 
            style={{ backgroundColor: data.color }}
          />
          <span className="font-semibold text-sm">{data.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Allocation:</span>
          <span className="text-xl font-bold text-accent-main">{data.value}%</span>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {(data.value * 20000000).toLocaleString()} tokens
        </div>
      </div>
    );
  }
  return null;
};

export default function Tokenomics() {
  const [activeIndex, setActiveIndex] = useState(null);

  const tokenData = [
    { 
      name: 'Travel Rewards', 
      value: 40, 
      color: '#0058FF',
      icon: FaCoins,
      description: 'Direct rewards for travelers exploring destinations and sharing experiences'
    },
    { 
      name: 'Ecosystem & Partnerships', 
      value: 25, 
      color: '#FF6F61',
      icon: FaHandshake,
      description: 'Building strategic partnerships with hotels, airlines, and travel services'
    },
    { 
      name: 'Team & Advisors', 
      value: 15, 
      color: '#00F6FF',
      icon: FaUsers,
      description: 'Core development team and strategic advisor allocations'
    },
    { 
      name: 'Liquidity & Reserve', 
      value: 10, 
      color: '#A855F7',
      icon: FaWallet,
      description: 'Market liquidity provision and emergency reserves'
    },
    { 
      name: 'Marketing & Growth', 
      value: 10, 
      color: '#22C55E',
      icon: FaBullhorn,
      description: 'User acquisition and platform growth initiatives'
    }
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <section id='tokenomics' className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground relative overflow-hidden">
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
            <HighlightedText><span className='font2 tracking-wide text-5xl sm:text-6xl lg:text-7xl'>Tokenomics</span></HighlightedText> <span className="text-text-secondary font-light">(simplified)</span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 text-2xl font-bold">
            <span className="text-foreground">Total Supply:</span>
            <span className="text-accent-main">2B $WINGS</span>
          </div>
        </motion.div>

        {/* Main Content with Equal Heights */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          
          {/* Premium Pie Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="relative bg-white/5 backdrop-blur-sm border border-border-soft rounded-3xl  shadow-2xl h-[500px] flex items-center justify-center">
              {/* Premium glow effect */}
              <div className="absolute inset-4 bg-gradient-to-r from-accent-main/10 to-accent-glow/10 rounded-2xl blur-2xl"></div>
              
              <ResponsiveContainer width="100%" height="100%" className="sm:scale-125 scale-95">
                <PieChart>
                  <Pie
                    data={tokenData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    innerRadius={90}
                    paddingAngle={3}
                    cornerRadius={8}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    animationBegin={0}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {tokenData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={activeIndex === index ? 4 : 2}
                        style={{
                          filter: activeIndex === index ? 
                            'brightness(1.15) drop-shadow(0 0 12px rgba(255,255,255,0.4))' : 
                            'brightness(1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Premium Center Content */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {activeIndex !== null ? `${tokenData[activeIndex].value}%` : '$WINGS'}
                  </div>
                  <div className="text-lg text-text-secondary">
                    {activeIndex !== null ? tokenData[activeIndex].name : 'Token'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Streamlined Cards Section */}
          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-foreground mb-8"
            >
              Token Allocation
            </motion.h3>

            <div className="h-[500px] overflow-y-auto pr-4 space-y-4">
              {tokenData.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group p-5 bg-white/5 backdrop-blur-sm border rounded-2xl transition-all duration-300 cursor-pointer ${
                    activeIndex === index ? 
                      'border-accent-main bg-white/10 shadow-xl' : 
                      'border-border-soft hover:border-accent-main hover:bg-white/8'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 hidden rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ 
                        // backgroundColor: item.color + '20',
                        boxShadow: activeIndex === index ? `0 4px 20px ${item.color}30` : 'none'
                      }}
                    >
                      <item.icon 
                        className="w-7 h-7 transition-all duration-300" 
                        style={{ color: item.color }}
                      />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-accent-main transition-colors duration-300">
                          {item.name}
                        </h4>
                        <span 
                          className="font-bold px-3 py-1 rounded-full text-white text-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Special Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 p-5 bg-accent-main/10 border border-accent-main/20 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FaBolt className="text-accent-main text-xl" />
                  <span className="text-lg font-bold text-foreground">Instant Rewards</span>
                </div>
                <p className="text-accent-main font-semibold">
                  ⚡ No lockups. Rewards flow instantly to travelers.
                </p>
                <p className="text-text-secondary text-sm mt-2">
                  Experience immediate gratification with real-time token distribution.
                </p>
              </motion.div>
            </div>
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
            <div className="text-sm text-text-secondary">Travel Reward Tokens</div>
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
