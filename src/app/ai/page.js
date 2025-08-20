import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaRobot
} from 'react-icons/fa';

// Mock destinations data
const DESTINATIONS = {
  beach: [
    { name: 'Bali, Indonesia', earnings: 45, days: 3, image: '🏝️' },
    { name: 'Santorini, Greece', earnings: 60, days: 4, image: '🇬🇷' },
    { name: 'Maldives', earnings: 80, days: 5, image: '🏖️' }
  ],
  city: [
    { name: 'Tokyo, Japan', earnings: 75, days: 5, image: '🗾' },
    { name: 'Paris, France', earnings: 65, days: 4, image: '🇫🇷' },
    { name: 'New York, USA', earnings: 70, days: 4, image: '🗽' }
  ],
  adventure: [
    { name: 'Nepal Himalayas', earnings: 90, days: 7, image: '🏔️' },
    { name: 'Patagonia, Chile', earnings: 85, days: 6, image: '⛰️' },
    { name: 'Swiss Alps', earnings: 80, days: 5, image: '🇨🇭' }
  ]
};

const WingsAgent = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userPreferences, setUserPreferences] = useState({});
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedRoute, setSuggestedRoute] = useState(null);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [travelPassport, setTravelPassport] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('wingsAgent');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setConversation(parsed.conversation || []);
      setUserPreferences(parsed.preferences || {});
      setEarnedTokens(parsed.earnedTokens || 0);
      setTravelPassport(parsed.passport || []);
    }
  }, []);

  // Save data to localStorage
  const saveToStorage = (data) => {
    const currentData = JSON.parse(localStorage.getItem('wingsAgent') || '{}');
    const updatedData = { ...currentData, ...data };
    localStorage.setItem('wingsAgent', JSON.stringify(updatedData));
  };

  // Send message to LLM
  const sendMessage = async (messageText) => {
    if (!messageText || isLoading) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `msg_${Date.now()}_user`,
    };

    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const apiMessages = [
        {
          role: "system",
          content: `You are Wings AI Travel Assistant 🛩️, an expert travel planner that helps users discover amazing destinations while earning $WINGS tokens. 

PERSONALITY: Friendly, enthusiastic travel expert who's excited about travel-to-earn opportunities.

CAPABILITIES:
- Generate personalized travel routes based on budget, duration, and interests
- Calculate potential $WINGS token earnings (formula: days * 15-20 tokens + bonus activities)
- Suggest check-in spots and earning opportunities
- Provide travel tips and hidden gems
- Show partnership benefits (hotels, flights, tours)

RESPONSE STYLE:
- Use travel emojis and excitement
- Always mention token earning potential
- Keep responses concise but engaging
- End with actionable next steps
- Include specific earning estimates

WINGS TOKEN EARNING FORMULA:
- Base: 15-20 tokens per day
- Check-ins: 5-10 tokens each
- Content sharing: 10-25 tokens
- Partnerships: 20-50% discounts + bonus tokens`
        },
        ...updatedConversation.slice(-5).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
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
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        role: 'assistant',
        content: "✈️ Oops! I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: `msg_${Date.now()}_error`,
      };

      const errorConversation = [...updatedConversation, errorMessage];
      setConversation(errorConversation);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Handle form submission
  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = inputRef.current?.value.trim();
    if (messageText) {
      await sendMessage(messageText);
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
  };

  // Quick action handlers
  const handleQuickAction = (action, data) => {
    switch (action) {
      case 'plan_trip':
        setCurrentStep('preferences');
        break;
      case 'set_preference':
        const newPrefs = { ...userPreferences, [data.key]: data.value };
        setUserPreferences(newPrefs);
        saveToStorage({ preferences: newPrefs });
        if (Object.keys(newPrefs).length === 3) {
          generateRoute(newPrefs);
        }
        break;
      case 'simulate_checkin':
        simulateCheckIn();
        break;
      case 'view_passport':
        setCurrentStep('passport');
        break;
      default:
        break;
    }
  };

  // Generate route based on preferences
  const generateRoute = (prefs) => {
    const destinations = DESTINATIONS[prefs.style] || DESTINATIONS.city;
    const route = destinations.slice(0, 3);
    const totalEarnings = route.reduce((sum, dest) => sum + dest.earnings, 0);
    
    setSuggestedRoute(route);
    setCurrentStep('route');
    
    // Add to conversation
    const routeMessage = {
      role: 'assistant',
      content: `🎉 Perfect! Based on your preferences, I've created an amazing ${prefs.style} adventure! You could earn ${totalEarnings} $WINGS tokens on this journey. Check out your personalized route below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `msg_${Date.now()}_route`,
    };
    
    const updatedConv = [...conversation, routeMessage];
    setConversation(updatedConv);
    saveToStorage({ conversation: updatedConv });
  };

  // Simulate check-in
  const simulateCheckIn = () => {
    const bonus = Math.floor(Math.random() * 20) + 10;
    setEarnedTokens(prev => prev + bonus);
    
    const newStamp = {
      location: 'Demo Location',
      date: new Date().toLocaleDateString(),
      tokens: bonus,
      id: Date.now()
    };
    
    const updatedPassport = [...travelPassport, newStamp];
    setTravelPassport(updatedPassport);
    
    saveToStorage({ 
      earnedTokens: earnedTokens + bonus, 
      passport: updatedPassport 
    });
    
    // Add success message
    const checkinMessage = {
      role: 'assistant',
      content: `🎉 Check-in successful! You've earned ${bonus} $WINGS tokens! Your travel passport has been updated with a new stamp. Keep exploring to earn more!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: `msg_${Date.now()}_checkin`,
    };
    
    const updatedConv = [...conversation, checkinMessage];
    setConversation(updatedConv);
    saveToStorage({ conversation: updatedConv });
  };

  return (
    <div className="min-h-screen bg-[#0058ff] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FE6F61] to-[#00F6FF] rounded-2xl flex items-center justify-center shadow-xl">
              <FaRobot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white">Wings AI Agent</h1>
          </div>
          <p className="text-white/80 text-lg">Your AI Travel Companion - Plan, Explore, Earn!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Welcome Screen */}
              {currentStep === 'welcome' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <div className="text-6xl mb-6">✈️</div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Hi! I'm your Wings AI Travel Assistant 👋
                  </h2>
                  <p className="text-white/80 mb-8 text-lg">
                    Ready to plan your next rewarding trip and earn $WINGS tokens?
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction('plan_trip')}
                      className="bg-gradient-to-r from-[#FE6F61] to-[#00F6FF] text-white p-4 rounded-2xl font-semibold shadow-lg"
                    >
                      <FaRoute className="w-6 h-6 mx-auto mb-2" />
                      Start Planning
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep('chat')}
                      className="bg-white/20 border border-white/30 text-white p-4 rounded-2xl font-semibold"
                    >
                      <FaRobot className="w-6 h-6 mx-auto mb-2" />
                      Chat with AI
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Preferences Collection */}
              {currentStep === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Let's personalize your trip!</h3>
                  
                  {!userPreferences.budget && (
                    <div className="mb-6">
                      <p className="text-white/80 mb-4">What's your budget range?</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['Budget', 'Mid-range', 'Luxury'].map(budget => (
                          <motion.button
                            key={budget}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAction('set_preference', { key: 'budget', value: budget.toLowerCase() })}
                            className="bg-white/20 border border-white/30 text-white p-3 rounded-xl font-medium"
                          >
                            <FaDollarSign className="w-4 h-4 mx-auto mb-1" />
                            {budget}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {userPreferences.budget && !userPreferences.duration && (
                    <div className="mb-6">
                      <p className="text-white/80 mb-4">How long is your trip?</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['3-5 days', '1 week', '2+ weeks'].map(duration => (
                          <motion.button
                            key={duration}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAction('set_preference', { key: 'duration', value: duration })}
                            className="bg-white/20 border border-white/30 text-white p-3 rounded-xl font-medium"
                          >
                            <FaClock className="w-4 h-4 mx-auto mb-1" />
                            {duration}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {userPreferences.budget && userPreferences.duration && !userPreferences.style && (
                    <div className="mb-6">
                      <p className="text-white/80 mb-4">What's your travel style?</p>
                      <div className="grid grid-cols-3 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAction('set_preference', { key: 'style', value: 'beach' })}
                          className="bg-white/20 border border-white/30 text-white p-3 rounded-xl font-medium"
                        >
                          <FaUmbrellaBeach className="w-4 h-4 mx-auto mb-1" />
                          Beach & Relax
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAction('set_preference', { key: 'style', value: 'city' })}
                          className="bg-white/20 border border-white/30 text-white p-3 rounded-xl font-medium"
                        >
                          <FaCity className="w-4 h-4 mx-auto mb-1" />
                          City & Culture
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickAction('set_preference', { key: 'style', value: 'adventure' })}
                          className="bg-white/20 border border-white/30 text-white p-3 rounded-xl font-medium"
                        >
                          <FaMountain className="w-4 h-4 mx-auto mb-1" />
                          Adventure
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Generated Route */}
              {currentStep === 'route' && suggestedRoute && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Your Personalized Route 🗺️</h3>
                  
                  <div className="space-y-4 mb-6">
                    {suggestedRoute.map((dest, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/20 border border-white/30 rounded-2xl p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{dest.image}</span>
                            <div>
                              <h4 className="text-white font-semibold">{dest.name}</h4>
                              <p className="text-white/70 text-sm">{dest.days} days</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-[#00F6FF]">
                              <FaCoins className="w-4 h-4" />
                              <span className="font-bold">{dest.earnings}</span>
                            </div>
                            <p className="text-white/70 text-xs">$WINGS</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAction('simulate_checkin')}
                      className="bg-gradient-to-r from-[#FE6F61] to-[#00F6FF] text-white p-3 rounded-xl font-semibold"
                    >
                      <FaCamera className="w-4 h-4 mx-auto mb-1" />
                      Simulate Check-in
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep('chat')}
                      className="bg-white/20 border border-white/30 text-white p-3 rounded-xl font-semibold"
                    >
                      <FaRobot className="w-4 h-4 mx-auto mb-1" />
                      Ask AI More
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Chat Interface */}
              {currentStep === 'chat' && (
                <div className="flex flex-col h-[600px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                      {conversation.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-2xl ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-[#FE6F61] to-[#00F6FF] text-white'
                                : 'bg-white/20 border border-white/30 text-white'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white/20 border border-white/30 text-white p-4 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="p-6 border-t border-white/20">
                    <div className="flex gap-3">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask me about travel plans, earning tokens, or anything else..."
                        className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-[#FE6F61]"
                        disabled={isLoading}
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#FE6F61] to-[#00F6FF] text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
                      >
                        <FaPaperPlane className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}

              {/* Travel Passport */}
              {currentStep === 'passport' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Your Digital Travel Passport 📱</h3>
                  
                  {travelPassport.length > 0 ? (
                    <div className="space-y-4">
                      {travelPassport.map((stamp) => (
                        <motion.div
                          key={stamp.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white/20 border border-white/30 rounded-2xl p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-semibold">{stamp.location}</h4>
                              <p className="text-white/70 text-sm">{stamp.date}</p>
                            </div>
                            <div className="flex items-center gap-2 text-[#00F6FF]">
                              <FaCoins className="w-4 h-4" />
                              <span className="font-bold">+{stamp.tokens}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaPassport className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">No stamps yet! Start your journey to collect passport stamps.</p>
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep('welcome')}
                    className="w-full mt-6 bg-white/20 border border-white/30 text-white p-3 rounded-xl font-semibold"
                  >
                    Back to Home
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Token Balance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaCoins className="text-[#00F6FF]" />
                Your $WINGS Balance
              </h3>
              <div className="text-center">
                <div className="text-3xl font-black text-[#00F6FF] mb-2">{earnedTokens}</div>
                <p className="text-white/70 text-sm">Tokens Earned</p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep('welcome')}
                  className="w-full bg-white/20 border border-white/30 text-white p-3 rounded-xl text-left flex items-center gap-3"
                >
                  <FaGlobeAmericas className="text-[#FE6F61]" />
                  Plan New Trip
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction('view_passport')}
                  className="w-full bg-white/20 border border-white/30 text-white p-3 rounded-xl text-left flex items-center gap-3"
                >
                  <FaPassport className="text-[#00F6FF]" />
                  View Passport
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction('simulate_checkin')}
                  className="w-full bg-white/20 border border-white/30 text-white p-3 rounded-xl text-left flex items-center gap-3"
                >
                  <FaCamera className="text-[#FE6F61]" />
                  Demo Check-in
                </motion.button>
              </div>
            </motion.div>

            {/* Partnership Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaGift className="text-[#FE6F61]" />
                Partner Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Hotel Discounts</span>
                  <span className="text-[#00F6FF] font-bold">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Flight Deals</span>
                  <span className="text-[#00F6FF] font-bold">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Tour Packages</span>
                  <span className="text-[#00F6FF] font-bold">25%</span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#FE6F61] to-[#00F6FF] rounded-3xl p-6 text-center"
            >
              <h3 className="text-lg font-bold text-white mb-2">Ready for Real Adventures?</h3>
              <p className="text-white/90 text-sm mb-4">Download the Wings AI app and start earning tokens on your actual travels!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0058ff] px-6 py-3 rounded-xl font-bold w-full"
              >
                Get Wings AI App
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WingsAgent;
