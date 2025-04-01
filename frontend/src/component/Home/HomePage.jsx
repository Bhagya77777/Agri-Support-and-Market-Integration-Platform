import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../Home/NavBar';
import Footer from '../Home/Footer';
import ChatAboutUs from '../registration/ChatAboutUs';
import farmBg from '/farm-bg.jpg'; 

const HomePage = () => {
  const [activeHexagon, setActiveHexagon] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const hexagonFeatures = [
    { 
      id: 1, 
      title: 'Market Prices', 
      icon: '📊', 
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500'
    },
    { 
      id: 2, 
      title: 'Crop Advisory', 
      icon: '🌱', 
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-400'
    },
    { 
      id: 3, 
      title: 'Weather Data', 
      icon: '⛅', 
      color: 'from-sky-400 to-blue-600',
      bgColor: 'bg-sky-400'
    },
    { 
      id: 4, 
      title: 'Soil Health', 
      icon: '🪴', 
      color: 'from-purple-400 to-indigo-600',
      bgColor: 'bg-purple-400'
    },
    { 
      id: 5, 
      title: 'Pest Alerts', 
      icon: '🐛', 
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-rose-500'
    },
    { 
      id: 6, 
      title: 'Community', 
      icon: '👥', 
      color: 'from-violet-500 to-fuchsia-600',
      bgColor: 'bg-violet-500'
    },
  ];

  const handleHexagonClick = (id) => {
    setActiveHexagon(id === activeHexagon ? null : id);
  };

  const hexagonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: { scale: 1.05, y: -5 },
    active: { scale: 1.1, zIndex: 10 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with parallax effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${farmBg})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </motion.div>
      </div>

      <NavBar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 relative z-10">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            SMART <span className="text-green-300">AGRICULTURE</span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Transforming farming with intelligent solutions and seamless market integration
          </p>
          
          {/* Hexagon CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hexagon-button bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-medium mx-auto mt-6"
          >
            <span>Explore Features</span>
          </motion.button>
        </motion.section>

        {/* Features Grid */}
        <section className="w-full max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
         
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {hexagonFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={hexagonVariants}
                className="flex justify-center"
              >
                <div 
                  className={`relative cursor-pointer group ${activeHexagon === feature.id ? 'z-10' : ''}`}
                  onClick={() => handleHexagonClick(feature.id)}
                >
                  {/* Hexagon Feature Button */}
                  <motion.div 
                    className={`hexagon-feature w-32 h-36 flex flex-col items-center justify-center text-white bg-gradient-to-br ${feature.color} shadow-lg`}
                    animate={activeHexagon === feature.id ? "active" : ""}
                    variants={{
                      active: { scale: 1.1, rotate: 5 }
                    }}
                  >
                    <div className="text-4xl mb-2">{feature.icon}</div>
                    <span className="text-sm font-medium">{feature.title}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Details Panel */}
        <AnimatePresence>
          {activeHexagon && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-16 w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className={`hexagon-feature w-24 h-28 flex items-center justify-center text-white bg-gradient-to-br ${hexagonFeatures.find(f => f.id === activeHexagon).color} shadow-md flex-shrink-0`}>
                    <div className="text-3xl">
                      {hexagonFeatures.find(f => f.id === activeHexagon).icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {hexagonFeatures.find(f => f.id === activeHexagon).title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {getFeatureDescription(activeHexagon)}
                    </p>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-5 py-2.5 text-white rounded-lg ${hexagonFeatures.find(f => f.id === activeHexagon).bgColor}`}
                      >
                        Learn More
                      </motion.button>
                      <button 
                        onClick={() => setActiveHexagon(null)}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <ChatAboutUs/>
      <Footer />
    </div>
  );
};

// Helper function for feature descriptions
const getFeatureDescription = (id) => {
  const descriptions = {
    1: "Access real-time market prices and trends to make informed selling decisions. Our platform aggregates data from multiple markets to give you the most accurate pricing information.",
    2: "Get personalized crop recommendations based on your soil type, climate, and market demand. Our AI-powered system helps you choose the most profitable crops for your farm.",
    3: "Accurate weather forecasts tailored to your specific location. Plan your farming activities with confidence using our hyper-local weather predictions.",
    4: "Comprehensive soil analysis and recommendations to improve your land's productivity. Get detailed reports on nutrient levels and soil health.",
    5: "Early warning system for pest outbreaks in your area. Receive alerts and get recommendations for organic pest control methods.",
    6: "Connect with other farmers, share knowledge, and collaborate on solutions. Our community platform helps you learn from peers and experts."
  };
  return descriptions[id] || "";
};

export default HomePage;