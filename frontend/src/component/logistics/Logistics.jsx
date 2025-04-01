import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Logistics.css';

import NavBar from "../../../src/component/Buyer/BuyerHeader";
import Footer from "../../../src/component/Buyer/BuyerFooter";

const Logistics = () => {
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Agriculture images array
  const agricultureImages = [
    '/images/agriculture/agriculture-1.jpg',
    '/images/agriculture/agriculture-2.jpg',
    '/images/agriculture/agriculture-4.jpg',
    '/images/agriculture/agriculture-5.jpg',
  ];

  const services = [
    {
      icon: 'truck',
      title: 'Delivery Orders Track ',
      link: '/devlier-order',
      description: 'Efficient less-than-truckload services with climate control options'
    },
    {
      icon: 'clock',
      title: 'Warehouse Request  ',
      link: '/werehouse-reg',
      description: 'Priority shipping for time-sensitive agricultural products'
    }
  ];

  const stats = [
    { icon: 'truck', title: 'Active Transports', value: '48', text: 'Real-time tracking available' },
    { icon: 'building', title: 'Storage Facilities', value: '12', text: 'Climate-controlled units' },
    { icon: 'speedometer', title: 'Avg. Delivery Time', value: '18h', text: '24/7 operations' },
  ];

  const storageData = [
    { label: 'Grains', value: 75, color: 'var(--primary)' },
    { label: 'Perishables', value: 60, color: 'var(--secondary)' },
    { label: 'Equipment', value: 45, color: 'var(--accent)' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="modern-logistics">
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
      </div>
 
      {/* Hero Section */}
      <NavBar />
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-80 py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="hero-content">
                <h1 className="display-3 fw-bold text-white mb-4">
                  <span className="text-gradient">Agri</span> Logistics
                </h1>
                <p className="lead text-white-80 mb-4">
                  Optimizing Farm-to-Market Supply Chains with Smart Storage Solutions
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
                    Storage Status
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container glass-morphism">
                <Image 
                  src="/logistic.jpg" 
                  fluid 
                  className="rounded-4"
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
                Our <span className="text-gradient">Facilities</span>
              </h2>
              <p className="text-white-60 lead">
                Modern agriculture storage and transportation solutions
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <div className="gallery-grid">
                {agricultureImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <div className="gallery-item-inner glass-morphism">
                      <img src={image} alt={`Agriculture Facility ${index + 1}`} />
                      <div className="gallery-overlay">
                        <h5>Facility #{index + 1}</h5>
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

      {/* Services Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold text-white mb-3">
                Our <span className="text-gradient">Services</span>
              </h2>
              <p className="text-white-60 lead">
                Comprehensive logistics solutions for agriculture
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {services.map((service, index) => (
              <Col md={6} lg={3} key={index}>
                <div 
                  className={`service-card glass-morphism ${activeService === index ? 'active' : ''}`}
                  onClick={() => setActiveService(index)}
                >
                  <div className="service-icon">
                    <i className={`fas fa-${service.icon}`}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to={service.link} className="service-link">
                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </Col>
            ))}
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

      {/* Storage Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="storage-card glass-morphism p-4 p-lg-5">
                <h2 className="text-white mb-4">Storage <span className="text-gradient">Utilization</span></h2>
                {storageData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-white">{item.label}</span>
                      <span className="text-white">{item.value}%</span>
                    </div>
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default Logistics;