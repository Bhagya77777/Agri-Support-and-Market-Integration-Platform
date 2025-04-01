// Converted BuyerHeader Component with Tailwind
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BuyerHeader() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Brand */}
        <Link to="/store" className="text-2xl font-bold text-green-600">
          Agri-Support
        </Link>

        {/* Toggler (Mobile View) */}
        <button
          className="lg:hidden text-gray-500 focus:outline-none"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Links & User Info */}
        <div
          className="hidden lg:flex items-center space-x-6"
          id="navbarNav"
        >
          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-green-600 hover:bg-green-100"
                data-bs-toggle="dropdown"
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
                  {user.firstName} {user.lastName}
                </span>
              </button>
              <div className="hidden absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <Link
                  to="/profile"
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default BuyerHeader;