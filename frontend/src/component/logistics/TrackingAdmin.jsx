import React, { useState } from 'react';
import axios from 'axios';

const TrackingAdmin = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.patch(`http://localhost:5000/api/update-status/${orderId}`, {
        status
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Order Status</h2>

      <form onSubmit={handleStatusUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tracking ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">-- Select Status --</option>
            <option value="RECEIVED IN FACILITY">RECEIVED IN FACILITY</option>
            <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Update Status
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-blue-600">{message}</p>
      )}
    </div>
  );
};

export default TrackingAdmin;
