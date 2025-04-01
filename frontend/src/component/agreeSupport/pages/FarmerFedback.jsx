import React, { useState } from "react";
import { Link } from "react-router-dom";
import Feedback from "../Feedback";
import WeatherInfo from "../WeatherInfo";
import NewTips from "../NewTips";

function FarmerFedback() {
  const [activeTab, setActiveTab] = useState("Feedbacks");

  const navItems = [
    { name: "Home", path: "/agreeSupport", icon: "🏠" },
    { name: "Feedbacks", path: "/feedback", icon: "💬" },
    { name: "Advises", path: "/advice", icon: "💡" },
    { name: "Skill Development", path: "/skill_development", icon: "📚" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
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

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
            Farmer Feedback Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your experiences and help us improve agricultural services
          </p>
        </header>

        {/* Feedback Component */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <Feedback />
          </div>
        </section>

        {/* Weather Info Component */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <WeatherInfo />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <NewTips />
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Submit Your Feedback
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AgriAdvisory. All rights reserved.
      </footer>
    </div>
  );
}

export default FarmerFedback;