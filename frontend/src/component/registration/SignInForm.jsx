import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Sign-in failed:', errorMessage);
        alert(`Sign-in failed. Server responded with: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      alert('Sign-in successful!');
      console.log('Sign-in Response:', data);

      // Redirect to the user's profile page after successful sign-in
      navigate(`/profile/${data._id}`); // Pass the user's _id as the userId parameter
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-4 shadow">
            <h2 className="text-center text-success mb-4">Sign In</h2>
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid">
                <Button variant="success" type="submit" className="rounded-pill">
                  Sign In
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;