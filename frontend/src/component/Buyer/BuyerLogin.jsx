import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check for admin credentials first
    if (formData.email === 'admin@gmail.com' && formData.password === '123') {
      localStorage.setItem('user', JSON.stringify({ email: 'admin@gmail.com', isAdmin: true }));
      setLoading(false);
      navigate('/admin_home');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/buyer/login', formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false);
      navigate('/main');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="bg-yellow-50 min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg border border-brown-200 max-w-md w-full">
        <div className="bg-green-50 border-b border-brown-200 p-5 text-center">
          <h3 className="text-green-700 font-bold text-lg mb-1">Welcome Back</h3>
          <p className="text-brown-500 text-green-300">Please enter your credentials to login</p>
        </div>
        <div className="p-6">
          {error && <div className="bg-red-100 text-red-700 border border-red-500 p-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-green-700 font-medium block mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full border border-yellow-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-green-700 font-medium">
                  Password
                </label>
                <a href="#" className="text-orange-700 text-sm">Forgot password?</a>
              </div>
              <input
                type="password"
                className="w-full border border-yellow-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 flex items-center gap-2">
              <input type="checkbox" id="rememberMe" className="accent-green-700" />
              <label htmlFor="rememberMe" className="text-green-400">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-green-400"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center mt-4">
              <p className="text-brown-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-orange-700 underline"
                  onClick={() => navigate('/buyersignup')}
                >
                  Sign up here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;