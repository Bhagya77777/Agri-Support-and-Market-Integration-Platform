import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Store', path: '/buyer' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
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
                  <Link 
                    to={item.path}
                    className="relative group"
                  >
                    <span className="text-lg font-bold text-white/90 hover:text-white transition-colors duration-300">
                      {item.name}
                    </span>
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ 
                        width: '100%',
                        transition: { duration: 0.3 }
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Modernized */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <div className="flex items-center space-x-6">
              <Link 
                to="/buyer-login" 
                className="text-lg font-semibold text-white/90 hover:text-white transition-colors duration-300"
              >
                Log in
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile menu button - Modernized */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-emerald-300 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;