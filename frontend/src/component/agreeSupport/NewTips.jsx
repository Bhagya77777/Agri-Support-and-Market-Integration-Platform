import React, { useState } from "react";
import axios from "axios";

function NewTips() {
  const [query, setQuery] = useState("");
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlants = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=sk-ZvC767e202e06b3109387&q=${query}`
      );
      setPlants(response.data.data);
    } catch (err) {
      setError("Failed to fetch plant data.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        🌿 Perenual Plant Search
      </h1>

      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-400"
          placeholder="Search for a plant..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          onClick={fetchPlants}
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {plants.map((plant) => (
          <div key={plant.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={
                plant.default_image?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={plant.common_name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">
              {plant.common_name || "Unknown"}
            </h3>
            <p className="text-sm text-gray-500">
              🌞 {plant.sunlight?.join(", ") || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              💧 {plant.watering || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewTips;
