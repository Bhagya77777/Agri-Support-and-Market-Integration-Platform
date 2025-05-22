import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import NavBar from "../../../src/component/Buyer/BuyerHeader";
import Footer from "../../../src/component/Buyer/BuyerFooter";

import ChatAboutUs from "../registration/ChatAboutUs";
import farmBg from "/farm-bg.jpg";

const UserMainPage = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const features = [
    {
      id: 1,
      title: "Registration & Profile ",
      icon: "📊",
      description:
        "Access real-time market prices and trends to make informed selling decisions.",
      link: "/register",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-500",
    },
    {
      id: 2,
      title: "Agri Support Logistics",
      icon: "🌱",
      description:
        "Get personalized crop recommendations based on your soil type and climate.",
      link: "/logistic",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-400",
    },
    {
      id: 3,
      title: "Stores",
      icon: "🏪",
      description:
        "Accurate weather forecasts tailored to your specific location.",
      link: "/store",
      color: "from-sky-400 to-blue-600",
      bgColor: "bg-sky-400",
    },
    {
      id: 4,
      title: "Agri Support",
      icon: "🤝",
      description:
        "Comprehensive soil analysis and recommendations to improve productivity.",
      link: "/agreeSupport",
      color: "from-purple-400 to-indigo-600",
      bgColor: "bg-purple-400",
    }
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 50, rotateX: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      rotateY: 5,
    },
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
            Transforming farming with intelligent solutions and seamless market
            integration.
          </p>

          {/* Explore Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-medium rounded-full shadow-lg"
          >
            Explore Features
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
            Our Platform Features
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                custom={index}
                initial="initial"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="relative group cursor-pointer"
              >
                {/* Feature Card */}
                <Link to={feature.link} className="block">
                  <div
                    className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${feature.color} text-white transform transition-transform duration-300`}
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/90">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <ChatAboutUs />
      <Footer />
    </div>
  );
};

export default UserMainPage;
