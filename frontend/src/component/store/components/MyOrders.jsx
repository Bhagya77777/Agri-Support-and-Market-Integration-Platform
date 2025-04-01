import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaTrashAlt, FaTimesCircle, FaFilePdf } from 'react-icons/fa';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || !loggedInUser.id) {
          setError('User is not logged in.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/user/${loggedInUser.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleBack = () => {
    navigate('/store');
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: 'Cancelled' });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
      alert(response.data.message);
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel the order. Please try again.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      alert(response.data.message);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete the order. Please try again.');
    }
  };

  const handleDownloadReport = (order) => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Order Report', 20, 20);

    // Add order details
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 30);
    doc.text(`Customer: ${order.customerInfo.name}`, 20, 40);
    doc.text(`Email: ${order.customerInfo.email}`, 20, 50);
    doc.text(`Phone: ${order.customerInfo.phone}`, 20, 60);
    doc.text(`Address: ${order.customerInfo.address}`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);

    // Add items
    doc.text('Items:', 20, 90);
    let yPosition = 100;
    order.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} - LKR ${item.price} x ${item.quantity}`, 25, yPosition);
      yPosition += 10;
    });

    // Add total amount
    doc.text(`Total Amount: LKR ${calculateTotalAmount(order.items)}`, 20, yPosition + 10);

    // Save the PDF
    doc.save(`Order_Report_${order._id}.pdf`);
  };

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container my-5">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="btn btn-outline-success btn-lg px-4 py-2"
          style={{
            borderRadius: '25px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <FaArrowLeft className="me-2" /> Back to Store
        </button>
      </div>

      {/* Title */}
      <h2 className="text-center mb-4 text-success">My Orders</h2>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center p-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-secondary">Loading your orders...</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Orders */}
      {orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-header bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fw-bold">Order #{order._id.substr(-6)}</span>
                    <span
                      className={`badge ${
                        order.status === 'Completed'
                          ? 'bg-success'
                          : order.status === 'Pending'
                          ? 'bg-warning text-dark'
                          : 'bg-danger'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  {/* Total Amount */}
                  <p>
                    <strong>Total Amount:</strong>{' '}
                    <span className="text-success fw-bold">LKR {calculateTotalAmount(order.items)}</span>
                  </p>

                  {/* Items */}
                  <h5 className="mt-3 text-success">
                    <FaBox className="me-2" />
                    Items:
                  </h5>
                  <ul className="list-group">
                    {order.items.map((item) => (
                      <li 
                        key={item._id} 
                        className="list-group-item d-flex justify-content-between"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span className="text-success">LKR {item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Customer Information */}
                  <div className="mt-4 p-3 bg-light rounded">
                    <h5 className="text-success mb-3">Customer Information:</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Name:</strong> {order.customerInfo.name}</p>
                        <p><strong>Email:</strong> {order.customerInfo.email}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                        <p><strong>Address:</strong> {order.customerInfo.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 d-flex justify-content-end gap-3">
                    {order.status === 'Pending' && (
                      <button
                        className="btn btn-warning"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        <FaTimesCircle className="me-2" />
                        Cancel Order
                      </button>
                    )}
                    {order.status === 'Cancelled' && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <FaTrashAlt className="me-2" />
                        Delete Order
                      </button>
                    )}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDownloadReport(order)}
                    >
                      <FaFilePdf className="me-2" />
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-5">
            <div style={{ color: '#8D6E63', fontSize: '3rem', marginBottom: '1rem' }}>
              <FaBox />
            </div>
            <h3 className="text-secondary">No orders found.</h3>
            <button 
              onClick={handleBack}
              className="btn btn-success mt-3"
            >
              Start Shopping
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default MyOrders;