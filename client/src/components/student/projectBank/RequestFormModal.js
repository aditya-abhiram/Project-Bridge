import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormTextarea,
} from "@coreui/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "./Alert";
import "./RequestFormModal.css";

const RequestFormModal = ({
  visible,
  onClose,
  project,
  userId,
  selectedProject,
}) => {
  // console.log("ProjectData:", selectedProject);
  const [formData, setFormData] = useState({
    projectName: project.project_name || "",
    projectDescription: project.project_description || "",
    whyWantToDoProject: "",
    currentCGPA: "",
    selectedPrerequisites: [], // State to store selected prerequisites
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [draftDetails, setDraftDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarTitle, setSnackbarTitle] = useState("");
  const [alertStyle, setAlertStyle] = useState("");
  const [validated, setValidated] = useState(false);
  
  useEffect(() => {
    // Fetch draft details when component mounts
    fetchDraftDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const fetchDraftDetails = async () => {
    try {
      // Fetch draft details from the backend
      const response = await axios.get(
        `http://localhost:8000/students/getDraft/${userId}/${project.projectId}`
      );
      const draft = response.data;
      // Update form data with draft details if draft exists
      if (draft) {
        setFormData({
          projectName: draft.projectName || "",
          projectDescription: draft.projectDescription || "",
          whyWantToDoProject: draft.reason_to_do_project || "",
          currentCGPA: draft.current_cgpa || "",
          selectedPrerequisites: draft.pre_requisites_fulfilled || [],
        });
        setDraftDetails(draft); // Store draft details in state
      }
    } catch (error) {
      console.error("Error fetching draft details:", error);
    }
  };

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

  const handleSubmit = (event) => {
    // Show confirmation message if the form is validated
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // If the form is not valid, prevent the default form submission behavior
      event.preventDefault();
      event.stopPropagation();
      console.log("Invalid Form");
    }
    // Always set validated to true to display any validation feedback
    setValidated(true);
    setShowConfirmation(true);
  };
  
  const handleConfirmSendRequest = async () => {
    try {
      const requestData = {
        studentId: userId,
        reason_to_do_project: formData.whyWantToDoProject,
        pre_requisites_fullfilled: formData.selectedPrerequisites,
      };
  
      await axios.post(
        `http://localhost:8000/requests/storeRequest/${selectedProject.projectId}/${userId}`,
        requestData
      );
  
      setShowConfirmation(false);
  
      setSnackbarSeverity("success");
      setSnackbarTitle("Success");
      setSnackbarMessage("Request sent successfully");
      setAlertStyle({
        backgroundColor: "#ddffdd",
        color: "green",
      });
      setSnackbarOpen(true);
      setTimeout(() => {
        onClose(); // Close modal after 5 seconds
      }, 3000);
      
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarTitle("Failure");
      setSnackbarMessage("Error sending request");
      console.error("Error sending request:", error);
      setAlertStyle({
        backgroundColor: "#ffdddd",
        color: "red",
      });
      setSnackbarOpen(true); // Open Snackbar for error case

    }
  };
  
  
  

  const handleBack = () => {
    // Hide confirmation message
    setShowConfirmation(false);
  };

  const handleSaveDraft = async () => {
    try {
      await axios.post(`http://localhost:8000/students/saveDraft`, {
        studentId: userId,
        projectId: selectedProject.projectId,
        projectName: selectedProject.project_name,
        projectDescription: selectedProject.project_description,
        whyWantToDoProject: formData.whyWantToDoProject,
        currentCGPA: formData.currentCGPA,
        selectedPrerequisites: formData.selectedPrerequisites,
      });
      setSnackbarSeverity("success");
      setSnackbarTitle("Success");
      setSnackbarMessage("Draft saved successfully");
      setAlertStyle({
        backgroundColor: "#ddffdd",
        color: "green",
      });
      console.log("success log");
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarTitle("Failure");
      setSnackbarMessage("Error saving draft");
      setAlertStyle({
        backgroundColor: "#ffdddd",
        color: "red",
      });
      console.error("Error saving draft:", error);
      console.log("failure log");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={onClose}
        aria-labelledby="RequestFormModalTitle"
      >
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
        >
          <CModalHeader closeButton>
            <CModalTitle id="RequestFormModalTitle">Request Form</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {/* Form fields */}
            <TextField
              // labelId="name-label"
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Project Name"
              id="outlined-disabled"
              label="Project Name"
              defaultValue="Hello World"
              style={{ marginTop: "25px", width: '100%' }}
              disabled
            />
            <TextField
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleInputChange}
              placeholder="Project Description"
              id="outlined-disabled"
              label="Project Description"
              defaultValue="Hello World"
              style={{ marginTop: "25px" , width: '100%'}}
              multiline
              maxRows={4}
              disabled
            />
            <CFormTextarea
              name="whyWantToDoProject"
              value={formData.whyWantToDoProject}
              onChange={handleInputChange}
              placeholder="Why do you want to do this project?"
              id="outlined"
              floatingLabel="Why do you want to do this project?"
              style={{ height: "100px", marginTop: "25px" , width: '100%'}}
              feedbackvalid="Looks good!"
              feedbackinvalid="Please fill the reason."
              required
              // defaultValue="Hello World"
            />
            {/* Multi-select input for prerequisites */}
            <FormControl style={{ m: 1, width: "100%", marginTop: "2rem" }}>
              <InputLabel id="prerequisites-label">Prerequisites</InputLabel>
              <Select
                labelId="prerequisites-label"
                id="prerequisites-select"
                multiple
                value={formData.selectedPrerequisites}
                onChange={handlePrerequisitesChange}
                renderValue={(selected) => (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        style={{ margin: "2px" }}
                      />
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
        </CForm>
      </CModal>
      <Snackbar
        id="alert_snackbar"
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          id="alert_toast"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          style={alertStyle}
        >
          <AlertTitle>{snackbarTitle}</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RequestFormModal;
