import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import WarehouseReq from './WarehouseReq';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WarehouseReqHome.css';

const WarehouseReqHome = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('storage');

  const supplyChainImages = [
    '/images/agriculture/agriculture-1.jpg',
    '/images/agriculture/agriculture-2.jpg',
    '/images/agriculture/agriculture-4.jpg',
    '/images/agriculture/agriculture-5.jpg',
  ];

  const stats = [
    { icon: 'truck', title: 'Active Shipments', value: '72', text: 'Real-time tracking available' },
    { icon: 'warehouse', title: 'Distribution Centers', value: '15', text: 'Climate-controlled facilities' },
    { icon: 'clock', title: 'Avg. Processing Time', value: '2h', text: 'Fast turnaround' },
  ];

  const storageTypes = [
    { name: 'Cold Storage', capacity: '5000 sqft', available: true },
    { name: 'Dry Storage', capacity: '8000 sqft', available: true },
    { name: 'Bulk Storage', capacity: '10000 sqft', available: false }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="modern-warehouse-app">
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

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-80 py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="hero-content">
                <h1 className="display-3 fw-bold text-white mb-4">
                  <span className="text-gradient">Warehouse</span> Request
                </h1>
                <p className="lead text-white-80 mb-4">
                  Secure storage solutions for your agricultural products with our climate-controlled facilities
                </p>
                <div className="d-flex gap-3 mt-5">
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="px-4 py-3 rounded-pill fw-bold"
                  >
                    Check Availability
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    className="px-4 py-3 rounded-pill fw-bold"
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container glass-morphism">
                <Image 
                  src="/warehouse.jpg" 
                  fluid 
                  className="rounded-4"
                  alt="Modern warehouse facility"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Storage Types Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="display-5 fw-bold text-white mb-3">
                Our <span className="text-gradient">Storage</span> Options
              </h2>
              <p className="text-white-60 lead">
                Tailored solutions for different agricultural products
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {storageTypes.map((type, index) => (
              <Col md={4} key={index}>
                <div className={`storage-card glass-morphism ${type.available ? 'available' : 'unavailable'}`}>
                  <h3>{type.name}</h3>
                  <div className="capacity-badge">
                    <span>{type.capacity}</span>
                  </div>
                  <div className="availability">
                    {type.available ? (
                      <>
                        <span className="available-dot"></span>
                        <span>Available</span>
                      </>
                    ) : (
                      <>
                        <span className="unavailable-dot"></span>
                        <span>Fully Booked</span>
                      </>
                    )}
                  </div>
                  <Button 
                    variant={type.available ? "glass" : "outline-secondary"} 
                    className="mt-3"
                    disabled={!type.available}
                  >
                    {type.available ? 'Request Now' : 'Join Waitlist'}
                  </Button>
                </div>
              </Col>
            ))}
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
                State-of-the-art warehouses for optimal product preservation
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <div className="gallery-grid">
                {supplyChainImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <div className="gallery-item-inner glass-morphism">
                      <img src={image} alt={`Warehouse Facility ${index + 1}`} />
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

      {/* Warehouse Request Form Section */}
      <section className="py-6 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xl={8} lg={10}>
              <div className="glass-container p-4 p-md-5 rounded-4">
                <div className="text-center mb-5">
                  <h2 className="display-5 fw-bold text-white mb-3">
                    Request <span className="text-gradient">Warehouse</span> Space
                  </h2>
                  <p className="text-white-60">
                    Fill out the form to reserve storage for your agricultural products
                  </p>
                </div>
                
                <WarehouseReq />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default WarehouseReqHome;