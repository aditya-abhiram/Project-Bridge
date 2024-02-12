import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Header.css"
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Headers = () => {
  const [userdata, setUserdata] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/login/success", { withCredentials: true });
      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  }

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self");
  }

  useEffect(() => {
    getUser();
  }, []);

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
              <Dropdown.Item onClick={() => console.log('Edit profile')}>Edit profile</Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  );
}

export default Headers;
