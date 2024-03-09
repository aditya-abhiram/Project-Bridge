import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherProfile = () => {
  const { userId } = useParams();
  const [teacherData, setTeacherData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    block: "",
    roomNumber: "",
    department: "",
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
          </>
        ) : (
          <button type="button" onClick={toggleEditMode}>Edit</button>
        )}
        <br/><br/>
        <label htmlFor="name">Name</label><br/>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} disabled={!editMode} /><br/><br/>
        <label htmlFor="block">Block</label><br/>
        <select id="block" name="block" value={formData.block} onChange={handleInputChange} disabled={!editMode}> 
          <option value="">Select Block</option>
          <option value="A">A - Block</option>
          <option value="B">B - Block</option>
          <option value="C">C - Block</option>
          <option value="D">D - Block</option>
          <option value="E">E - Block</option>
          <option value="H">H - Block</option>
          <option value="I">I - Block</option>
          <option value="J">J - Block</option>
          <option value="K">K - Block</option>
        </select><br/><br/>
        <label htmlFor="roomNumber">Room Number</label><br/>
        <input type="text" pattern="\d*" maxlength="3" id="roomNumber" name="roomNumber"value={formData.roomNumber} onChange={handleInputChange} disabled={!editMode} /> <br/><br/>
        <label htmlFor="department">Department</label><br/>
        <select id="department" name="department" value={formData.department} onChange={handleInputChange} disabled={!editMode}> 
          <option value="">Select Department</option>
          <option value="BIO">Biological Sciences (BIO)</option>
          <option value="CHE">Chemical Engineering (CHE)</option>
          <option value="CHEM">Chemistry (CHEM)</option>
          <option value="CE">Civil Engineering (CE)</option>
          <option value="CS">Computer Science (CS)</option>
          <option value="ECON">Economics and Finance (ECON)</option>
          <option value="EEE">Electrical & Electronics Engineering (EEE)</option>
          <option value="HSS">Humanities and Social Sciences (HSS)</option>
          <option value="MATH">Mathematics (MATH)</option>
          <option value="ME">Mechanical Engineering (ME)</option>
          <option value="PHA">Pharmacy (PHA)</option>
          <option value="PHY">Physics(PHY)</option>
        </select><br/><br/>
        
      </form>
    </div>
  );
};

export default TeacherProfile;
