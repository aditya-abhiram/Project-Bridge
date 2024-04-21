import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CFormInput,
  // CFormTextarea,
  CFormSelect,
  // CInputGroup,
  CButton,
  CContainer,
  CRow,
  CCol,
  CForm,
  // CBadge,
  // CCloseButton,
  // CForm,
} from "@coreui/react";
import Button from '@mui/material/Button';
import './student_profile.css'
const StudentProfile = () => {
  const { userId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    degree: "Single Degree",
    firstDegree: "",
    secondDegree: "",
    cg: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchStudentData(userId);
  }, [userId]);

  const fetchStudentData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/students/getData/${userId}`);
      setStudentData(response.data);
      // Populate form data with fetched student data
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
  e.preventDefault(); // Prevent default form submission behavior
  console.log('Form submitted');
  try {
    await axios.put(`http://localhost:8000/students/updateData/${userId}`, formData);
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
    <CContainer>
      <CRow>
      <CCol>
      <div id="profile_form" style={{width:'100%', left:'0', marginBottom:'0'}}>
      <form onSubmit={handleSubmit}>
        <CRow>
            <CCol>
              <div id='title_profile'>
              <h2 style={{color: "white"}} id='child_title'>My Profile</h2>
              {editMode ? (
                <>
                  <Button variant="contained" color="success" type="submit" id='child_title'>Save</Button>
                </>
              ) : (
                <Button variant="contained" color="secondary" type="button" onClick={toggleEditMode} id='child_title'>Edit</Button>
              )}
              </div>
            </CCol>
        </CRow>
        <hr></hr>
        <br/><br/>
        <CFormInput
        type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={!editMode} 
        id="floatingInput"
        floatingClassName="mb-3"
        floatingLabel="Name"
        placeholder="name@example.com"
        feedbackInvalid="Please enter valid Name"
        required
        />

        <CFormInput type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} disabled={!editMode} 
         id="floatingInput"
         floatingClassName="mb-3"
         floatingLabel="ID Number"
         placeholder="name@example.com"
         feedbackInvalid="Please enter valid ID number"
         required
        />

        <CFormSelect
          id="floatingInput"
          floatingLabel="Degree"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
          disabled={!editMode}
          options={[
            { label: "Single Degree", value: "Single Degree" },
            { label: "Dual Degree", value: "Dual Degree" }
          ]}
        /><br/>

          <CFormSelect
            id="floatingInput"
            floatingLabel="B.E Degree"
            name="firstDegree"
            value={formData.firstDegree}
            onChange={handleInputChange}
            disabled={!editMode}
            options={[
              "Select",
              { label: "Civil Engineering(CE)", value: "CE" },
              { label: "Computer Science Engineering (CSE)", value: "CSE" },
              { label: "Electronics and Communication Engineering(ECE)", value: "ECE" },
              { label: "Electrical and Electronics Engineering (EEE)", value: "EEE" },
              { label: "Electronics and Instrumention Engineering (ENI)", value: "ENI" },
              { label: "Mechanical Engineering (ME)", value: "ME" },
              { label: "B.Pharma (PHA)", value: "PHA" },
            ]}
          />
          <br></br>
          <CFormSelect
            id="floatingInput"
            floatingLabel="MSc. Degree"
            name="secondDegree"
            value={formData.secondDegree}
            onChange={handleInputChange}
            disabled={!editMode || formData.degree !== "Dual Degree"}
            options={[
              "Select",
              { label: "Biology (BIO)", value: "BIO" },
              { label: "Chemistry (CHEM)", value: "CHEM" },
              { label: "Economics (ECON)", value: "ECON" },
              { label: "Mathematics (MATH)", value: "MATH" },
              { label: "Physics (PHY)", value: "PHY" },
            ]}
          />
          <br></br>
          <CFormInput type="number" 
          id="floatingInput"
          floatingLabel="CGPA"
          name="cg" min="0" step="0.01" max="10" value={formData.cg} onChange={handleInputChange} disabled={!editMode} />
          <br/><br/>

          <CRow>
                <CCol>
                <CFormInput type="file" id="formFile" accept="application/pdf" label="Resume (pdf)" disabled={!editMode}/>
                </CCol>
                <CCol>
                <CButton color="danger" disabled={!editMode}>Delete Resume</CButton>
                </CCol>
            </CRow>
                  <br></br>
            <CRow>
              <CCol>
              <CFormInput type="file" id="formFile" label="Performance Sheet (pdf)" disabled={!editMode}/>
              </CCol>
              <CCol>
              <CButton color="danger" disabled={!editMode}>Delete Performance Sheet</CButton>
              </CCol>
            </CRow>
      </form>
    </div>
      </CCol>
      {/* <CCol>
        <CForm id='files_form'>
            <div id="files" style={{width:'80%', position:'relative', left:'10%', top:'20%'}}>
                  <div id='title_profile'>
                  <h2 style={{color: "white"}} id='child_title'>Upload files</h2>
                      <Button variant="contained" color="success" type="submit" id='child_title'>Save Files</Button>
                  </div>              
            <hr></hr>
            <CRow>
              <CFormInput type="file" id="formFile" accept="application/pdf" label="Resume (pdf)" />
              <CButton color="danger">Delete Resume</CButton>
            </CRow>
                  <br></br>
            <CRow>
              <CFormInput type="file" id="formFile" label="Performance Sheet (pdf)"/>
              <CButton color="danger">Delete Performance Sheet</CButton>
            </CRow>
            </div>
        </CForm>
      </CCol>  */}
      </CRow>
    </CContainer>
       
  );
};

export default StudentProfile;
