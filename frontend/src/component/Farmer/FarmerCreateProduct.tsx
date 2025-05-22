import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerHeader from './FarmerHeader';
import FarmerFooter from './FarmerFooter';

const FarmerCreateProduct = () => {
  const [farmerId, setFarmerId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    productionCost: '',
    fairProfitMargin: 30,
    farmer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      if (parsedUser && parsedUser._id) {
        setFarmerId(parsedUser._id);
        setForm(prev => ({ ...prev, farmer: parsedUser._id }));
      } else {
        console.error('User _id not found');
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/products/create-products', form);
      setSuccess(response.data.message || 'Product created successfully!');
      alert(response.data.message || 'Product created successfully!');
      setForm({
        name: '',
        category: '',
        price: '',
        quantity: '',
        productionCost: '',
        fairProfitMargin: 30,
        farmer: farmerId || '',
      });
    } catch (error) {
      console.error('Error submitting product:', error);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FarmerHeader />
      <div className="min-h-screen bg-green-50 px-4 md:px-8 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Create New Product</h2>

          {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-sm text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg)</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Production Cost (Rs)</label>
              <input
                type="number"
                name="productionCost"
                value={form.productionCost}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fair Profit Margin (%)</label>
              <input
                type="number"
                name="fairProfitMargin"
                value={form.fairProfitMargin}
                onChange={handleChange}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                {loading ? 'Submitting...' : 'Submit Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <FarmerFooter />
    </>
  );
};

export default FarmerCreateProduct;
