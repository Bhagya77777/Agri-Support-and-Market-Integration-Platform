import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-emerald-50 min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl font-bold text-gray-900">
                Cultivating <span className="text-emerald-600">Innovation</span> in Agriculture
              </h1>
              <p className="text-xl text-gray-600">
                AgriSupport is revolutionizing farming through technology, sustainability, and community empowerment.
              </p>
              <div className="flex space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
                >
                  Our Services
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold"
                >
                  Contact Team
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="hexagon-shape bg-emerald-100 w-full h-96"></div>
              <img 
                src="/images/farmers.jpg" 
                alt="Farmers using AgriSupport technology"
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our <span className="text-emerald-600">Mission</span></h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Empower Farmers",
                description: "Provide cutting-edge tools to increase yields and reduce waste."
              },
              {
                icon: "🌍",
                title: "Sustainable Practices",
                description: "Promote eco-friendly farming methods for a healthier planet."
              },
              {
                icon: "🤝",
                title: "Community Focus",
                description: "Connect farmers with resources, knowledge, and markets."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="/images/farm-tech.jpg" 
                alt="Agricultural technology"
                className="rounded-xl shadow-xl w-full"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our <span className="text-emerald-600">Story</span></h2>
              <p className="text-gray-600 mb-6">
                Founded in 2018 by a team of agronomists and technologists, AgriSupport began as a small startup with a big vision: to bridge the gap between traditional farming and modern technology.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a simple soil monitoring app has grown into a comprehensive platform serving over 50,000 farmers across 12 countries. Our solutions help farmers increase productivity while reducing environmental impact.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-emerald-600 text-2xl font-bold">50K+</div>
                  <div className="text-gray-500">Farmers</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-emerald-600 text-2xl font-bold">12</div>
                  <div className="text-gray-500">Countries</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-emerald-600 text-2xl font-bold">30%</div>
                  <div className="text-gray-500">Avg. Yield Increase</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-emerald-600 text-2xl font-bold">45%</div>
                  <div className="text-gray-500">Water Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our <span className="text-emerald-600">Team</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate experts driving innovation in agricultural technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Chief Agronomist",
                image: "/images/team1.jpeg",
                bio: "PhD in Agricultural Science with 15 years field experience"
              },
              {
                name: "James Rodriguez",
                role: "Tech Lead",
                image: "/images/team2.jpeg",
                bio: "Former Silicon Valley engineer turned ag-tech innovator"
              },
              {
                name: "Amina Diallo",
                role: "Sustainability Director",
                image: "/images/team3.jpeg",
                bio: "Expert in regenerative farming practices"
              },
              {
                name: "Michael Park",
                role: "Farmer Relations",
                image: "/images/team4.jpeg",
                bio: "4th generation farmer turned technology advocate"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 bg-emerald-100 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <div className="text-emerald-600 font-medium mb-2">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join the Agricultural Revolution</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Whether you're a farmer, researcher, or agriculture enthusiast, we'd love to connect.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold shadow-lg"
          >
            Get Started Today
          </motion.button>
        </div>
      </section>

      {/* Footer - Matching Navbar Style */}
      <footer className="bg-white/5 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="hexagon-logo bg-gradient-to-r from-green-600 to-emerald-500 w-10 h-10 flex items-center justify-center text-white font-bold shadow-md">
                  <span className="text-lg">AS</span>
                </div>
                <span className="ml-2 text-white font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  AgriSupport
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Innovating agriculture for a sustainable future.
              </p>
            </div>
            {[
              {
                title: "Company",
                links: ["About", "Careers", "News", "Partners"]
              },
              {
                title: "Resources",
                links: ["Blog", "Guides", "Webinars", "Research"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Licenses"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2023 AgriSupport. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                <Link key={social} to="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-xl`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;