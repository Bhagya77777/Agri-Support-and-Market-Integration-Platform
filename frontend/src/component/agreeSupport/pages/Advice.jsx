import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AgriAdviceForm from "../AgriAdviceForm";

function Advice() {
  const [activeTab, setActiveTab] = useState("Advises");

  const navItems = [
    { name: "Home", path: "/agreeSupport", icon: "🏠" },
    { name: "Feedbacks", path: "/feedback", icon: "💬" },
    { name: "Advises", path: "/advice", icon: "💡" },
    { name: "Skill Development", path: "/skill_development", icon: "📚" }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
      }}
    >
      {/* Floating Glass Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-max"
      >
        <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-xl p-1 border border-green-200/60">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === item.name
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-green-50/80"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <motion.span 
                whileHover={{ scale: 1.1 }}
                className="mr-2 text-lg"
              >
                {item.icon}
              </motion.span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-6 max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-700 mb-4">
            Agricultural Wisdom Hub
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Cultivate success with expert guidance tailored for your fields
          </p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.header>

        {/* Advice Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-green-100/50"
        >
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800">
                Seek Expert Counsel
              </h2>
            </div>
            <p className="text-gray-600 pl-11">
              Submit your agricultural queries about crops, soil health, pest management, or any farming concern
            </p>
          </div>
          <AgriAdviceForm />
        </motion.section>

        {/* Additional Resources */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Cultivation Resources
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Crop Guides",
                desc: "Seasonal cultivation techniques",
                icon: "🌾",
                color: "from-amber-100 to-amber-50"
              },
              {
                title: "Pest Solutions",
                desc: "Eco-friendly pest management",
                icon: "🐞",
                color: "from-red-100 to-red-50"
              },
              {
                title: "Market Trends",
                desc: "Current agricultural economics",
                icon: "📊",
                color: "from-blue-100 to-blue-50"
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${resource.color} rounded-xl p-6 shadow-md border border-green-100/50 hover:shadow-lg transition-all`}
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">{resource.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-green-600 font-medium text-sm flex items-center"
                >
                  Explore
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Farmer Success Stories
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "The advice helped increase my rice yield by 30% this season!",
                farmer: "Rajesh Kumar, Punjab"
              },
              {
                quote: "Organic pest solution saved my vegetable farm from disaster.",
                farmer: "Priya M., Kerala"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-green-100/50"
              >
                <svg className="w-8 h-8 text-green-500 mb-4 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-green-600 font-medium">— {testimonial.farmer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="bg-white/90 backdrop-blur-md border-t border-green-200 py-6 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AgriWisdom | Cultivating Knowledge, Harvesting Success
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            {['🌱', '🌻', '🌾', '🍃'].map((icon, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2 + i,
                  ease: "easeInOut"
                }}
                className="text-lg"
              >
                {icon}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default Advice;