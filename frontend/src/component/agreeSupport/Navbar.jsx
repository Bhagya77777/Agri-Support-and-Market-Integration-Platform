import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 m-2 text-white from-green-500 to bg-green-800 rounded-md focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-green-800 text-white w-64 p-5 shadow-md transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-xl font-bold mb-6">Agro Lanka</h1>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/feedback"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Feedbacks
          </Link>
          <Link
            to="/advice"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Advices
          </Link>

          <Link
            to="/skill_development"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Skill Development
          </Link>

          <Link
            to="/services"
            className="hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
