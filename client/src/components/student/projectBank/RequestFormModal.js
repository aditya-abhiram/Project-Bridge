import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
} from '@coreui/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
const RequestFormModal = ({ visible, onClose, project }) => {
  const [formData, setFormData] = useState({
    projectName: project.project_name || '',
    projectDescription: project.project_description || '',
    whyWantToDoProject: '',
    currentCGPA: '',
    selectedPrerequisites: [], // State to store selected prerequisites
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePrerequisitesChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      selectedPrerequisites: value,
    });
  };

  const handleSubmit = () => {
    // Show confirmation message
    setShowConfirmation(true);
  };

  const handleConfirmSendRequest = () => {
    // Handle sending request here
    // Once request is sent, close the modal
    setShowConfirmation(false);
    onClose();
  };

  const handleBack = () => {
    // Hide confirmation message
    setShowConfirmation(false);
  };

  const handleSaveDraft = () => {
    console.log('Save Draft');
  };

  
  return (
    <CModal
      backdrop="static"
      visible={visible}
      onClose={onClose}
      aria-labelledby="RequestFormModalTitle"
    >
      <CModalHeader closeButton>
        <CModalTitle id="RequestFormModalTitle">Request Form</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Form fields */}
        <CFormInput
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleInputChange}
          placeholder="Project Name"
          disabled
        />
        <CFormTextarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleInputChange}
          placeholder="Project Description"
          disabled
        />
        <CFormTextarea
          name="whyWantToDoProject"
          value={formData.whyWantToDoProject}
          onChange={handleInputChange}
          placeholder="Why do you want to do this project?"
          id="floatingInput" floatingClassName="mb-3" floatingLabel="Why do you want to do this project?"
        />
        <CFormInput
          type="number"
          name="currentCGPA"
          value={formData.currentCGPA}
          onChange={handleInputChange}
          placeholder="Current CGPA"
          step="0.01"
          min="0"
          max="10"
        />
        {/* Multi-select input for prerequisites */}
        <FormControl style={{ m: 1, width: '100%', marginTop: '2rem' }}>
          <InputLabel id="prerequisites-label">Prerequisites</InputLabel>
          <Select
            labelId="prerequisites-label"
            id="prerequisites-select"
            multiple
            value={formData.selectedPrerequisites}
            onChange={handlePrerequisitesChange}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ margin: '2px' }} />
                ))}
              </div>
            )}
          >
            {project.pre_requisites.map((prerequisite) => (
              <MenuItem key={prerequisite} value={prerequisite}>
                {prerequisite}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CModalBody>
      <CModalFooter>
        {!showConfirmation ? (
          <React.Fragment>
            <CButton color="secondary" onClick={onClose}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleSaveDraft}>
              Save Draft
            </CButton>
            <CButton color="warning" onClick={handleSubmit}>
              Send Request
            </CButton>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CButton color="secondary" onClick={handleBack}>
              Back
            </CButton>
            <CButton color="success" onClick={handleConfirmSendRequest}>
              Confirm Send Request
            </CButton>
          </React.Fragment>
        )}
      </CModalFooter>
    </CModal>
  );
};

export default RequestFormModal;
