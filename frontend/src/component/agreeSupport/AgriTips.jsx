import React, { useState, useEffect } from "react";
import axios from "axios";
function AgriTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        // Sample Free API for Agri Tips
        const response = await axios.get(
          "https://api.sampleapis.com/farming/tips"
        );
        setTips(response.data);
      } catch (err) {
        setError("Failed to fetch Agri Tips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg my-5">
      <h2 className="text-2xl font-bold text-center">🌱 Agriculture Tips</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="list-disc p-4">
        {tips.slice(0, 5).map((tip, index) => (
          <li key={index} className="text-lg">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgriTips;
