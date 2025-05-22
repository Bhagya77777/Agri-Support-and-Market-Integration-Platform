import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Features', url: '/features' },
        { name: 'Pricing', url: '/pricing' },
        { name: 'API', url: '/api' },
        { name: 'Integrations', url: '/integrations' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', url: '/about' },
        { name: 'Blog', url: '/blog' },
        { name: 'Careers', url: '/careers' },
        { name: 'Contact', url: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', url: '/privacy' },
        { name: 'Terms', url: '/terms' },
        { name: 'Cookie Policy', url: '/cookie-policy' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="hexagon-logo bg-gradient-to-r from-green-500 to-teal-600 w-12 h-12 flex items-center justify-center text-white font-bold text-xl mx-auto md:mx-0">
              AS
            </div>
            <p className="text-gray-400 text-sm">
              AgriSupport & Market Integration Platform - Connecting farmers with markets and resources since 2023.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social, index) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-lg`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer links */}
          {footerLinks.map((column, colIndex) => (
            <motion.div 
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: colIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.05 + colIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-green-400 tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get updates on new features and agricultural insights.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full hexagon-button bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-4 text-sm font-medium"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AgriSupport. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;