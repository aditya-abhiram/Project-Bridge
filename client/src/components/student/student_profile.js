import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentProfile = () => {
  const { userId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    branch: ""
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchStudentData(userId);
  }, [userId]);

  const fetchStudentData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/students/${userId}`);
      setStudentData(response.data);
      // Populate form data with fetched student data
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
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
      await axios.put(`http://localhost:8000/students/${userId}`, formData);
      // After successful submission, fetch updated data again
      fetchStudentData(userId);
      // Disable edit mode after saving
      setEditMode(false);
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Profile</h1>
      <form onSubmit={handleSubmit}>
        <h2>My Profile</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={!editMode} />
        <label htmlFor="idNumber">Id Number:</label>
        <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} disabled={!editMode} />
        <label htmlFor="branch">Branch:</label>
        <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleInputChange} disabled={!editMode} />
        {editMode ? (
          <>
            <button type="submit">Save</button>
            <button type="button" onClick={toggleEditMode}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={toggleEditMode}>Edit</button>
        )}
      </form>
    </div>
  );
};

export default StudentProfile;