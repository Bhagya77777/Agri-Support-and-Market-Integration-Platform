import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BuyerHeader from './BuyerHeader';
import BuyerFooter from './BuyerFooter';

function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || !loggedInUser.id) {
          alert('User is not logged in. Redirecting to login page.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/buyer/profile/${loggedInUser.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/buyer/profile/${user.id}`, user);
      setSuccessMessage(response.data.message);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/buyer/profile/${user.id}`);
      alert('Your account has been deleted successfully.');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-yellow-50">
      <BuyerHeader />

      <main className="flex-grow py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6">My Profile</h1>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div>
              {error && <p className="text-red-600">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'address'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={user[field]}
                      onChange={handleInputChange}
                      className="w-full border text-green-950 border-yellow-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={field === 'email'}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  onClick={handleDeleteProfile}
                >
                  Delete Account
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BuyerFooter />
    </div>
  );
}

export default Profile;