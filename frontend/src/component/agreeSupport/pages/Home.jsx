import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", path: "/agreeSupport", icon: "🏠" },
    { name: "Feedbacks", path: "/feedback", icon: "💬" },
    { name: "Advises", path: "/advice", icon: "💡" },
    { name: "Skill Development", path: "/skill_development", icon: "📚" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50">
      {/* Floating Glass Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-max">
        <div className="flex items-center bg-white/80 backdrop-blur-lg rounded-full shadow-lg p-1 border border-gray-200/50">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === item.name
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="mr-2 text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[url('/img3.jpg')] bg-cover bg-center brightness-75"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500">
              AgriAdvisory
            </span>
          </h1>
          <div className="bg-black/60 p-8 rounded-2xl backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Empowering Farmers with Expert Advice
            </h2>
            <p className="text-lg text-gray-200">
              Sustainable solutions for a thriving agricultural future.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium border border-white/20 hover:border-white/30 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive agricultural solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Crop Management",
              desc: "Guidance on soil health & optimal yields.",
              icon: "🌱"
            },
            {
              title: "Market Insights",
              desc: "Helping farmers sell products efficiently.",
              icon: "📊"
            },
            {
              title: "Sustainable Farming",
              desc: "Eco-friendly techniques for success.",
              icon: "♻️"
            }
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="/farmer.jpg" 
                alt="Farmer in field" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                We are a team of agricultural experts dedicated to providing farmers
                with modern, science-based solutions. Our mission is to make farming
                profitable and sustainable for future generations.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-green-600">15+ Years</h4>
                  <p className="text-sm text-gray-500">Experience</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-green-600">5000+</h4>
                  <p className="text-sm text-gray-500">Farmers Helped</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
              Farmer Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from farmers who've transformed their operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Rajesh Patel",
                role: "Wheat Farmer, Punjab",
                text: "The advisory services helped me increase my yield by 40% while reducing water usage.",
                avatar: "👨‍🌾"
              },
              {
                name: "Priya Sharma",
                role: "Organic Farmer, Kerala",
                text: "Their sustainable farming techniques completely changed my approach to agriculture.",
                avatar: "👩‍🌾"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-200"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AgriAdvisory</h3>
              <p className="text-gray-400">
                Empowering farmers through knowledge and innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">info@agriadvisory.com</p>
              <p className="text-gray-400">+91 98765 43210</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} AgriAdvisory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;