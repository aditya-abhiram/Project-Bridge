import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentProfile = () => {
  const { userId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    degree: "Single Degree",
    firstDegree: "",
    secondDegree: "",
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
  
    // If the "Degree" field is being changed and the value is changing to "Single Degree",
    // reset the value of the "Second Degree" field to an empty string
    if (name === "degree" && value === "Single Degree") {
      setFormData({
        ...formData,
        [name]: value,
        secondDegree: "" // Reset the value of the "Second Degree" field
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
      <form onSubmit={handleSubmit}>
        <h2>My Profile</h2>
        {editMode ? (
          <>
            <button type="submit">Save</button>

          </>
        ) : (
          <button type="button" onClick={toggleEditMode}>Edit</button>
        )}
        <br/><br/>
        <label htmlFor="name">Name:</label><br/>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={!editMode} /><br/><br/>
        <label htmlFor="idNumber">Id Number:</label><br/>
        <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} disabled={!editMode} /><br/><br/>
        <div>
          <label>Degree:</label><br/>
          <label htmlFor="singleDegree">
            <input
              type="radio"
              id="singleDegree"
              name="degree"
              value="Single Degree"
              checked={formData.degree === "Single Degree"}
              onChange={handleInputChange}
              disabled={!editMode}
            />
            Single Degree
          </label>
          <label htmlFor="dualDegree">
            <input
              type="radio"
              id="dualDegree"
              name="degree"
              value="Dual Degree"
              checked={formData.degree === "Dual Degree"}
              onChange={handleInputChange}
              disabled={!editMode}
            />
            Dual Degree
          </label>
        </div><br/>
        <div>
          <label htmlFor="firstDegree">B.E Degree</label><br/>
          <select
            id="firstDegree"
            name="firstDegree"
            value={formData.firstDegree}
            onChange={handleInputChange}
            disabled={!editMode}
          >
            <option value="">Select B.E Degree</option>
            <option value="CE">Civil Engineering(CE)</option>
            <option value="CHE">Chemical Engineering(CHE)</option>
            <option value="CS">Computer Science Engineering (CSE)</option>
            <option value="ECE">Electronics and Communication Engineering(ECE)</option>
            <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
            <option value="ENI">Electronics and Instrumention Engineering (ENI)</option>
            <option value="ME">Mechanical Engineering (ME)</option>
            <option value="PHA">B.Pharma (PHA)</option>
          </select>
        </div><br/>
        <div>
          <label htmlFor="secondDegree">MSc. Degree</label><br/>
          <select
            id="secondDegree"
            name="secondDegree"
            value={formData.secondDegree}
            onChange={handleInputChange}
            disabled={!editMode || formData.degree !== "Dual Degree"}
          >
            <option value="">Select MSc. Degree</option>
            <option value="BIO">Biology (BIO)</option>
            <option value="CHEM">Chemistry (CHEM)</option>
            <option value="ECON">Economics (ECON)</option>
            <option value="MATH">Mathematics (MATH)</option>
            <option value="PHY">Physics (PHY)</option>
            
          </select>
        </div>

      </form>
    </div>
  );
};

export default StudentProfile;
