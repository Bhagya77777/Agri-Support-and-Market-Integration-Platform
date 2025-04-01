import React from "react";
import { Link } from "react-router-dom";

function Footeer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-auto relative">
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -translate-y-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute w-full h-full"
        >
          <path
            fill="#1f2937"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="flex justify-center mb-10">
          <div className="bg-green-950 p-6 rounded-xl text-center w-full max-w-xl">
            <h4 className="text-green-600 font-bold mb-2">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-white mb-3">
              Get updates on new farming technologies and best practices
            </p>
            <div className="flex">
              <input
                type="email"
                className="w-full p-2 rounded-l-md border border-green-400"
                placeholder="Your email address"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About Us */}
          <div>
            <h5 className="text-green-400 font-bold mb-3">About Us</h5>
            <p className="text-gray-400">
              Agri-Support connects farmers and buyers through innovative
              technology for sustainable agriculture and efficient market
              integration across Sri Lanka.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-green-400 font-bold mb-3">Navigate</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/store"
                  className="text-gray-400 hover:text-green-400"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="text-gray-400 hover:text-green-400"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-green-400"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-green-400">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-green-400 font-bold mb-3">Services</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/market-insights"
                  className="text-gray-400 hover:text-green-400"
                >
                  Market Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/logistics"
                  className="text-gray-400 hover:text-green-400"
                >
                  Logistics
                </Link>
              </li>
              <li>
                <Link
                  to="/quality-check"
                  className="text-gray-400 hover:text-green-400"
                >
                  Quality Assurance
                </Link>
              </li>
              <li>
                <Link
                  to="/bulk-orders"
                  className="text-gray-400 hover:text-green-400"
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h5 className="text-green-400 font-bold mb-3">Contact Us</h5>
            <p className="text-gray-400">
              Email:{" "}
              <a
                href="mailto:support@agri-support.com"
                className="hover:text-green-400"
              >
                support@agri-support.com
              </a>
            </p>
            <p className="text-gray-400">
              Call:{" "}
              <a href="tel:+94112345678" className="hover:text-green-400">
                +94 11 234 5678
              </a>
            </p>
            <p className="text-gray-400">
              WhatsApp:{" "}
              <a
                href="https://wa.me/94112345678"
                className="hover:text-green-400"
              >
                +94 11 234 5678
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-6 border-gray-600" />
        <div className="flex flex-col lg:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Agri-Support. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="hover:text-green-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-green-400">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-green-400">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footeer;
