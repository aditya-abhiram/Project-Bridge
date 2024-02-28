import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Headers = () => {
  const [userdata, setUserdata] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const { userId } = useParams(); // Get userId from URL

  useEffect(() => {
    console.log("userId test1:", userId); // Check if userId is correctly retrieved
    getUser();
  }, [userId]); // Trigger useEffect when userId changes

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${userId}`); // Fetch user data using userId
      setUserdata(response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self");
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <>
      <Navbar className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Hello {userdata?.displayName} ! </Navbar.Brand>
          <Dropdown show={showDropdown} onToggle={toggleDropdown}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <img src={userdata?.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userdata?.user_type === 'student' && (
                <Nav.Link href={`/StudentProfile/${userId}`}>My Profile</Nav.Link>
              )}
              {userdata?.user_type === 'teacher' && (
                <Nav.Link href={`/TeacherProfile/${userId}`}>My Profile</Nav.Link>
              )}
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  );
}

export default Headers;
