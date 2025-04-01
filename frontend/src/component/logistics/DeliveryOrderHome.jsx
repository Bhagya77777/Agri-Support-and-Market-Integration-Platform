import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { motion } from 'framer-motion'
import DeliveryOrder from './DeliveryOrder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DeliveryOrderHome.css';
import NavBar from "../../../src/component/Buyer/BuyerHeader";
import Footer from "../../../src/component/Buyer/BuyerFooter";


const DeliveryOrderHome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('transport'); // For future tab functionality

  // Supply Chain images array
  const supplyChainImages = [
    '/images/agriculture/agriculture-1.jpg',
    '/images/agriculture/agriculture-2.jpg',
    '/images/agriculture/agriculture-4.jpg',
    '/images/agriculture/agriculture-5.jpg',
  ];

  const stats = [
    { icon: 'truck', title: 'Active Shipments', value: '72', text: 'Real-time tracking available' },
    { icon: 'warehouse', title: 'Distribution Centers', value: '15', text: 'Strategically located hubs' },
    { icon: 'clock', title: 'Avg. Delivery Time', value: '24h', text: '24/7 operations' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="modern-delivery-app">
      {/* Background Elements */}
      <div className="bg-elements">
    
        <div 
          className="bg-circle-1" 
          style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)` }}
        ></div>
        <div 
          className="bg-circle-2" 
          style={{ transform: `translate(-${scrollY * 0.03}px, ${scrollY * 0.04}px)` }}
        ></div>
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      <NavBar />
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-80 py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-3 fw-bold text-white mb-4">
                  <span className="text-gradient">Delivery</span> Order System
                </h1>
                <p className="lead text-white-80 mb-4">
                  Streamlining End-to-End Supply Chain Solutions for Agri-Businesses with transparent logistics
                </p>
                <div className="d-flex gap-3 mt-5">
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="px-4 py-3 rounded-pill fw-bold"
                  >
                    Track Shipment
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    className="px-4 py-3 rounded-pill fw-bold"
                  >
                    Inventory Status
                  </Button>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container glass-morphism">
                <Image 
                  src="delivery.jpg" 
                  fluid 
                  className="rounded-4"
                  alt="Modern delivery system"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold text-white mb-3">
                Our <span className="text-gradient">Network</span>
              </h2>
              <p className="text-white-60 lead">
                Strategically located hubs for efficient distribution
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <div className="gallery-grid">
                {supplyChainImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <div className="gallery-item-inner glass-morphism">
                      <img src={image} alt={`Supply Chain Hub ${index + 1}`} />
                      <div className="gallery-overlay">
                        <h5>Hub #{index + 1}</h5>
                        <Button variant="glass-sm">
                          View Details <i className="fas fa-arrow-right ms-2"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={4} key={index}>
                <div className="stat-card glass-morphism">
                  <div className="stat-icon">
                    <i className={`fas fa-${stat.icon}`}></i>
                  </div>
                  <h2>{stat.value}</h2>
                  <h5>{stat.title}</h5>
                  <p>{stat.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Delivery Order Form Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xl={8} lg={10}>
              <div className="glass-container p-4 p-md-5 rounded-4">
                <div className="text-center mb-5">
                  <h2 className="display-5 fw-bold text-white mb-3">
                    Create <span className="text-gradient">Delivery Order</span>
                  </h2>
                  <p className="text-white-60">
                    Fill out the form to schedule your agricultural shipment
                  </p>
                </div>
                
                <DeliveryOrder />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default DeliveryOrderHome;