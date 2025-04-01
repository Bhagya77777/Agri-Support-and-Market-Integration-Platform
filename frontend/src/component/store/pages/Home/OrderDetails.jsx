import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderReport from '../../components/OrderReport';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiX, FiTrash2, FiDownload, FiMail, FiRefreshCw } from 'react-icons/fi';

function OrderDetails() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Failed to load order details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleEmailSend = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        setIsLoading(true);
        
        const formData = {
            recipientEmail: event.target.recipientEmail.value,
            subject: event.target.subject.value,
            message: event.target.message.value,
        };

        try {
            const response = await axios.post('http://localhost:5000/send-email', formData);
            if (response.data.success) {
                setResult("Email sent successfully!");
                event.target.reset();
            } else {
                setResult(response.data.message);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setResult('Failed to send email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setResult("");
        document.getElementById("order-form").reset();
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleStatusUpdate = async (status) => {
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
            setOrder(prevOrder => ({ ...prevOrder, status }));
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
            handleBack();
        } catch (error) {
            console.error('Error deleting order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="glass-card p-8 rounded-2xl text-center">
                    <p className="text-red-600 font-bold text-lg">{error}</p>
                    <button 
                        onClick={handleBack}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center mx-auto"
                    >
                        <FiArrowLeft className="mr-2" /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!order || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="glass-card p-8 rounded-2xl text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-700">Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden p-4 md:p-8">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10"></div>
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>

            {/* 3D Animation */}
            <div className="absolute top-10 right-10 w-32 h-32 hidden md:block">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Box position={[0, 0, 0]} args={[2, 1, 1]}>
                        <meshStandardMaterial color="#4F46E5" />
                    </Box>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                </Canvas>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-center mb-8"
                >
                    <button
                        onClick={handleBack}
                        className="flex items-center text-blue-600 hover:text-blue-800 group transition-colors"
                    >
                        <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to Orders
                    </button>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Order Details
                    </h2>
                    <div className="w-8"></div> {/* Spacer */}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Information */}
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-card p-6 rounded-2xl"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                            Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Customer Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{order.customerInfo.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{order.customerInfo.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-medium">{order.customerInfo.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-medium">{order.customerInfo.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Order Status</h4>
                                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {order.status}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Order Items</h4>
                                <div className="space-y-3">
                                    {order.items.map((item) => (
                                        <div key={item._id} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-blue-600">LKR {item.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-medium text-gray-700">Total Amount</p>
                                    <p className="text-xl font-bold text-purple-600">
                                        LKR {order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleStatusUpdate('Completed')}
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition-colors"
                                disabled={isLoading}
                            >
                                <FiCheck className="mr-2" /> Accept Order
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleStatusUpdate('Cancelled')}
                                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-colors"
                                disabled={isLoading}
                            >
                                <FiX className="mr-2" /> Cancel Order
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDelete}
                                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-full shadow hover:bg-gray-600 transition-colors"
                                disabled={isLoading}
                            >
                                <FiTrash2 className="mr-2" /> Delete Order
                            </motion.button>
                            <PDFDownloadLink
                                document={<OrderReport order={order} />}
                                fileName={`Order_Report_${order._id}.pdf`}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-colors"
                            >
                                {({ loading }) => (
                                    <>
                                        <FiDownload className="mr-2" />
                                        {loading ? 'Generating...' : 'Download Report'}
                                    </>
                                )}
                            </PDFDownloadLink>
                        </div>
                    </motion.div>

                    {/* Email Form */}
                    <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-card p-6 rounded-2xl"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                            Contact Customer
                        </h3>
                        
                        <form id="order-form" onSubmit={handleEmailSend} className="space-y-4">
                            <div>
                                <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    Recipient Email
                                </label>
                                <input
                                    type="email"
                                    id="recipientEmail"
                                    name="recipientEmail"
                                    defaultValue={order.customerInfo.email}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    defaultValue={`Regarding Your Order #${order._id.slice(-8).toUpperCase()}`}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="flex justify-between pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={handleClear}
                                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition-colors"
                                >
                                    <FiRefreshCw className="mr-2" /> Clear
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow hover:from-blue-600 hover:to-purple-700 transition-colors"
                                    disabled={isLoading}
                                >
                                    <FiMail className="mr-2" /> {isLoading ? 'Sending...' : 'Send Email'}
                                </motion.button>
                            </div>
                            
                            {result && (
                                <div className={`mt-4 p-3 rounded-lg ${
                                    result.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}>
                                    {result}
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Glass Card Styles */}
            <style jsx>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
                }
            `}</style>
        </div>
    );
}

export default OrderDetails;