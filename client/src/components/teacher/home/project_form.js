// ProjectForm.js
import React, { useState } from "react";
import {
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CInputGroup,
  CButton,
  CContainer,
  CRow,
  CCol,
  CBadge,
  CCloseButton,
  CForm,
} from "@coreui/react";
import "./project_form.css";

function ProjectForm({ saveProject, closeModal, teacherId }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [cgpaCutoff, setCGPACutoff] = useState("");
  const [prerequisites, setPrerequisites] = useState([]);
  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [validated, setValidated] = useState(false);
  const handleAddPrerequisite = () => {
    if (newPrerequisite.trim() !== "") {
      setPrerequisites([...prerequisites, newPrerequisite]);
      setNewPrerequisite("");
    }
  };

  const badge_styling = {
    "--bs-badge-font-size": "0.9em",
    "--bs-badge-font-weight": "500",
    "--bs-badge-color": "#18640c",
    backgroundColor: "#DAFFCB",
  };
  const handleDeletePrerequisite = (index) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites.splice(index, 1);
    setPrerequisites(updatedPrerequisites);
  };

  const handleSaveProject = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true); // Set validated state to true to trigger validation feedback
      return; // Stop further execution
    }

    // Form is valid, proceed with saving project
    setValidated(false); // Reset validation state
    const projectData = {
      teacherId,
      projectName,
      projectDescription,
      projectType,
      projectDomain,
      cgpaCutoff,
      prerequisites,
    };
    saveProject(projectData);
    closeModal();
  };

  return (
    <div>
      <h2>Add Project</h2>
      <br></br>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSaveProject}
      >
        <CContainer>
          <CRow>
            <CCol>
              <CFormInput
                type="text"
                value={projectName}
                id="floatingInput"
                floatingClassName="mb-3"
                floatingLabel="Project Name"
                placeholder="name@example.com"
                onChange={(e) => setProjectName(e.target.value)}
                feedbackInvalid="Please enter Project Name"
                required
              />
            </CCol>
            <CCol xs={6}>
              <CFormTextarea
                id="floatingTextarea"
                floatingLabel="Description"
                placeholder="Enter Project Description here"
                value={projectDescription}
                style={{ minHeight: "7rem" }}
                feedbackInvalid="Please enter Project Description"
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              ></CFormTextarea>
            </CCol>
          </CRow>
          <br></br>
          <CRow>
            <CCol>
              <CFormSelect
                id="floatingInput"
                floatingLabel="Project Type"
                placeholder="name@example.com"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                options={[
                  "Select",
                  { label: "Design Project (DOP)", value: "DOP" },
                  { label: "Label Project (LOP)", value: "LOP" },
                  { label: "Study Project (SOP)", value: "SOP" },
                ]}
              />
            </CCol>
            <CCol>
              <CFormSelect
                id="floatingInput"
                floatingLabel="CGPA cutoff"
                placeholder="name@example.com"
                value={cgpaCutoff}
                onChange={(e) => setCGPACutoff(e.target.value)}
                options={[
                  "Select",
                  { label: "Open for All", value: "open" },
                  { label: "6.0 or More", value: "6.0" },
                  { label: "7.0 or More", value: "7.0" },
                  { label: "8.0 or More", value: "8.0" },
                  { label: "9.0 or More", value: "9.0" },
                ]}
              />
            </CCol>
          </CRow>
          <br></br>

          <CFormInput
            type="text"
            id="floatingInput"
            floatingClassName="mb-3"
            floatingLabel="Specify Domain"
            placeholder="name@example.com"
            value={projectDomain}
            onChange={(e) => setProjectDomain(e.target.value)}
          />
          <br></br>
          <CInputGroup className="mb-3">
            <CFormInput
              type="text"
              value={newPrerequisite}
              onChange={(e) => setNewPrerequisite(e.target.value)}
              floatingLabel="Pre-requisites (if any)"
              placeholder=""
              // placeholder="Recipient's username"
              // aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <CButton
              type="button"
              color="secondary"
              variant="outline"
              id="button-addon2"
              onClick={handleAddPrerequisite}
            >
              Add New
            </CButton>
          </CInputGroup>
          <ul>
            {prerequisites.map((item, index) => (
              <CBadge key={index} shape="rounded-pill" style={badge_styling}>
                {item}
                <CCloseButton
                  type="button"
                  color="light"
                  style={{ width: "0.4em", height: "0.4em" }}
                  onClick={() => handleDeletePrerequisite(index)}
                />
                <br></br>
              </CBadge>
            ))}
          </ul>
          <CRow>
            <CCol></CCol>
            <CCol></CCol>
            <CCol></CCol>
            <CCol></CCol>
            <CCol></CCol>
            <CCol>
              <CButton onClick={closeModal} color="secondary">
                Cancel
              </CButton>
            </CCol>
            <CCol>
              <CButton type="submit" color="success">
                Create
              </CButton>
            </CCol>
          </CRow>
        </CContainer>
      </CForm>
    </div>
  );
}

export default ProjectForm;
