<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherProfile = () => {
  const { userId } = useParams();
  const [teacherData, setTeacherData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    department: ""
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchTeacherData(userId);
  }, [userId]);

  const fetchTeacherData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/teachers/${userId}`);
      setTeacherData(response.data);
      // Populate form data with fetched teacher data
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/teachers/${userId}`, formData);
      // After successful submission, fetch updated data again
      fetchTeacherData(userId);
      // Disable edit mode after saving
      setEditMode(false);
    } catch (error) {
      console.error("Error saving teacher data:", error);
    }
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!teacherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>My Profile</h2>
        {editMode ? (
          <>
            <button type="submit">Save</button>
            <button type="button" onClick={toggleEditMode}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={toggleEditMode}>Edit</button>
        )}
        <br/><br/>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={!editMode} /><br/><br/>
        <label htmlFor="roomNumber">Room Number:</label>
        <input type="text" id="roomNumber" name="roomNumber" value={formData.roomNumber} onChange={handleInputChange} disabled={!editMode} /> <br/><br/>
        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} disabled={!editMode} /> <br/><br/>
      </form>
=======
import React from 'react';
import { useParams } from 'react-router-dom';

const TeacherProfile = () => {
  const { userId } = useParams();

  // Fetch teacher data based on userId
  // ...

  return (
    <div>
      <h1>Teacher Profile</h1>
      {/* Display teacher profile information */}
      {/* ... */}
      <p>User ID: {userId}</p>
>>>>>>> dab79fce21e4c2077b740e54a70ae5c26e5b2fc9
    </div>
  );
};

export default TeacherProfile;
