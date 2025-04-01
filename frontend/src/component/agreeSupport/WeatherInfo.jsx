import React, { useState, useEffect } from "react";
import axios from "axios";
function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Colombo"); // Example: location for farming
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "302dad3207f29e5e400d7fa4fd21bc90"; // Replace with your actual API key

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl text-center font-bold text-green-600 mb-4">
        Agricultural Weather Info
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
          className="p-2 border rounded-md"
        />
      </div>

      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : weather ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-lg">Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">Humidity: {weather.main.humidity}%</p>
          <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherInfo;
