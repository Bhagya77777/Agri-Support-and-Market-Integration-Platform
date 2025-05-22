import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seminar from "../Seminar";
import Register from "./Register";

function SkillDevelopment() {
  const [activeTab, setActiveTab] = useState("Skill Development");

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
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 248, 240, 0.8)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
      }}
    >
      {/* Floating Glass Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-max"
      >
        <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-xl p-1 border border-orange-200/60">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === item.name
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50/80"
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
      <main className="pt-28 pb-12 px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-700 mb-4">
            Cultivate Your Farming Expertise
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Grow your agricultural knowledge through hands-on training and modern techniques
          </p>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.header>

        {/* Seminar Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-orange-100/50">
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800">
                Upcoming Agricultural Workshops
              </h2>
            </div>
            <Seminar />
          </div>
        </motion.section>

        {/* Registration Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-orange-100/50">
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800">
                Enroll in Our Programs
              </h2>
            </div>
            <Register />
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Why Join Our Training Programs?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Field Training",
                desc: "Practical experience with modern farming equipment",
                icon: "👨‍🌾",
                color: "from-amber-100 to-amber-50"
              },
              {
                title: "Innovative Methods",
                desc: "Learn sustainable and high-yield techniques",
                icon: "🌱",
                color: "from-green-100 to-green-50"
              },
              {
                title: "Certification",
                desc: "Earn government-recognized qualifications",
                icon: "📜",
                color: "from-blue-100 to-blue-50"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${benefit.color} rounded-xl p-6 shadow-md border border-orange-100/50 hover:shadow-lg transition-all`}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-orange-600 font-medium text-sm flex items-center"
                >
                  Learn more
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
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Success Stories From Our Trainees
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote: "The organic farming course transformed my yield and reduced costs by 40%",
                farmer: "Sanjay Patel, Gujarat"
              },
              {
                quote: "Certification helped me secure a government grant for my farm",
                farmer: "Meena Devi, Bihar"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-orange-100/50"
              >
                <div className="flex items-start mb-4">
                  <div className="text-orange-500 text-3xl mr-3">🌾</div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
                <p className="text-orange-600 font-medium pl-11">— {testimonial.farmer}</p>
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
        className="bg-white/90 backdrop-blur-md border-t border-orange-200 py-6 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} AgriSkill Development | Growing Farmers, Harvesting Success
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            {['🌱', '🍊', '🌽', '🚜'].map((icon, i) => (
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

export default SkillDevelopment;