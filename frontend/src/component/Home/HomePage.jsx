import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../Home/NavBar';
import Footer from '../Home/Footer';
import ChatAboutUs from '../registration/ChatAboutUs';
import farmBg from '/farm-bg.jpg';

// Import agriculture images for backgrounds
import marketPricesBg from '/agriculture-images/market-prices-bg.jpeg';
import cropAdvisoryBg from '/agriculture-images/crop-advisory-bg.jpeg';
import weatherDataBg from '/agriculture-images/weather-data-bg.jpeg';
import soilHealthBg from '/agriculture-images/soil-health-bg.jpeg';
import pestAlertsBg from '/agriculture-images/pest-alerts-bg.jpeg';
import communityBg from '/agriculture-images/community-bg.jpeg';

// Import realistic icons (you can use react-icons or custom SVG icons)
import { FaChartLine, FaLeaf, FaCloudSunRain, FaSeedling, FaBug, FaUsers } from 'react-icons/fa';

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
      icon: <FaChartLine className="text-3xl" />,
      bgImage: marketPricesBg,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500'
    },
    {
      id: 2,
      title: 'Crop Advisory',
      icon: <FaLeaf className="text-3xl" />,
      bgImage: cropAdvisoryBg,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-400'
    },
    {
      id: 3,
      title: 'Weather Data',
      icon: <FaCloudSunRain className="text-3xl" />,
      bgImage: weatherDataBg,
      color: 'from-sky-400 to-blue-600',
      bgColor: 'bg-sky-400'
    },
    {
      id: 4,
      title: 'Soil Health',
      icon: <FaSeedling className="text-3xl" />,
      bgImage: soilHealthBg,
      color: 'from-purple-400 to-indigo-600',
      bgColor: 'bg-purple-400'
    },
    {
      id: 5,
      title: 'Pest Alerts',
      icon: <FaBug className="text-3xl" />,
      bgImage: pestAlertsBg,
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-rose-500'
    },
    {
      id: 6,
      title: 'Community',
      icon: <FaUsers className="text-3xl" />,
      bgImage: communityBg,
      color: 'from-violet-500 to-fuchsia-600',
      bgColor: 'bg-violet-500'
    }
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
      transition: { delay: i * 0.15, type: 'spring', stiffness: 100, damping: 10 }
    }),
    hover: { scale: 1.05, y: -5 },
    active: { scale: 1.1, zIndex: 10, rotate: 5 }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ y: '-10%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <img
          src={farmBg}
          alt="Farm Background"
          className="w-full h-full object-cover filter brightness-75 blur-sm"
        />
      </motion.div>

      <NavBar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 mt-4">
            SMART{' '}
            <span className="text-green-300 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
              AGRICULTURE
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Transforming farming with intelligent solutions and seamless market integration.
          </p>

          {/* Hexagon CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hexagon-button bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-medium mx-auto mt-6 py-3 px-8 rounded-full shadow-lg"
          >
            Explore Features
          </motion.button>
        </motion.section>

        {/* Features Grid */}
        <section className="w-full max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            Discover Our Smart Agriculture Features
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            {hexagonFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                custom={index}
                variants={hexagonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="active"
                onClick={() => handleHexagonClick(feature.id)}
                className="cursor-pointer flex justify-center"
              >
                <div className={`relative group ${activeHexagon === feature.id ? 'z-10' : ''}`}>
                  <motion.div
                    className={`hexagon-feature w-32 h-36 flex flex-col items-center justify-center text-white rounded-lg overflow-hidden shadow-lg relative`}
                    variants={{
                      hover: { scale: 1.05, rotate: 2 },
                      active: { scale: 1.1, rotate: 5 }
                    }}
                  >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img 
                        src={feature.bgImage} 
                        alt={feature.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-80`} />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                      <div className="icon-container bg-white/20 p-3 rounded-full backdrop-blur-sm mb-3">
                        {feature.icon}
                      </div>
                      <span className="text-sm font-medium text-white text-center drop-shadow-md">{feature.title}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Feature Details Panel */}
        <AnimatePresence>
          {activeHexagon && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-16 w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className={`w-24 h-28 flex items-center justify-center text-white bg-gradient-to-br ${hexagonFeatures.find(
                    (f) => f.id === activeHexagon
                  ).color} shadow-md rounded-lg flex-shrink-0 relative overflow-hidden`}>
                    <img 
                      src={hexagonFeatures.find(f => f.id === activeHexagon).bgImage} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                    <div className="relative z-10">
                      {hexagonFeatures.find(f => f.id === activeHexagon).icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {hexagonFeatures.find((f) => f.id === activeHexagon).title}
                    </h3>
                    <p className="text-gray-700 mb-4">{getFeatureDescription(activeHexagon)}</p>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-5 py-2.5 text-white rounded-lg ${hexagonFeatures.find(
                          (f) => f.id === activeHexagon
                        ).bgColor}`}
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
      <ChatAboutUs />
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