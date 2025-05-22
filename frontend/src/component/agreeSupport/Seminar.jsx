import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Seminar() {
  {
    /*const seminarDate = new Date("2025-05-20T10:00:00").getTime(); // Seminar Date & Time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const navigate = useNavigate();
    const now = new Date().getTime();
    const difference = seminarDate - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);*/
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-xl text-center">
        {/* Seminar Info */}
        <h1 className="text-3xl font-bold text-indigo-700">
          🌍 Online Agri-Tech Seminar 2025
        </h1>
        <p className="text-gray-600 mt-2">
          Join us for an insightful session on the future of agriculture &
          modern farming technology.
        </p>

        {/* Countdown Timer 
        <div className="mt-6 text-xl font-semibold">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg">
            {timeLeft.days}d
          </span>{" "}
          :
          <span className="bg-indigo-500 text-white px-3 py-1 rounded-lg">
            {timeLeft.hours}h
          </span>{" "}
          :
          <span className="bg-indigo-400 text-white px-3 py-1 rounded-lg">
            {timeLeft.minutes}m
          </span>{" "}
          :
          <span className="bg-indigo-300 text-white px-3 py-1 rounded-lg">
            {timeLeft.seconds}s
          </span>
        </div>*/}

        {/* Speaker Section */}
        <div className="mt-6 flex items-center justify-center">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Speaker "
              className="rounded-full w-20 h-20"
            />
            <div>
              <h2 className="text-lg font-bold">Mrs.B.A.H.Bamnnuarachchi</h2>
              <p className="text-gray-500">Agricultural Expert</p>
            </div>
          </div>
        </div>

        {/* Seminar Schedule */}
        <div className="mt-6 text-left">
          <h3 className="text-xl font-bold text-gray-700">
            📅 Seminar Schedule -3rd of April 2025
          </h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>
              ✅ 10:00 AM - Introduction to modern agricultural technologies
            </li>
            <li>✅ 11:00 AM - AI & Machine Learning in Farming</li>
            <li>✅ 12:00 PM - IoT-Based Smart Agriculture</li>
            <li>✅ 1:00 PM - Q&A Session</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Seminar;
