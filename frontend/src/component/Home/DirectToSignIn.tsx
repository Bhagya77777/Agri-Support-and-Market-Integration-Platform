import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DirectToSignIn = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    const handleRedirect = () => {
        if (!role) {
            alert('Please select a user type.');
            return;
        }
        if (role === 'Customer') {
            navigate('/customerLogin');
        } else if (role === 'Farmer') {
            navigate('/farmer_login');
        } else if (role === 'Buyer') {
            navigate('/buyer-login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Select Login Type</h2>

                <select
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">-- Select User Type --</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Customer">Customer</option>
                </select>

                <button
                    onClick={handleRedirect}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default DirectToSignIn;
