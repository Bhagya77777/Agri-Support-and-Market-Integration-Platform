import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <main className="pt-24 pb-12 px-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
            Agricultural Advice Portal
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get expert guidance for your cultivation challenges
          </p>
        </header>

        {/* Advice Form Section */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Ask Our Experts
            </h2>
            <p className="text-gray-600">
              Submit your questions about crops, soil, pests, or any agricultural concern
            </p>
          </div>
          <AgriAdviceForm />
        </section>

        {/* Additional Resources */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Crop Guides",
              desc: "Detailed cultivation techniques",
              icon: "🌱"
            },
            {
              title: "Pest Solutions",
              desc: "Organic pest management",
              icon: "🐛"
            },
            {
              title: "Market Trends",
              desc: "Current agricultural markets",
              icon: "📈"
            }
          ].map((resource, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{resource.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {resource.title}
              </h3>
              <p className="text-gray-600">{resource.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AgriAdvisory. All rights reserved.
      </footer>
    </div>
  );
}

export default Advice;