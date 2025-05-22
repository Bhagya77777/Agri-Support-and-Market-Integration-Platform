const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email content for each status
const statusMessages = {
  'FIRST MILE RECEIVE SCAN': {
    subject: 'Your Package Has Been Received at First Mile',
    message: `
      <p>Your delivery order has been received and is being processed at the origin facility.</p>
      <p>We’ll update you with the next steps soon. http://localhost:5173/tracking</p>
    `
  },
  'RECEIVED IN FACILITY': {
    subject: 'Package Arrived at Sorting Facility',
    message: `
      <p>Your package has successfully reached our sorting facility.</p>
      <p>We are preparing it for the next phase of delivery. http://localhost:5173/tracking</p>
    `
  },
  'OUT FOR DELIVERY': {
    subject: 'Out for Delivery - Your Package is on the Way!',
    message: `
      <p>Exciting news! Your package is out for delivery and will arrive soon.</p>
      <p>Please keep your contact number available for the delivery personnel. http://localhost:5173/tracking</p>
    `
  },
  'DELIVERED': {
    subject: 'Delivery Complete - Thank You!',
    message: `
      <p>Your package has been successfully delivered.</p>
      <p>Thank you for choosing our service. We hope to serve you again soon! http://localhost:5173/tracking</p>
    `
  },
  'default': {
    subject: 'Your Delivery Order Has Been Submitted',
    message: `
      <p>Your delivery order has been successfully created.</p>
      <p>You can track the status of your package using your Order ID. http://localhost:5173/tracking</p>
    `
  }
};

const sendOrderConfirmation = (to, orderId, status = 'default') => {
  const { subject, message } = statusMessages[status] || statusMessages['default'];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <h3>Delivery Order #${orderId}</h3>
      ${message}
      <br/>
      <p>Best regards,<br/>Logistics Team</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendOrderConfirmation };
