import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FarmerHeader from './FarmerHeader';
import FarmerFooter from './FarmerFooter';

function FarmerProfile() {
  const [farmer, setFarmer] = useState({
    farmerName: '',
    cropType: '',
    farmSize: '',
    farmLocation: '',
    phoneNumber: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const loggedInFarmer = JSON.parse(localStorage.getItem("user"));
        if (!loggedInFarmer || !loggedInFarmer._id) {
          alert('Farmer not logged in. Redirecting...');
          navigate('/selection');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/farmer/profile/${loggedInFarmer._id}`);
        setFarmer(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarmer();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer({ ...farmer, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/farmer/profile/${farmer._id}`, farmer);
      setSuccessMessage(response.data.message || 'Profile updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Update failed.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/farmer/profile/${farmer._id}`);
      alert('Account deleted');
      localStorage.removeItem("farmer");
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Delete failed.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <FarmerHeader />

      <main className="flex-grow py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-6">My Profile</h1>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {error && <p className="text-red-600">{error}</p>}
              {successMessage && <p className="text-green-600">{successMessage}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'farmerName', label: 'Farmer Name' },
                  { name: 'cropType', label: 'Crop Type' },
                  { name: 'farmSize', label: 'Farm Size' },
                  { name: 'farmLocation', label: 'Farm Location' },
                  { name: 'phoneNumber', label: 'Phone Number' },
                  { name: 'email', label: 'Email', disabled: true }
                ].map(({ name, label, disabled }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    <input
                      type="text"
                      name={name}
                      value={farmer[name]}
                      onChange={handleChange}
                      disabled={disabled}
                      className="w-full border text-green-900 border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <FarmerFooter />
    </div>
  );
}

export default FarmerProfile;
