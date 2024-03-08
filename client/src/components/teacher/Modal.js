// Modal.js
import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
  },
};

function CustomModal({ isOpen, closeModal, saveProject, teacherId }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDomain, setProjectDomain] = useState("");
  const [cgpaCutoff, setCGPACutoff] = useState("");
  const [prerequisites, setPrerequisites] = useState([]);
  const [newPrerequisite, setNewPrerequisite] = useState("");

  const handleAddPrerequisite = () => {
    if (newPrerequisite.trim() !== "") {
      setPrerequisites([...prerequisites, newPrerequisite]);
      setNewPrerequisite("");
    }
  };

  const handleDeletePrerequisite = (index) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites.splice(index, 1);
    setPrerequisites(updatedPrerequisites);
  };

  const handleSaveProject = () => {
    const projectData = {
      teacherId, // Include teacherId in projectData
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
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>Add Project</h2>
      <form>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Project Description:
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Project Type:
          <input
            type="radio"
            value="LOP"
            checked={projectType === "LOP"}
            onChange={(e) => setProjectType(e.target.value)}
          />
          LOP
          <input
            type="radio"
            value="DOP"
            checked={projectType === "DOP"}
            onChange={(e) => setProjectType(e.target.value)}
          />
          DOP
          <input
            type="radio"
            value="SOP"
            checked={projectType === "SOP"}
            onChange={(e) => setProjectType(e.target.value)}
          />
          SOP
        </label>
        <br />
        <label>
          Project Domain:
          <select
            value={projectDomain}
            onChange={(e) => setProjectDomain(e.target.value)}
          >
            <option value="">Select</option>
            <option value="CS">CS</option>
            <option value="ECE">ECE</option>
            <option value="ENI">ENI</option>
            <option value="EEE">EEE</option>
          </select>
        </label>
        <br />
        <label>
          CGPA Cutoff:
          <select
            value={cgpaCutoff}
            onChange={(e) => setCGPACutoff(e.target.value)}
          >
            <option value="">Select</option>
            <option value="6.0">6.0 or more</option>
            <option value="7.0">7.0 or more</option>
            <option value="8.0">8.0 or more</option>
            <option value="9.0">9.0 or more</option>
          </select>
        </label>
        <br />
        <label>
          Pre-requisites:
          <input
            type="text"
            value={newPrerequisite}
            onChange={(e) => setNewPrerequisite(e.target.value)}
          />
          <button type="button" onClick={handleAddPrerequisite}>
            Add New
          </button>
        </label>
        <ul>
          {prerequisites.map((item, index) => (
            <li key={index}>
              {item}
              <button type="button" onClick={() => handleDeletePrerequisite(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleSaveProject}>
          Save
        </button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
}

export default CustomModal;
