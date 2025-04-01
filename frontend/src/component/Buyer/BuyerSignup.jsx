import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BuyerSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "phoneNumber") {
      updatedValue = value.replace(/\D/g, "");
      if (updatedValue.length > 10) return;
    } else if (name === "firstName" || name === "lastName") {
      updatedValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "email") {
      updatedValue = value.replace(/[^a-zA-Z0-9@.]/g, "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/buyer/signup', formData);
      setLoading(false);
      setSuccess(response.data.message);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen py-10">
      <div className="container mx-auto max-w-lg shadow-lg rounded-lg border border-yellow-200 p-6">
        <div className="text-center mb-6">
          <h3 className="text-green-700 font-bold text-xl mb-1">Create An Account</h3>
          <p className="text-brown-600">Please fill in your details to sign up</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 border border-red-500 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 border border-green-500 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          {['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'address', 'password'].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-green-700 font-medium mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                className="w-full border text-green-950 border-yellow-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 w-full rounded-md transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="text-center mt-4">
            <p className="text-brown-600">
              Already have an account?{' '}
              <button
                type="button"
                className="text-orange-600 hover:text-orange-700 underline"
                onClick={() => navigate('/')}
              >
                Log in here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyerSignup;