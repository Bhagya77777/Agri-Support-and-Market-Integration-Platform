import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get userId from the URL
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const UserProfile = () => {
  const { userId } = useParams(); // Extract userId from the URL
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) {
          alert('User ID is missing in the URL.');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/get-user-profile/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Handle non-200 status codes
          let errorMessage;
          try {
            errorMessage = await response.json(); // Try to parse the error message as JSON
          } catch (err) {
            errorMessage = await response.text(); // Fallback to plain text if JSON parsing fails
          }
          console.error('Error fetching profile:', errorMessage);
          alert(`Failed to fetch profile. Server responded with: ${errorMessage.message || errorMessage}`);
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
        alert('An error occurred while fetching your profile.');
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/update-user-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          ...profileData,
        }),
      });

      if (!response.ok) {
        // Handle non-200 status codes
        let errorMessage;
        try {
          errorMessage = await response.json(); // Try to parse the error message as JSON
        } catch (err) {
          errorMessage = await response.text(); // Fallback to plain text if JSON parsing fails
        }
        console.error('Error updating profile:', errorMessage);
        alert(`Failed to update profile. Server responded with: ${errorMessage.message || errorMessage}`);
        return;
      }

      const data = await response.json();
      alert('Profile updated successfully!');
      console.log('Profile Update Response:', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('An error occurred while updating your profile.');
    }
  };

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <Card className="p-4 shadow">
            <h2 className="text-center text-success mb-4">User Profile</h2>
            <Form onSubmit={handleSave}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prevData) => ({ ...prevData, name: e.target.value }))
                  }
                  readOnly={!isEditing}
                  required
                />
              </Form.Group>

              {/* Address */}
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData((prevData) => ({ ...prevData, address: e.target.value }))
                  }
                  readOnly={!isEditing}
                  required
                />
              </Form.Group>

              {/* Phone Number */}
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData((prevData) => ({ ...prevData, phone: e.target.value }))
                  }
                  readOnly={!isEditing}
                  required
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData((prevData) => ({ ...prevData, email: e.target.value }))
                  }
                  readOnly={!isEditing}
                  required
                />
              </Form.Group>

              {/* Role */}
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={profileData.role}
                  onChange={(e) =>
                    setProfileData((prevData) => ({ ...prevData, role: e.target.value }))
                  }
                  readOnly={!isEditing}
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="transporter">Transporter</option>
                  <option value="logisticsProvider">Logistics Provider</option>
                </Form.Control>
              </Form.Group>

              {/* Actions */}
              {!isEditing ? (
                <Button variant="primary" onClick={handleEdit} className="rounded-pill">
                  Edit Profile
                </Button>
              ) : (
                <div className="d-grid gap-2">
                  <Button variant="success" type="submit" className="rounded-pill">
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)} className="rounded-pill">
                    Cancel
                  </Button>
                </div>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;