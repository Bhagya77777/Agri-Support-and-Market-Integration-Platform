import { useState } from "react";

export default function AgriAdviceForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch("http://localhost:5000/api/advice", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the advice request.");
      }

      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Your advice request has been submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
          image: null,
        });
      } else {
        throw new Error(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-green-700 to-green-900 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          Do You Need Any Advice ?
        </h1>

        {/* Contact Icons */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 space-x-5">
          <div className="flex items-center space-x-2">
            <img
              src="https://img.icons8.com/material-sharp/24/marker.png"
              alt="Location"
              width="25"
              height="25"
            />
            <span>Location</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://img.icons8.com/material-rounded/25/phone--v1.png"
              alt="Phone"
              width="25"
              height="25"
            />
            <span>Phone No.</span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://img.icons8.com/material-rounded/96/mail.png"
              alt="Email"
              width="25"
              height="25"
            />
            <span>Email </span>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <p className="text-green-600 font-medium text-center mb-4">
            {successMessage}
          </p>
        )}
        {error && (
          <p className="text-red-600 font-medium text-center mb-4">{error}</p>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-medium">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
            <div>
              <label className="text-lg font-medium">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Mention your area of concern"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">Questions / Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              rows="4"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">
              Upload Image (Optional):
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-xl text-white ${
                loading ? "bg-gray-400" : "bg-black hover:bg-white hover:text-black hover:font-bold hover:shadow-xl transition"
              }`}
            >
              {loading ? "Submitting..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}