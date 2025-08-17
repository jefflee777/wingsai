"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBrain, FaMapMarkerAlt, FaCamera, FaGift, FaCheckCircle } from 'react-icons/fa';

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

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Plan',
      description: (
        <>
          AI suggests personalized routes based on your <HighlightedText>budget</HighlightedText>, <HighlightedText>time</HighlightedText>, and <HighlightedText>interests</HighlightedText>.
        </>
      ),
      icon: FaBrain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 2,
      title: 'Explore',
      description: (
        <>
          Visit locations, verify check-ins with <HighlightedText>GPS</HighlightedText> or <HighlightedText>photos</HighlightedText>, and unlock instant rewards.
        </>
      ),
      icon: FaMapMarkerAlt,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      title: 'Earn & Share',
      description: (
        <>
          Upload reviews, photos, or videos - the more popular your <HighlightedText>content</HighlightedText>, the more you earn.
        </>
      ),
      icon: FaCamera,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      title: 'Redeem',
      description: (
        <>
          Use Wings AI tokens for travel discounts, partner perks, and <HighlightedText>real-world rewards</HighlightedText>.
        </>
      ),
      icon: FaGift,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12 w-full"
            >
              <div className="flex max-w-[170px] items-center justify-center gap-2 bg-border-soft/30 backdrop-blur-sm border border-border-soft rounded-full px-4 py-2 mb-6 mx-auto">
                <div className="w-2 h-2 bg-accent-main rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-text-secondary">Simple Process</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight text-center">
                How It <HighlightedText><span className='font2'>Works</span></HighlightedText>
              </h2>
            </motion.div>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 max-w-lg"
          >
            <div className="relative">
              {/* <div className="relative bg-white/5 backdrop-blur-sm border border-border-soft rounded-3xl p-8 shadow-xl"> */}
                <Image 
                  src="/how-it-works.png" 
                  alt="How Wings AI Works Process" 
                  width={500} 
                  height={400} 
                  className="rounded-2xl object-contain max-w-full h-auto"
                  priority
                />
              {/* </div> */}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <div className="flex-1 max-w-3xl">
            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`relative flex-shrink-0 w-16 h-16 ${step.bgColor} ${step.borderColor} border-2 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                    >
                      <step.icon className={`${step.color} w-8 h-8`} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <motion.h3 
                        className="text-2xl font-bold mb-3"
                      >
                        Step {step.id} - <HighlightedText>{step.title}</HighlightedText>
                      </motion.h3>
                      
                      <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="ml-8 mt-4 mb-2">
                      <div className="w-0.5 h-8 bg-border-soft"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-border-soft"
            >
              <div className="flex items-center gap-4 text-text-secondary">
                <FaCheckCircle className="text-accent-main text-xl" />
                <span className="font-medium">Ready to start earning rewards from your travels?</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
