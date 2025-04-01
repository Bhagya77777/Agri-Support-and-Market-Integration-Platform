import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Floating Glass Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-max">
        <div className="flex items-center bg-white/80 backdrop-blur-lg rounded-full shadow-lg p-1 border border-gray-200/50">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === item.name
                  ? "bg-orange-500 text-white shadow-md"
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
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 mb-4">
            Agricultural Skill Development
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Master modern farming techniques through our specialized training programs
          </p>
        </header>

        {/* Seminar Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
              Upcoming Training Seminars
            </h2>
            <Seminar />
          </div>
        </section>

        {/* Registration Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
              Register for Programs
            </h2>
            <Register />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Hands-on Training",
              desc: "Practical field experience with experts",
              icon: "👨‍🌾"
            },
            {
              title: "Latest Techniques",
              desc: "Learn cutting-edge farming methods",
              icon: "🧪"
            },
            {
              title: "Certification",
              desc: "Earn recognized qualifications",
              icon: "🏅"
            }
          ].map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} AgriSkills. All rights reserved.
      </footer>
    </div>
  );
}

export default SkillDevelopment;