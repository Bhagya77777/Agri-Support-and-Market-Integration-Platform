import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import FarmerHeader from "./FarmerHeader";
import FarmerFooter from "./FarmerFooter";

import farmBg from "/farm-bg.jpg";

const FarmerHome = () => {
  const cards = [
    {
      title: "Create Product",
      description: "Add new products to your shop.",
      link: "/farmer_product",
      color: "from-green-400 to-green-600",
      icon: "🛒",
    },
    {
      title: "My Products",
      description: "Manage your existing products.",
      link: "/farmer_view_products",
      color: "from-yellow-400 to-yellow-600",
      icon: "📦",
    },
    {
      title: "Orders",
      description: "View orders placed by buyers.",
      link: "/farmer_view_orders",
      color: "from-teal-400 to-teal-600",
      icon: "📃",
    },
    {
      title: "Agri Support Logistics",
      description:
        "Personalized crop & logistics support based on your region.",
      link: "/logistic",
      color: "from-amber-400 to-orange-500",
      icon: "🌱",
    },
    {
      title: "Agree Support",
      description: "Get expert help for agreements and consultations.",
      link: "/agreeSupport",
      color: "from-purple-500 to-indigo-600",
      icon: "🤝",
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
    hover: {
      scale: 1.05,
      rotateY: 4,
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
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

      <FarmerHeader />

      <main className="flex-grow px-4 py-20 relative z-10 flex flex-col items-center justify-center">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome, <span className="text-green-300">Farmer 👨‍🌾</span>
          </h1>
          <p className="text-xl text-white/90">
            Manage your shop, logistics, and support needs seamlessly.
          </p>
        </motion.section>

        {/* Cards */}
        <section className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                custom={index}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={cardVariants}
                className="group cursor-pointer"
              >
                <Link to={card.link} className="block h-full">
                  <div
                    className={`flex flex-col justify-between h-full p-6 rounded-2xl shadow-lg bg-gradient-to-br ${card.color} text-white transition-transform duration-300`}
                  >
                    <div className="text-5xl mb-4">{card.icon}</div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                      <p className="text-sm text-white/90">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <FarmerFooter />
    </div>
  );
};

export default FarmerHome;
