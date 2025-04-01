import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is admin, otherwise redirect
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Admin dashboard cards data
  const adminCards = [
    {
      title: "Manage Registration & Profile",
      description: "Manage user registrations and profiles",
      path: "/admin/registrations",
      icon: "👥",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700"
    },
    {
      title: "Manage Delivery Order Track",
      description: "Track and manage delivery orders",
      path: "/admin/delivery-orders",
      icon: "🚚",
      bgColor: "bg-green-100",
      textColor: "text-green-700"
    },
    {
      title: "Manage Warehouse Request",
      description: "Handle warehouse storage requests",
      path: "/admin/warehouse-requests",
      icon: "🏭",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700"
    },
    {
      title: "Manage Stores",
      description: "Administer store listings and details",
      path: "/admin/stores",
      icon: "🏪",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700"
    },
    {
      title: "Manage Agree Supports",
      description: "Manage agricultural support programs",
      path: "/admin/agri-supports",
      icon: "🌱",
      bgColor: "bg-teal-100",
      textColor: "text-teal-700"
    },
    {
      title: "Manage Farmers",
      description: "Administer farmer profiles and data",
      path: "/admin/farmers",
      icon: "👨‍🌾",
      bgColor: "bg-orange-100",
      textColor: "text-orange-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-green-700">1,248</p>
            <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Active Orders</h3>
            <p className="text-3xl font-bold text-blue-700">356</p>
            <p className="text-sm text-gray-500 mt-2">+5% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Farmers Registered</h3>
            <p className="text-3xl font-bold text-purple-700">782</p>
            <p className="text-sm text-gray-500 mt-2">+8% from last month</p>
          </div>
        </div>

        {/* Admin Functionality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => (
            <div 
              key={index}
              className={`${card.bgColor} p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer`}
              onClick={() => navigate(card.path)}
            >
              <div className="flex items-start">
                <span className="text-3xl mr-4">{card.icon}</span>
                <div>
                  <h3 className={`text-lg font-bold ${card.textColor} mb-2`}>{card.title}</h3>
                  <p className="text-gray-700">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center border-b pb-3">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <span className="text-blue-700">📝</span>
              </div>
              <div>
                <p className="font-medium">New registration approved</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center border-b pb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <span className="text-green-700">✅</span>
              </div>
              <div>
                <p className="font-medium">Order #ORD-2045 completed</p>
                <p className="text-sm text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <span className="text-yellow-700">⚠️</span>
              </div>
              <div>
                <p className="font-medium">Warehouse request needs attention</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;