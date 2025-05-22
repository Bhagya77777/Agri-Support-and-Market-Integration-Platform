
import React, { useEffect } from 'react';

const PaymentGateway = ({ order }) => {
 
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js ';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.PayHere) {
      alert("Payment gateway is not loaded yet.");
      return;
    }

    const totalAmount = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const paymentData = {
      sandbox: true, 
      merchant_id: "1230442", 
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      notify_url: "http://localhost:5000/api/ipn",
      order_id: order._id,
      items: order.items.map(item => item.name).join(", "),
      currency: "LKR",
      amount: totalAmount.toFixed(2),
      first_name: order.customerInfo.name.split(" ")[0],
      last_name: order.customerInfo.name.split(" ").slice(1).join(" ") || "",
      email: order.customerInfo.email,
      phone: order.customerInfo.phone,
      address: order.customerInfo.address,
      city: "Colombo",
      country: "Sri Lanka"
    };

    window.PayHere.init(paymentData);
    window.PayHere.startPayment();
  };

  return (
    <button className="btn btn-success" onClick={handlePayment}>
      Pay Now
    </button>
  );
};

export default PaymentGateway;