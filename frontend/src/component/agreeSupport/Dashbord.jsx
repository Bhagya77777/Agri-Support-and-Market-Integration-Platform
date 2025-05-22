import React from "react";

function Dashbord() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Expert Advisory Services
        </h1>
        <p className="mt-4 text-lg">
          Helping businesses & individuals make smarter decisions.
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-100 transition">
          Get a Consultation
        </button>
      </header>

      {/* Services Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Our Services
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Business Strategy",
              desc: "Guiding businesses towards growth & success.",
            },
            {
              title: "Financial Planning",
              desc: "Helping you make the best financial decisions.",
            },
            {
              title: "Legal Advisory",
              desc: "Ensuring legal compliance & security for your business.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg text-center"
            >
              <h3 className="text-xl font-bold text-blue-600">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          What Our Clients Say
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {[
            {
              name: "Alice Johnson",
              text: "The best advisory service I've ever used!",
            },
            {
              name: "Michael Smith",
              text: "Transformed my business strategy completely.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg max-w-sm"
            >
              <p className="italic text-gray-700">"{testimonial.text}"</p>
              <p className="mt-4 font-bold text-blue-600">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600">Contact Us</h2>
        <form className="mt-6 max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md mb-4"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md mb-4"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-md mb-4"
            rows="4"
          ></textarea>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default Dashbord;
