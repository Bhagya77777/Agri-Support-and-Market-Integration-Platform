import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/selection");
  };

  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Modernized */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center"
          >
            <div className="hexagon-logo bg-gradient-to-r from-green-600 to-emerald-500 w-12 h-12 flex items-center justify-center text-white font-bold shadow-md">
              <span className="text-xl">AS</span>
            </div>
            <span className="ml-3 text-white font-bold text-2xl bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              AgriSupport
            </span>
          </motion.div>

          {/* Desktop Navigation - Modern Style */}
          <div className="hidden md:block">
            <div className="ml-12 flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link to={item.path} className="relative group">
                    <span className="text-lg font-bold text-white/90 hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ width: 0 }}
                      whileHover={{
                        width: "100%",
                        transition: { duration: 0.3 },
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth/User Dropdown */}
          <div className="hidden lg:flex items-center space-x-6" id="navbarNav">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-green-600 hover:bg-green-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1a4 4 0 008 0V6a4 4 0 00-4-4zM4 8v7a4 4 0 004 4h4a4 4 0 004-4V8H4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.farmerName}
                  </span>
                </button>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <Link
                      to={
                        user.firstName && user.lastName
                          ? "/profile"
                          : "/farmer_profile"
                      }
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:block"
              >
                <div className="flex items-center space-x-6">
                  <Link
                    to="/selection"
                    className="text-lg font-semibold text-white/90 hover:text-white transition-colors duration-300"
                  >
                    Log in
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-emerald-300 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
