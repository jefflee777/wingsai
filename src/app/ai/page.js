"use client"
import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { 
  FaPlane, 
  FaMapMarkerAlt, 
  FaCoins, 
  FaCamera, 
  FaPassport, 
  FaGift,
  FaPaperPlane,
  FaGlobeAmericas,
  FaMountain,
  FaUmbrellaBeach,
  FaCity,
  FaHeart,
  FaCheckCircle,
  FaStar,
  FaRoute,
  FaClock,
  FaDollarSign,
  FaRobot,
  FaExpand,
  FaCompress,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaThermometerHalf,
  FaWind,
  FaEye,
  FaMicrophone,
  FaKeyboard,
  FaSpinner,
  FaLightbulb,
  FaBolt,
  FaMagic,
  FaChartLine,
  FaTrophy,
  FaUsers,
  FaRocket
} from 'react-icons/fa';
import { TiWeatherCloudy } from "react-icons/ti";
import dynamic from 'next/dynamic';
import { LuBadgeCheck } from "react-icons/lu";
import Image from 'next/image';

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Enhanced destinations with coordinates and detailed info
const ENHANCED_DESTINATIONS = {
  beach: [
    { 
      name: 'Bali, Indonesia', 
      earnings: 45, 
      days: 3, 
      image: '🏝️', 
      coords: [-8.4095, 115.1889],
      weather: '28°C, Sunny',
      highlights: ['Rice Terraces', 'Temples', 'Beach Clubs'],
      difficulty: 'Easy',
      cost: '$80/day'
    },
    { 
      name: 'Santorini, Greece', 
      earnings: 60, 
      days: 4, 
      image: '🇬🇷', 
      coords: [36.3932, 25.4615],
      weather: '24°C, Clear',
      highlights: ['Sunset Views', 'Wine Tours', 'Volcanic Beaches'],
      difficulty: 'Easy',
      cost: '$120/day'
    },
    { 
      name: 'Maldives', 
      earnings: 80, 
      days: 5, 
      image: '🏖️', 
      coords: [3.2028, 73.2207],
      weather: '30°C, Tropical',
      highlights: ['Overwater Villas', 'Coral Reefs', 'Spa Treatments'],
      difficulty: 'Easy',
      cost: '$200/day'
    }
  ],
  city: [
    { 
      name: 'Tokyo, Japan', 
      earnings: 75, 
      days: 5, 
      image: '🗾', 
      coords: [35.6762, 139.6503],
      weather: '22°C, Cloudy',
      highlights: ['Shibuya Crossing', 'Sushi Experiences', 'Tech Districts'],
      difficulty: 'Medium',
      cost: '$100/day'
    },
    { 
      name: 'Paris, France', 
      earnings: 65, 
      days: 4, 
      image: '🇫🇷', 
      coords: [48.8566, 2.3522],
      weather: '18°C, Partly Cloudy',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Café Culture'],
      difficulty: 'Easy',
      cost: '$110/day'
    },
    { 
      name: 'New York, USA', 
      earnings: 70, 
      days: 4, 
      image: '🗽', 
      coords: [40.7128, -74.0060],
      weather: '20°C, Clear',
      highlights: ['Central Park', 'Broadway Shows', 'Food Scene'],
      difficulty: 'Medium',
      cost: '$130/day'
    }
  ],
  adventure: [
    { 
      name: 'Nepal Himalayas', 
      earnings: 90, 
      days: 7, 
      image: '🏔️', 
      coords: [28.3949, 84.1240],
      weather: '15°C, Mountain',
      highlights: ['Everest Base Camp', 'Sherpa Culture', 'Mountain Peaks'],
      difficulty: 'Hard',
      cost: '$60/day'
    },
    { 
      name: 'Patagonia, Chile', 
      earnings: 85, 
      days: 6, 
      image: '⛰️', 
      coords: [-51.7963, -59.5436],
      weather: '12°C, Windy',
      highlights: ['Torres del Paine', 'Glaciers', 'Wildlife'],
      difficulty: 'Hard',
      cost: '$90/day'
    },
    { 
      name: 'Swiss Alps', 
      earnings: 80, 
      days: 5, 
      image: '🇨🇭', 
      coords: [46.0207, 7.7491],
      weather: '16°C, Alpine',
      highlights: ['Matterhorn', 'Cable Cars', 'Alpine Lakes'],
      difficulty: 'Medium',
      cost: '$150/day'
    }
  ]
};

