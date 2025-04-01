import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { Container, Row, Col, Card, ProgressBar, Button, Image } from 'react-bootstrap';
import UserProfile from './UserProfile'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const TruckModel = () => {
  return (
    <group>
      <Box args={[2, 1, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#4CAF50" />
      </Box>
      <Box args={[0.5, 0.5, 0.5]} position={[-0.6, 0.25, 0]}>
        <meshStandardMaterial color="#333" />
      </Box>
    </group>
  );
};

// Main LogisticRegHome Component
const UserProfileHome = () => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      if (canvasRef.current) {
        const aspect = window.innerWidth > 768 ? 4 : 2;
        canvasRef.current.style.height = `${canvasRef.current.offsetWidth / aspect}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const supplyChainImages = [
    '/images/agriculture/agriculture-1.jpg',
    '/images/agriculture/agriculture-2.jpg',
    '/images/agriculture/agriculture-4.jpg',
    '/images/agriculture/agriculture-5.jpg',
  ];

  return (
    <Container fluid className="supply-chain-container">
      {/* Header Section */}
      <Row className="mb-5 align-items-center">
        <Col md={6} className="mb-4 mb-md-0">
          <div className={`content-entrance ${mounted ? 'visible' : ''}`}>
            <h1 className="display-4 fw-bold text-success mb-4">UserProfile Home</h1>
            <p className="lead text-dark mb-4 animate-text">
              Streamlining End-to-End Supply Chain Solutions for Agri-Businesses
            </p>
            <div className="d-grid gap-3 d-md-flex">
              <Button variant="success" size="lg" className="rounded-pill px-4 shadow-hover">
                Track Shipment
              </Button>
              <Button variant="outline-success" size="lg" className="rounded-pill px-4 shadow-hover">
                Inventory Status
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Carousel Section */}
      <Row className="mb-5">
        <Col>
          <div className="carousel-container">
            <div className="carousel-track">
              {supplyChainImages.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img
                    src={image}
                    alt={`Supply Chain Hub ${index + 1}`}
                    className="img-fluid"
                  />
                  <div className="carousel-caption">
                    <h5>Supply Chain Hub #{index + 1}</h5>
                    <p>Integrated logistics center</p>
                  </div>
                </div>
              ))}
              {/* Duplicate slides for seamless loop */}
              {supplyChainImages.map((image, index) => (
                <div key={index + supplyChainImages.length} className="carousel-slide">
                  <img
                    src={image}
                    alt={`Supply Chain Hub ${index + 1}`}
                    className="img-fluid"
                  />
                  <div className="carousel-caption">
                    <h5>Supply Chain Hub #{index + 1}</h5>
                    <p>Integrated logistics center</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>


      <Row className="mb-5">
        <Col>
          <UserProfile />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileHome;