import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import FarmerHeader from './FarmerHeader';
import FarmerFooter from './FarmerFooter';

interface Order {
    _id: string;
    customerInfo: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
    items: {
        _id: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    status: string;
    createdAt: string;
}

const FarmerViewOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/farmer/get-orders');
            setOrders(res.data.data);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this order?');
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:5000/api/farmer/delete-order/${id}`);
            setOrders(prev => prev.filter(order => order._id !== id));
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    return (
        <>
            <FarmerHeader />
            <div className="min-h-screen bg-blue-50 px-4 md:px-8 py-6 pb-32">
                <h1 className="text-2xl font-semibold mb-6 text-center text-blue-800 pb-32">Customer Orders</h1>

                {loading ? (
                    <div className="text-center text-blue-600">Loading...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-gray-600">No orders found.</div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl p-6 border shadow-md hover:shadow-lg transition-transform hover:scale-[1.01]"
                            >
                                <div className="mb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-bold text-green-700">{order.customerInfo.name}</h2>
                                            <p className="text-sm text-gray-600">📞 {order.customerInfo.phone}</p>
                                            <p className="text-sm text-gray-600">✉️ {order.customerInfo.email}</p>
                                            <p className="text-sm text-gray-600">📍 {order.customerInfo.address}</p>
                                        </div>
                                        <div className="text-sm text-white px-3 py-1 rounded-full bg-yellow-500">
                                            {order.status}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">🕒 {new Date(order.createdAt).toLocaleString()}</p>
                                </div>

                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <h3 className="font-medium text-gray-800 mb-2">🧾 Ordered Items:</h3>
                                    <ul className="space-y-1">
                                        {order.items.map(item => (
                                            <li key={item._id} className="text-sm text-gray-700">
                                                - {item.name} × {item.quantity} (Rs. {item.price})
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => deleteOrder(order._id)}
                                        title="Delete Order"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <FarmerFooter />
        </>
    );
};

export default FarmerViewOrders;