// Animated background particles
const FloatingParticles = () => {
  const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Weather widget component
const WeatherWidget = ({ location, weather, temp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 border border-white/20 rounded-xl p-3"
    >
      <div className="flex items-center gap-2">
        <TiWeatherCloudy className="text-orange-400 w-4 h-4" />
        <div>
          <p className="text-white text-xs font-medium">{location}</p>
          <p className="text-white/70 text-xs">{weather}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Token counter with animation
const AnimatedTokenCounter = ({ value, target }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (target !== value) {
      const duration = 1000;
      const startTime = Date.now();
      const startValue = value;
      
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [target, value]);

  return (
    <motion.span
      key={displayValue}
      initial={{ scale: 1.2, color: '#FE6F61' }}
      animate={{ scale: 1, color: '#00F6FF' }}
      className="font-black text-3xl"
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
};

const EnhancedWingsAgent = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userPreferences, setUserPreferences] = useState({});
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedRoute, setSuggestedRoute] = useState(null);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [travelPassport, setTravelPassport] = useState([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [aiPersonality, setAiPersonality] = useState('enthusiastic');
  const [userLevel, setUserLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const mapRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Enhanced scroll to bottom with smooth animation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "end",
      inline: "nearest" 
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Load enhanced data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('wingsAgentEnhanced');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setConversation(parsed.conversation || []);
      setUserPreferences(parsed.preferences || {});
      setEarnedTokens(parsed.earnedTokens || 0);
      setTravelPassport(parsed.passport || []);
      setUserLevel(parsed.userLevel || 1);
      setAchievements(parsed.achievements || []);
    }
  }, []);

  // Enhanced save function
  const saveToStorage = (data) => {
    const currentData = JSON.parse(localStorage.getItem('wingsAgentEnhanced') || '{}');
    const updatedData = { ...currentData, ...data };
    localStorage.setItem('wingsAgentEnhanced', JSON.stringify(updatedData));
  };

  // Play sound effect
  const playSound = (type) => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case 'success':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
          break;
        case 'notification':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          break;
        default:
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Enhanced LLM integration with multiple AI personalities
  const sendMessage = async (messageText, context = {}) => {
    if (!messageText || isLoading) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `msg_${Date.now()}_user`,
      context,
    };

    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const systemPrompts = {
        enthusiastic: `You are Wings AI Travel Assistant ✈️, an incredibly enthusiastic and energetic travel expert! 

PERSONALITY: You're like the most excited travel buddy who LOVES exploring and earning tokens! Use lots of emojis, exclamation points, and travel enthusiasm!

ENHANCED CAPABILITIES:
- Generate detailed travel itineraries with exact locations, costs, and earning potential
- Provide real-time weather insights and travel conditions
- Calculate precise $WINGS token earnings with bonuses and multipliers
- Suggest hidden gems and local experiences
- Offer partnership deals and exclusive discounts
- Track user progress and achievements
- Provide AR-style location insights
- Give photography and content creation tips for maximum earnings

RESPONSE STYLE:
- Be super excited about every destination! 🌟
- Use travel emojis abundantly ✈️🏖️🏔️
- Mention specific earning strategies
- Include micro-details like best photo spots, local foods, hidden costs
- Always end with an engaging question or suggestion
- Keep responses detailed but scannable

WINGS TOKEN SYSTEM:
- Base Rate: 15-20 tokens/day
- Check-ins: 5-15 tokens each (bonus for popular spots)
- Content Creation: 10-50 tokens (quality-based)
- Hidden Gems: 25+ bonus tokens
- Challenge Completions: 50-100 tokens
- Partnership Deals: Extra discounts + token multipliers`,

        expert: `You are Wings AI Travel Consultant, a seasoned travel industry expert with 15+ years of experience.

EXPERTISE: Professional travel planning with deep knowledge of:
- Visa requirements and travel documentation
- Best flight routes and timing
- Accommodation insights and insider deals
- Local customs and cultural etiquette
- Safety considerations and travel insurance
- Budget optimization and cost breakdowns

RESPONSE STYLE: Professional, detailed, and informative while maintaining warmth.`,

        local: `You are Wings AI Local Guide, an insider who knows every destination like a local resident.

SPECIALTY: Authentic, off-the-beaten-path experiences with:
- Hidden local spots tourists never find
- Authentic food recommendations
- Cultural immersion opportunities
- Local transportation secrets
- Community-based tourism options
- Seasonal insider tips`
      };

      const apiMessages = [
        {
          role: "system",
          content: systemPrompts[aiPersonality] || systemPrompts.enthusiastic
        },
        ...updatedConversation.slice(-8).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          context: {
            userLevel,
            earnedTokens,
            preferences: userPreferences,
            achievements
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data?.reply) {
        const assistantMessage = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          id: `msg_${Date.now()}_assistant`,
        };

        const finalConversation = [...updatedConversation, assistantMessage];
        setConversation(finalConversation);
        saveToStorage({ conversation: finalConversation });
        playSound('notification');
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        role: 'assistant',
        content: "🛩️ Oops! I'm having trouble connecting right now. But hey, let me suggest some amazing destinations while we're waiting! ✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: `msg_${Date.now()}_error`,
      };

      const errorConversation = [...updatedConversation, errorMessage];
      setConversation(errorConversation);
      playSound('error');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Enhanced form submission with context
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = inputRef.current?.value.trim();
    if (messageText) {
      await sendMessage(messageText, { 
        currentStep, 
        location: currentLocation,
        weather: weatherData 
      });
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  };

  // Enhanced quick actions with animations
  const handleQuickAction = (action, data) => {
    playSound('success');
    
    switch (action) {
      case 'plan_trip':
        setCurrentStep('preferences');
        break;
      case 'set_preference':
        const newPrefs = { ...userPreferences, [data.key]: data.value };
        setUserPreferences(newPrefs);
        saveToStorage({ preferences: newPrefs });
        if (Object.keys(newPrefs).length === 3) {
          setTimeout(() => generateRoute(newPrefs), 500);
        }
        break;
      case 'simulate_checkin':
        simulateEnhancedCheckIn();
        break;
      case 'view_passport':
        setCurrentStep('passport');
        break;
      case 'change_personality':
        setAiPersonality(data.personality);
        break;
      case 'toggle_map':
        setMapExpanded(!mapExpanded);
        break;
      default:
        break;
    }
  };

  // Enhanced route generation with detailed information
  const generateRoute = (prefs) => {
    const destinations = ENHANCED_DESTINATIONS[prefs.style] || ENHANCED_DESTINATIONS.city;
    const route = destinations.slice(0, 3);
    const totalEarnings = route.reduce((sum, dest) => sum + dest.earnings, 0);
    
    setSuggestedRoute(route);
    setCurrentStep('route');
    
    // Add achievement for first route generation
    if (!achievements.includes('first_route')) {
      const newAchievements = [...achievements, 'first_route'];
      setAchievements(newAchievements);
      saveToStorage({ achievements: newAchievements });
    }
    
    const routeMessage = {
      role: 'assistant',
      content: `🎉 AMAZING! I've crafted the perfect ${prefs.style} adventure just for you! 

✨ Your personalized route will earn you ${totalEarnings} $WINGS tokens!
🗺️ I've selected 3 incredible destinations based on your preferences
📸 Each location has prime photo spots for bonus tokens
🏆 Complete this route to unlock the "Explorer" achievement!

Ready to dive into the details? Check out your route below! 👇`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `msg_${Date.now()}_route`,
    };
    
    const updatedConv = [...conversation, routeMessage];
    setConversation(updatedConv);
    saveToStorage({ conversation: updatedConv });
  };

  // Enhanced check-in simulation with detailed feedback
  const simulateEnhancedCheckIn = () => {
    const baseBonus = Math.floor(Math.random() * 20) + 15;
    const multiplier = userLevel > 1 ? 1.2 : 1;
    const finalBonus = Math.floor(baseBonus * multiplier);
    
    setEarnedTokens(prev => prev + finalBonus);
    
    // Level up logic
    if (earnedTokens + finalBonus > userLevel * 100) {
      setUserLevel(prev => prev + 1);
      playSound('success');
    }
    
    const newStamp = {
      location: suggestedRoute ? suggestedRoute[0].name : 'Demo Location',
      date: new Date().toLocaleDateString(),
      tokens: finalBonus,
      id: Date.now(),
      weather: '24°C, Sunny',
      photos: Math.floor(Math.random() * 5) + 1
    };
    
    const updatedPassport = [...travelPassport, newStamp];
    setTravelPassport(updatedPassport);
    
    saveToStorage({ 
      earnedTokens: earnedTokens + finalBonus, 
      passport: updatedPassport,
      userLevel 
    });
    
    const checkinMessage = {
      role: 'assistant',
      content: `🎉 INCREDIBLE CHECK-IN! 

✅ Location verified successfully!
🏆 Earned ${finalBonus} $WINGS tokens!
📸 ${newStamp.photos} photos uploaded automatically
🌟 Bonus applied for Level ${userLevel} status
🗺️ Your travel passport has been updated!

${userLevel > 1 ? '🎊 LEVEL UP! You\'re now Level ' + userLevel + '!' : ''}

Keep exploring to unlock more achievements and higher earning multipliers! 🚀`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `msg_${Date.now()}_checkin`,
    };
    
    const updatedConv = [...conversation, checkinMessage];
    setConversation(updatedConv);
    saveToStorage({ conversation: updatedConv });
  };

  return (
    <div className="min-h-screen bg-transparent p-4 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header with interactive elements */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div 
              className="w-16 h-16 flex items-center justify-center scale-125"
            >
              <Image src='/logo.svg' alt='Logo' width={100} height={100}/>
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-white">Wings AI Agent</h1>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-white/90 text-lg max-w-2xl text-balance mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your AI-powered travel companion for earning rewards while exploring the world!
          </motion.p>

          {/* AI Personality Selector */}
          <motion.div 
            className="flex justify-center gap-2 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { key: 'enthusiastic', label: '🌟 Enthusiastic', desc: 'Super excited travel buddy!' },
              { key: 'expert', label: '👨‍💼 Expert', desc: 'Professional travel consultant' },
              { key: 'local', label: '🏠 Local', desc: 'Insider knowledge guide' }
            ].map((personality) => (
              <motion.button
                key={personality.key}
                onClick={() => handleQuickAction('change_personality', { personality: personality.key })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  aiPersonality === personality.key 
                    ? 'bg-[#FF8A5C] text-white shadow-lg' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={personality.desc}
              >
                {personality.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Enhanced Main Interface */}
          <div className="xl:col-span-3 space-y-6">
            {/* Map Integration */}
            <AnimatePresence>
              {(currentStep === 'route' || mapExpanded) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: mapExpanded ? 400 : 200 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-white/20">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <FaGlobeAmericas className="text-[#FF8A5C]" />
                      Interactive Route Map
                    </h3>
                    <motion.button
                      onClick={() => handleQuickAction('toggle_map')}
                      className="text-white/60 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {mapExpanded ? <FaCompress /> : <FaExpand />}
                    </motion.button>
                  </div>
                  
                  {typeof window !== 'undefined' && (
                    <MapContainer
                      center={suggestedRoute ? suggestedRoute[0].coords : [40.7128, -74.0060]}
                      zoom={6}
                      style={{ height: mapExpanded ? '350px' : '150px', width: '100%' }}
                      ref={mapRef}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                      />
                      {suggestedRoute?.map((dest, index) => (
                        <Marker key={index} position={dest.coords}>
                          <Popup>
                            <div className="text-center">
                              <h4 className="font-bold">{dest.name}</h4>
                              <p className="text-sm">{dest.weather}</p>
                              <p className="text-sm text-blue-600 font-semibold">
                                {dest.earnings} $WINGS tokens
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Chat/Interface Area */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Welcome Screen with enhanced animations */}
              {currentStep === 'welcome' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center relative overflow-hidden"
                > 
                  <motion.h2 
                    className="text-3xl font-semibold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Welcome to Wings AI! 👋
                  </motion.h2>
                  
                  <motion.p 
                    className="text-white/90 mb-8 text-lg text-balance leading-relaxed max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    I'm your AI travel companion, ready to plan incredible journeys that earn you $WINGS tokens! 
                    Let's explore the world together and turn every adventure into rewards! 
                  </motion.p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {[
                      { 
                        action: 'plan_trip', 
                        icon: FaRoute, 
                        title: 'Plan Journey', 
                        desc: 'Create personalized routes',
                        color: 'bg-[#FF8A5C]'
                      },
                      { 
                        action: () => setCurrentStep('chat'), 
                        icon: FaRobot, 
                        title: 'Chat with AI', 
                        desc: 'Ask me anything about travel',
                        color: 'bg-[#FF6F61]'
                      },
                    //   { 
                    //     action: 'simulate_checkin', 
                    //     icon: FaCamera, 
                    //     title: 'Demo Check-in', 
                    //     desc: 'See how earning works',
                    //     color: 'bg-[#FF6F61]'
                    //   }
                    ].map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => typeof option.action === 'function' ? option.action() : handleQuickAction(option.action)}
                        className={`${option.color} text-white p-6 rounded-3xl font-bold shadow-lg relative overflow-hidden group`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          boxShadow: "0 20px 40px rgba(255, 138, 92, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <option.icon className="w-8 h-8 mx-auto mb-3 relative z-10" />
                        <h3 className="text-lg font-bold mb-2 relative z-10">{option.title}</h3>
                        <p className="text-sm opacity-90 relative z-10">{option.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <motion.div 
                    className="flex justify-center gap-8 mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {[
                      { icon: FaGlobeAmericas, value: '250+', label: 'Destinations' },
                      { icon: FaCoins, value: '1M+', label: 'Tokens Earned' },
                      { icon: FaUsers, value: '50K+', label: 'Travelers' }
                    ].map((stat, index) => (
                      <motion.div 
                        key={index}
                        className="text-white/80"
                      >
                        <stat.icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-bold text-lg">{stat.value}</div>
                        <div className="text-xs">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Enhanced Preferences Collection */}
              {currentStep === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center mb-8"
                  >
                    <FaMagic className="w-12 h-12 text-[#FF8A5C] mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-white mb-2">Let's craft your perfect journey!</h3>
                    <p className="text-white/80">Tell me about your travel dreams so I can create something amazing ✨</p>
                  </motion.div>
                  
                  {/* Progress indicator */}
                  <div className="flex justify-center mb-8">
                    <div className="flex gap-2">
                      {[1, 2, 3].map((step) => (
                        <motion.div
                          key={step}
                          className={`w-3 h-3 rounded-full ${
                            Object.keys(userPreferences).length >= step 
                              ? 'bg-[#FF8A5C]' 
                              : 'bg-white/30'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: step * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {!userPreferences.budget && (
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h4 className="text-white font-bold mb-6 text-center text-xl">💰 What's your budget style?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'budget', label: 'Budget Explorer', desc: '$50-80/day', icon: '🎒' },
                          { value: 'midrange', label: 'Comfort Seeker', desc: '$80-150/day', icon: '🏨' },
                          { value: 'luxury', label: 'Luxury Traveler', desc: '$150+/day', icon: '💎' }
                        ].map((option, index) => (
                          <motion.button
                            key={option.value}
                            onClick={() => handleQuickAction('set_preference', { key: 'budget', value: option.value })}
                            className="bg-white/10 border-2 border-white/30 hover:border-[#FF8A5C] text-white p-6 rounded-3xl font-medium transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: 'rgba(255, 138, 92, 0.1)'
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-4xl mb-3">{option.icon}</div>
                            <h5 className="font-bold text-lg mb-2 group-hover:text-[#FF8A5C]">{option.label}</h5>
                            <p className="text-white/70 text-sm">{option.desc}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {userPreferences.budget && !userPreferences.duration && (
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h4 className="text-white font-bold mb-6 text-center text-xl">⏰ How much time do you have?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'short', label: 'Quick Getaway', desc: '3-5 days', icon: '⚡' },
                          { value: 'medium', label: 'Perfect Week', desc: '1 week', icon: '📅' },
                          { value: 'extended', label: 'Epic Adventure', desc: '2+ weeks', icon: '🏔️' }
                        ].map((option, index) => (
                          <motion.button
                            key={option.value}
                            onClick={() => handleQuickAction('set_preference', { key: 'duration', value: option.value })}
                            className="bg-white/10 border-2 border-white/30 hover:border-[#FF8A5C] text-white p-6 rounded-3xl font-medium transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: 'rgba(255, 138, 92, 0.1)'
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-4xl mb-3">{option.icon}</div>
                            <h5 className="font-bold text-lg mb-2 group-hover:text-[#FF8A5C]">{option.label}</h5>
                            <p className="text-white/70 text-sm">{option.desc}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {userPreferences.budget && userPreferences.duration && !userPreferences.style && (
                    <motion.div 
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h4 className="text-white font-bold mb-6 text-center text-xl">🌍 What calls to your soul?</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'beach', label: 'Beach Paradise', desc: 'Sun, sand & relaxation', icon: '🏖️' },
                          { value: 'city', label: 'Urban Explorer', desc: 'Culture, food & nightlife', icon: '🏙️' },
                          { value: 'adventure', label: 'Wild Adventure', desc: 'Mountains, hiking & thrills', icon: '🏔️' }
                        ].map((option, index) => (
                          <motion.button
                            key={option.value}
                            onClick={() => handleQuickAction('set_preference', { key: 'style', value: option.value })}
                            className="bg-white/10 border-2 border-white/30 hover:border-[#FF8A5C] text-white p-6 rounded-3xl font-medium transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: 'rgba(255, 138, 92, 0.1)'
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-4xl mb-3">{option.icon}</div>
                            <h5 className="font-bold text-lg mb-2 group-hover:text-[#FF8A5C]">{option.label}</h5>
                            <p className="text-white/70 text-sm">{option.desc}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Loading state for route generation */}
                  {Object.keys(userPreferences).length === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <FaSpinner className="w-12 h-12 text-[#FF8A5C] mx-auto mb-4" />
                      </motion.div>
                      <h4 className="text-white font-bold text-xl mb-2">Creating your perfect route...</h4>
                      <p className="text-white/70">This will only take a moment! ✨</p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Enhanced Route Display */}
              {currentStep === 'route' && suggestedRoute && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center mb-8"
                  >
                    <FaTrophy className="w-12 h-12 text-[#FF8A5C] mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">Your Epic Journey Awaits! 🗺️</h3>
                    <p className="text-white/80 text-lg">I've crafted the perfect adventure just for you!</p>
                  </motion.div>
                  
                  {/* Route overview stats */}
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {[
                      { 
                        icon: FaCoins, 
                        value: suggestedRoute.reduce((sum, dest) => sum + dest.earnings, 0), 
                        label: '$WINGS Tokens',
                        color: 'text-[#00F6FF]'
                      },
                      { 
                        icon: FaClock, 
                        value: suggestedRoute.reduce((sum, dest) => sum + dest.days, 0), 
                        label: 'Total Days',
                        color: 'text-[#FF8A5C]'
                      },
                      { 
                        icon: FaMapMarkerAlt, 
                        value: suggestedRoute.length, 
                        label: 'Destinations',
                        color: 'text-[#00F6FF]'
                      },
                      { 
                        icon: FaDollarSign, 
                        value: Math.round(suggestedRoute.reduce((sum, dest) => sum + parseInt(dest.cost.replace('$', '').replace('/day', '')) * dest.days, 0)), 
                        label: 'Est. Cost',
                        color: 'text-[#FF8A5C]'
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                        <div className={`text-2xl font-black ${stat.color}`}>
                          {stat.label === 'Est. Cost' ? `$${stat.value}` : stat.value}
                        </div>
                        <div className="text-white/70 text-xs">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="space-y-6 mb-8">
                    {suggestedRoute.map((dest, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white/10 border border-white/20 rounded-3xl p-6 relative overflow-hidden group"
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: 'rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        {/* Destination number */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-[#FF8A5C] rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-5xl">{dest.image}</span>
                              <div>
                                <h4 className="text-white font-bold text-xl">{dest.name}</h4>
                                <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
                                  <span className="flex items-center gap-1">
                                    <FaClock className="w-3 h-3" />
                                    {dest.days} days
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FaThermometerHalf className="w-3 h-3" />
                                    {dest.weather}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <FaDollarSign className="w-3 h-3" />
                                    {dest.cost}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Highlights */}
                            <div className="mb-4">
                              <h5 className="text-white font-semibold mb-2 flex items-center gap-2">
                                <FaStar className="w-4 h-4 text-[#FF8A5C]" />
                                Top Highlights
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {dest.highlights.map((highlight, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="bg-[#FF8A5C]/20 border border-[#FF8A5C]/30 text-white/90 px-3 py-1 rounded-full text-xs font-medium"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 138, 92, 0.3)' }}
                                  >
                                    {highlight}
                                  </motion.span>
                                ))}
                              </div>
                            </div>

                            {/* Difficulty and earnings */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  dest.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                                  dest.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-red-500/20 text-red-300'
                                }`}>
                                  {dest.difficulty} Difficulty
                                </span>
                              </div>
                              
                              <motion.div 
                                className="flex items-center gap-2 bg-[#00F6FF]/20 border border-[#00F6FF]/30 rounded-xl px-4 py-2"
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 246, 255, 0.3)' }}
                              >
                                <FaCoins className="w-5 h-5 text-[#00F6FF]" />
                                <span className="font-black text-[#00F6FF] text-lg">{dest.earnings}</span>
                                <span className="text-white/70 text-sm">tokens</span>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        action: 'simulate_checkin',
                        icon: FaCamera,
                        title: 'Start Journey',
                        desc: 'Simulate first check-in',
                        color: 'bg-[#FF8A5C]'
                      },
                      {
                        action: () => setCurrentStep('chat'),
                        icon: FaRobot,
                        title: 'Ask AI More',
                        desc: 'Get detailed insights',
                        color: 'bg-[#00F6FF]'
                      },
                      {
                        action: 'view_passport',
                        icon: FaPassport,
                        title: 'View Passport',
                        desc: 'Check your progress',
                        color: 'bg-white/20 border-2 border-white/30'
                      }
                    ].map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => typeof option.action === 'function' ? option.action() : handleQuickAction(option.action)}
                        className={`${option.color} text-white p-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <option.icon className="w-6 h-6 mx-auto mb-2" />
                        <div className="font-bold">{option.title}</div>
                        <div className="text-sm opacity-90">{option.desc}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Enhanced Chat Interface */}
              {currentStep === 'chat' && (
                <div className="flex flex-col h-[700px]">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/20">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 bg-[#FF8A5C] rounded-2xl flex items-center justify-center"
                      >
                        <FaRobot className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-bold">Wings AI Assistant</h3>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-white/70 text-sm">Online & Ready to Help!</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="text-white/60 hover:text-white p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setIsVoiceMode(!isVoiceMode)}
                        className={`p-2 rounded-lg ${isVoiceMode ? 'bg-[#FF8A5C] text-white' : 'text-white/60 hover:text-white'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isVoiceMode ? <FaMicrophone /> : <FaKeyboard />}
                      </motion.button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <AnimatePresence>
                      {conversation.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center py-12"
                        >
                          <FaLightbulb className="w-16 h-16 text-[#FF8A5C] mx-auto mb-4" />
                          <h4 className="text-white font-bold text-xl mb-4">Let's start your adventure!</h4>
                          <p className="text-white/70 mb-6">Ask me anything about travel, destinations, or earning tokens!</p>
                          
                          {/* Quick suggestion buttons */}
                          <div className="flex flex-wrap gap-2 justify-center">
                            {[
                              "Plan a 7-day Japan trip",
                              "Best beaches for earning tokens", 
                              "Adventure travel in Europe",
                              "Budget travel tips"
                            ].map((suggestion, index) => (
                              <motion.button
                                key={index}
                                onClick={() => sendMessage(suggestion)}
                                className="bg-white/10 border border-white/30 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {conversation.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -30, scale: 0.95 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex items-start gap-3 max-w-[85%]">
                            {message.role === 'assistant' && (
                              <motion.div
                                className="w-8 h-8 bg-[#FF8A5C] rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <FaRobot className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                            
                            <div
                              className={`p-4 rounded-3xl relative ${
                                message.role === 'user'
                                  ? 'bg-[#FF8A5C] text-white rounded-tr-lg'
                                  : 'bg-white/10 border border-white/20 text-white rounded-tl-lg'
                              }`}
                            >
                              <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                              <div className={`text-xs mt-3 ${message.role === 'user' ? 'text-white/80' : 'text-white/60'}`}>
                                {message.timestamp}
                              </div>
                              
                              {/* Message actions */}
                              {message.role === 'assistant' && (
                                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
                                  <motion.button
                                    className="text-white/60 hover:text-white text-xs"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => playSound('success')}
                                  >
                                    👍
                                  </motion.button>
                                  <motion.button
                                    className="text-white/60 hover:text-white text-xs"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => playSound('notification')}
                                  >
                                    📋 Copy
                                  </motion.button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Enhanced typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-[#FF8A5C] rounded-xl flex items-center justify-center">
                            <FaRobot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-white/10 border border-white/20 text-white p-4 rounded-3xl rounded-tl-lg">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white/70">Wings AI is thinking</span>
                              <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-[#FF8A5C] rounded-full"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.7, 1, 0.7],
                                    }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Enhanced Input */}
                  <form onSubmit={handleSendMessage} className="p-6 border-t border-white/20">
                    <div className="flex items-end gap-4">
                      <div className="flex-1 relative">
                        <motion.input
                          ref={inputRef}
                          type="text"
                          placeholder={isVoiceMode ? "🎤 Voice input active..." : "Ask me about travel plans, destinations, earning tokens..."}
                          className="w-full bg-white/10 border-2 border-white/30 focus:border-[#FF8A5C] rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:outline-none transition-all text-lg"
                          disabled={isLoading || isVoiceMode}
                          whileFocus={{ scale: 1.02 }}
                        />
                        
                        {/* Character count */}
                        <div className="absolute bottom-2 right-4 text-white/40 text-xs">
                          {inputRef.current?.value?.length || 0}/500
                        </div>
                      </div>
                      
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#FF8A5C] hover:bg-[#FE6F61] text-white px-8 py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <FaSpinner className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <FaPaperPlane className="w-5 h-5" />
                        )}
                        <span className="hidden sm:inline">
                          {isLoading ? 'Sending...' : 'Send'}
                        </span>
                      </motion.button>
                    </div>
                    
                    {/* Input suggestions */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[
                        "💡 Travel tips",
                        "🗺️ Plan route", 
                        "💰 Earning guide",
                        "🎯 Hidden gems"
                      ].map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => {
                            if (inputRef.current) {
                              inputRef.current.value = suggestion.split(' ').slice(1).join(' ');
                              inputRef.current.focus();
                            }
                          }}
                          className="bg-white/10 border border-white/20 text-white/70 px-3 py-1 rounded-full text-sm hover:bg-white/20 hover:text-white transition-all"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </form>
                </div>
              )}

              {/* Enhanced Travel Passport */}
              {currentStep === 'passport' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center mb-8"
                  >
                    <FaPassport className="w-16 h-16 text-[#FF8A5C] mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-white mb-2">Your Digital Travel Passport 📱</h3>
                    <p className="text-white/80">Track your journey and achievements</p>
                  </motion.div>

                  {/* Passport stats */}
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {[
                      { icon: FaMapMarkerAlt, value: travelPassport.length, label: 'Places Visited', color: 'text-[#FF8A5C]' },
                      { icon: FaCoins, value: earnedTokens, label: 'Tokens Earned', color: 'text-[#00F6FF]' },
                      { icon: FaTrophy, value: achievements.length, label: 'Achievements', color: 'text-[#FF8A5C]' },
                      { icon: FaStar, value: userLevel, label: 'Explorer Level', color: 'text-[#00F6FF]' }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                        <div className={`text-2xl font-black ${stat.color}`}>
                          <AnimatedTokenCounter value={0} target={stat.value} />
                        </div>
                        <div className="text-white/70 text-xs">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {travelPassport.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-[#FF8A5C]" />
                        Journey Stamps
                      </h4>
                      {travelPassport.map((stamp, index) => (
                        <motion.div
                          key={stamp.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 border border-white/20 rounded-2xl p-6 relative overflow-hidden group"
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-[#FF8A5C] rounded-2xl flex items-center justify-center text-2xl">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="text-white font-bold text-lg">{stamp.location}</h5>
                                <div className="flex items-center gap-4 text-sm text-white/70 mt-1">
                                  <span className="flex items-center gap-1">
                                    <FaClock className="w-3 h-3" />
                                    {stamp.date}
                                  </span>
                                  {stamp.weather && (
                                    <span className="flex items-center gap-1">
                                      <TiWeatherCloudy className="w-3 h-3" />
                                      {stamp.weather}
                                    </span>
                                  )}
                                  {stamp.photos && (
                                    <span className="flex items-center gap-1">
                                      <FaCamera className="w-3 h-3" />
                                      {stamp.photos} photos
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <motion.div 
                              className="flex items-center gap-2 bg-[#00F6FF]/20 border border-[#00F6FF]/30 rounded-xl px-4 py-2"
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 246, 255, 0.3)' }}
                            >
                              <FaCoins className="w-4 h-4 text-[#00F6FF]" />
                              <span className="font-black text-[#00F6FF]">+{stamp.tokens}</span>
                            </motion.div>
                          </div>
                          
                          {/* Achievement badge */}
                          <motion.div
                            className="absolute top-4 right-4 bg-[#FF8A5C] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            ✓
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      className="text-center py-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <FaPassport className="w-20 h-20 text-white/40 mx-auto mb-6" />
                      </motion.div>
                      <h4 className="text-white/80 font-bold text-xl mb-4">Ready for your first adventure?</h4>
                      <p className="text-white/60 mb-8">Start exploring to collect passport stamps and earn tokens!</p>
                      
                      <motion.button
                        onClick={() => handleQuickAction('simulate_checkin')}
                        className="bg-[#FF8A5C] hover:bg-[#FE6F61] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaCamera className="w-5 h-5 inline mr-2" />
                        Get Your First Stamp!
                      </motion.button>
                    </motion.div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep('welcome')}
                    className="w-full bg-white/10 border-2 border-white/30 hover:border-[#FF8A5C] text-white p-4 rounded-2xl font-bold transition-all"
                  >
                    <FaGlobeAmericas className="w-5 h-5 inline mr-2" />
                    Back to Home
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Token Balance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md hidden border border-white/20 rounded-3xl p-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#00F6FF]/10 to-transparent"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <FaCoins className="text-[#00F6FF]" />
                </motion.div>
                Your $WINGS Balance
              </h3>
              
              <div className="text-center relative z-10">
                <motion.div 
                  className="text-4xl font-black text-[#00F6FF] mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <AnimatedTokenCounter value={0} target={earnedTokens} />
                </motion.div>
                <p className="text-white/70 text-sm">Tokens Earned</p>
                
                {/* Level progress */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/70">Level {userLevel}</span>
                    <span className="text-white/70">{Math.min(100, (earnedTokens % 100))}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-[#FF8A5C] to-[#00F6FF] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (earnedTokens % 100))}%` }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Stats Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaChartLine className="text-[#FF8A5C]" />
                Live Stats
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: 'Active Travelers', value: '2,847', trend: '+12%', color: 'text-green-400' },
                  { label: 'Tokens Distributed', value: '1.2M', trend: '+24%', color: 'text-blue-400' },
                  { label: 'New Destinations', value: '156', trend: '+8%', color: 'text-yellow-400' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-white/80 text-sm">{stat.label}</span>
                    <div className="text-right">
                      <div className="text-white font-bold">{stat.value}</div>
                      <div className={`text-xs ${stat.color}`}>{stat.trend}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weather Widget */}
            {currentLocation && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <TiWeatherCloudy className="text-[#FF8A5C]" />
                  Current Weather
                </h3>
                <WeatherWidget 
                  location={currentLocation.name}
                  weather={currentLocation.weather}
                  temp={currentLocation.temp}
                />
              </motion.div>
            )}

            {/* Quick Actions with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaBolt className="text-[#FF8A5C]" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                {[
                  { action: 'plan_trip', icon: FaGlobeAmericas, label: 'Plan New Journey', color: 'text-[#FE6F61]' },
                  { action: 'view_passport', icon: FaPassport, label: 'View Passport', color: 'text-[#00F6FF]' },
                  { action: 'simulate_checkin', icon: FaCamera, label: 'Demo Check-in', color: 'text-[#FF8A5C]' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full bg-white/10 border border-white/20 hover:border-[#FF8A5C] hover:bg-white/20 text-white p-4 rounded-2xl text-left flex items-center gap-3 transition-all group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <action.icon className={`${action.color} group-hover:scale-110 transition-transform`} />
                    <span className="group-hover:text-[#FF8A5C] transition-colors">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Achievements Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaTrophy className="text-[#FF8A5C]" />
                Achievements
              </h3>
              
              <div className="space-y-3">
                {achievements.length > 0 ? achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 bg-[#FF8A5C]/20 border border-[#FF8A5C]/30 rounded-xl p-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <LuBadgeCheck className="text-[#FF8A5C] w-5 h-5" />
                    <span className="text-white font-medium capitalize">{achievement.replace('_', ' ')}</span>
                  </motion.div>
                )) : (
                  <div className="text-center py-4">
                    <FaTrophy className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Start exploring to unlock achievements!</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Enhanced Partnership Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaGift className="text-[#FE6F61]" />
                Partner Benefits
              </h3>
              
              <div className="space-y-4">
                {[
                  { partner: 'Hotels', discount: '20%', bonus: '5 tokens', icon: '🏨' },
                  { partner: 'Flights', discount: '15%', bonus: '8 tokens', icon: '✈️' },
                  { partner: 'Tours', discount: '25%', bonus: '12 tokens', icon: '🎭' }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 138, 92, 0.1)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{benefit.icon}</span>
                        <span className="text-white/90 font-medium">{benefit.partner}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[#00F6FF] font-bold">{benefit.discount}</div>
                        <div className="text-white/60 text-xs">+{benefit.bonus}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#FF8A5C] to-[#FE6F61] rounded-3xl p-6 text-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)'
                }}
              />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaRocket className="w-12 h-12 text-white mx-auto mb-4" />
                </motion.div>
                
                <h3 className="text-xl font-black text-white mb-2">Ready for Real Adventures?</h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  Download Wings AI and start earning tokens on your actual travels! Join thousands of explorers worldwide! 🌍
                </p>
                
                <motion.button
                  className="bg-white text-[#FF8A5C] px-8 py-4 rounded-2xl font-black w-full shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    y: -3
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlane className="w-5 h-5 inline mr-2" />
                  Get Wings AI App
                </motion.button>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <FaStar className="w-3 h-3" />
                    4.9 Rating
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers className="w-3 h-3" />
                    50K+ Users
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWingsAgent;
