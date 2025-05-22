import React, { useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import RegistrationForm from './RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationFormHome.css';

import NavBar from "../../../src/component/Buyer/BuyerHeader";
import Footer from "../../../src/component/Buyer/BuyerFooter";

const GlassCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    <div className="glass-card h-100 p-4">
      <div className="icon-wrapper mb-3">
        <i className={`fas fa-${icon} text-white`}></i>
      </div>
      <h3 className="text-white fw-bold mb-3">{title}</h3>
      <p className="text-white-80">{description}</p>
    </div>
  </motion.div>
);

const RegistrationFormHome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('transport'); // 'transport' or 'shipper'

  const supplyChainImages = [
    '/images/agriculture/agriculture-1.jpg',
    '/images/agriculture/agriculture-2.jpg',
    '/images/agriculture/agriculture-4.jpg',
    '/images/agriculture/agriculture-5.jpg',
  ];

  const features = [
    {
      icon: 'truck-fast',
      title: 'Real-time Tracking',
      description: 'Monitor shipments with live GPS updates and predictive analytics.'
    },
    {
      icon: 'temperature-low',
      title: 'Climate Control',
      description: 'Smart warehousing with automated temperature regulation.'
    },
    {
      icon: 'robot',
      title: 'AI Optimization',
      description: 'Machine learning for route and inventory optimization.'
    }
  ];

  const stats = [
    { value: '95%', label: 'On-time Deliveries' },
    { value: '24/7', label: 'Support Available' },
    { value: '1000+', label: 'Verified Partners' },
    { value: '50+', label: 'Cities Covered' }
  ];

  return (
    <div className="modern-app">
      {/* Blurred Background Layer */}
      <div className="background-layer">
        <div className="blur-overlay"></div>
        <div className="gradient-overlay"></div>
      </div>
      <NavBar />
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
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
                  <span className="text-gradient">Registration </span>  Managements
                </h1>
                <p className="lead text-white-80 mb-4">
                  Revolutionizing agricultural supply chains with transparent, efficient logistics solutions.
                </p>
                <div className="d-flex gap-3 mt-5">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="px-4 py-3 rounded-pill fw-bold"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="px-4 py-3 rounded-pill fw-bold"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-image-container"
              >
                <div className="hero-image-glass">
                  <Image 
                    src="/deparment.jpg" 
                    fluid 
                    className="rounded-4"
                  />
                  <div className=""></div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 position-relative">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="stat-card text-center p-4 rounded-4"
                >
                  <h2 className="text-gradient fw-bold mb-2">{stat.value}</h2>
                  <p className="text-white-80 mb-0">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="mb-6">
            <Col className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="display-4 fw-bold text-white mb-3">
                  Our <span className="text-gradient">Solutions</span>
                </h2>
                <p className="text-white-60 lead mb-0">
                  Designed to streamline your agricultural logistics
                </p>
              </motion.div>
            </Col>
          </Row>
          
          <Row className="g-5">
            {features.map((feature, index) => (
              <Col lg={4} key={index}>
                <GlassCard 
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="mb-6">
            <Col className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="display-4 fw-bold text-white mb-3">
                  Our <span className="text-gradient">Network</span>
                </h2>
                <p className="text-white-60 lead">
                  Connecting farms to markets with seamless efficiency
                </p>
              </motion.div>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <div className="gallery-grid">
                {supplyChainImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="gallery-item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  >
                    <div className="gallery-item-inner">
                      <Image src={image} fluid className="gallery-image" />
                      <div className="gallery-overlay glass-overlay">
                        <h5 className="text-white fw-bold">Facility #{index + 1}</h5>
                        <Button variant="glass-sm" className="mt-2">
                          View Details <i className="fas fa-arrow-right ms-2"></i>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Registration Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xl={8} lg={10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-container p-4 p-md-5 rounded-4"
              >
                <div className="text-center mb-5">
                  <h2 className="display-5 fw-bold text-white mb-3">
                    Join Our <span className="text-gradient">Network</span>
                  </h2>
                  <p className="text-white-60">
                    Register to access our platform's full capabilities
                  </p>
                </div>
                
                {/* Registration Type Toggle */}
                
                
                <RegistrationForm userType={activeTab} />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default RegistrationFormHome;