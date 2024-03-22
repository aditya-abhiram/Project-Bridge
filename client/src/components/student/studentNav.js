import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './studentNav.css';

const StudentNav = ({ userId }) => {
  const [userdata, setUserdata] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/getUserData/${userId}`); // Fetch user data using userId
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
        <Container fluid id="main">
          <Navbar.Brand href="#">Hello {userdata?.displayName} ! </Navbar.Brand>
          <Dropdown show={showDropdown} onToggle={toggleDropdown}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <img src={userdata?.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Nav.Link href={`/students/StudentProfile/${userId}`}>My Profile</Nav.Link>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  );
}

export default StudentNav;
