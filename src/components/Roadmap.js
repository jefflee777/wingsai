"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaRocket, FaGlobeAmericas, FaPlaneDeparture, FaCheckCircle, FaClock, FaMapMarked } from 'react-icons/fa';

// Custom SVG underline component for highlighted text
const HighlightedText = ({ children }) => {
  return (
    <span className="relative font2 inline-block font-semibold text-accent-main">
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

export default function Roadmap() {
  const roadmapData = [
    {
      phase: 'Phase 1',
      timeline: '0-6 months',
      emoji: '🚀',
      title: 'AI Planner & Beta Checkpoints',
      description: 'Launch AI-powered travel planner with intelligent route optimization and beta checkpoint verification system for early adopters.',
      icon: FaRocket,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      milestones: [
        'AI Travel Planner MVP',
        'Beta Checkpoint System',
        'Initial User Testing',
        'Core Algorithm Development'
      ],
      status: 'In Progress'
    },
    {
      phase: 'Phase 2',
      timeline: '6-12 months',
      emoji: '🌍',
      title: 'Global App Launch & 50 Cities',
      description: 'Official mobile app launch with global reach, expanding to 50+ major cities worldwide with full token rewards system.',
      icon: FaGlobeAmericas,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      milestones: [
        'Mobile App Launch',
        '50+ Cities Integration',
        'Token Rewards System',
        'Partnership Network'
      ],
      status: 'Planned'
    },
    {
      phase: 'Phase 3',
      timeline: '1-2 years',
      emoji: '✈️',
      title: '200+ Cities & AI Travel Assistant',
      description: 'Massive expansion to 200+ cities with advanced AI Travel Assistant providing personalized recommendations and real-time support.',
      icon: FaPlaneDeparture,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      milestones: [
        '200+ Cities Coverage',
        'AI Travel Assistant',
        'Advanced Personalization',
        'Enterprise Partnerships'
      ],
      status: 'Future'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-background text-foreground relative overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 25, 
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
            <FaMapMarked className="text-accent-main text-sm" />
            <span className="text-sm font-medium text-text-secondary">Our Journey</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Roadmap <HighlightedText><span className='tracking-wide'>Highlights</span></HighlightedText>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto text-balance leading-relaxed">
            Our strategic timeline to revolutionize travel experiences and build the world's largest travel-to-earn ecosystem
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-main to-accent-glow transform -translate-x-1/2 rounded-full"></div>

          {/* Roadmap Cards */}
          <div className="space-y-16">
            {roadmapData.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                
                {/* Content Card */}
                <div className="flex-1 max-w-2xl">
                  <div className={`relative bg-white/5 backdrop-blur-sm border-2 ${phase.borderColor} rounded-3xl p-8 transition-all duration-300 hover:bg-white/8 hover:border-accent-main hover:shadow-2xl hover:transform hover:scale-105`}>
                    
                    {/* Status Badge */}
                    <div className={`absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold text-white ${
                      phase.status === 'In Progress' ? 'bg-green-500' :
                      phase.status === 'Planned' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`}>
                      {phase.status === 'In Progress' && <FaCheckCircle className="inline w-3 h-3 mr-1" />}
                      {phase.status === 'Planned' && <FaClock className="inline w-3 h-3 mr-1" />}
                      {phase.status === 'Future' && <FaPlaneDeparture className="inline w-3 h-3 mr-1" />}
                      {phase.status}
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 ${phase.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl">{phase.emoji}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-3xl tracking-wide font-bold text-foreground">
                            <HighlightedText>{phase.phase}</HighlightedText>
                          </h3>
                          <span className="text-sm font-semibold text-text-secondary bg-border-soft px-3 py-1 rounded-full">
                            {phase.timeline}
                          </span>
                        </div>
                        <h4 className="text-xl font-semibold text-accent-main">
                          {phase.title}
                        </h4>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-lg leading-relaxed mb-6">
                      {phase.description}
                    </p>

                    {/* Milestones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {phase.milestones.map((milestone, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2"
                        >
                          <FaCheckCircle className="text-accent-main w-4 h-4 flex-shrink-0" />
                          <span className="text-text-secondary font-medium text-sm">
                            {milestone}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-6 pt-4 border-t border-border-soft">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Progress</span>
                        <span className="font-semibold text-accent-main">
                          {phase.status === 'In Progress' ? '60%' :
                           phase.status === 'Planned' ? '0%' : 'Planning'}
                        </span>
                      </div>
                      <div className="w-full bg-border-soft rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            phase.status === 'In Progress' ? 'bg-green-500 w-3/5' :
                            phase.status === 'Planned' ? 'bg-blue-500 w-0' :
                            'bg-purple-500 w-0'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Node - Desktop */}
                <div className="hidden lg:flex relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-20 h-20 bg-gradient-to-br from-accent-main to-accent-glow rounded-full flex items-center justify-center shadow-2xl border-4 border-background"
                  >
                    <phase.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Image Card */}
                <div className="flex-1 max-w-md">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white/5 backdrop-blur-sm border border-border-soft rounded-3xl p-6 shadow-xl"
                  >
                      <Image 
                        src={`/${phase.phase.toLowerCase().replace(' ', '')}.png`}
                        alt={`${phase.title} illustration`}
                        width={500}
                        height={500}
                        className="rounded-2xl object-cover w-full h-full"

                      />
                    {/* Floating elements for visual interest */}
                    <motion.div 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-accent-main rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Join the <HighlightedText>Wings AI</HighlightedText> Journey
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Be part of the travel revolution from day one. Early adopters get exclusive benefits, higher rewards, and priority access to new features.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-main mb-2">10K+</div>
                <div className="text-sm text-text-secondary">Beta Testers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-glow mb-2">250+</div>
                <div className="text-sm text-text-secondary">Target Cities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-sm text-text-secondary">AI Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional floating background elements */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 left-8 w-4 h-4 bg-accent-glow/30 rounded-full"
      ></motion.div>
    </section>
  );
}
