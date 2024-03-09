// TeacherHome.js
import React, { useState, useEffect } from "react";
import ProjectForm from "./project_form";
import EditModal from "./edit_modal";
import DeleteModal from "./delete_modal"; // Import the DeleteModal component
import { useParams } from "react-router-dom";
import {
  CButton,
  CCollapse,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
} from "@coreui/react";

function TeacherHome() {
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await fetch(`http://localhost:8000/projects/${userId}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const saveProject = async (projectData) => {
    projectData.teacherId = userId;

    try {
      const response = await fetch("http://localhost:8000/saveProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      console.log("Project saved successfully:", data);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/deleteProject/${projectId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Project deleted successfully");
        fetchProjects(); // Reload projects after deletion
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const toggleExpandCollapse = (index) => {
    const newProjects = [...projects];
    newProjects[index].expanded = !newProjects[index].expanded;
    setProjects(newProjects);
  };

  const openEditModal = (projectId) => {
    setSelectedProjectId(projectId);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedProjectId(null);
  };

  return (
    <>
      <CButton
        className="mb-3"
        onClick={() => setVisible(!visible)}
        aria-expanded={visible}
        aria-controls="collapseWidthExample"
      >
        Add Project
      </CButton>
      <div>
        <CCollapse id="collapseWidthExample" visible={visible}>
          <CCard style={{ width: "70%", left: "14%" }}>
            <CCardBody>
              <ProjectForm
                saveProject={saveProject}
                closeModal={() => setVisible(false)}
                teacherId={userId}
              />
            </CCardBody>
          </CCard>
        </CCollapse>
      </div>
      <hr></hr>
      <div>
        <h3>Current Projects</h3>
        {projects.map((project, index) => (
          <CCard key={project._id} style={{ width: "18rem" }}>
            <CCardBody>
              <CCardTitle>{project.project_name}</CCardTitle>
              <CCardText>{project.project_description}</CCardText>
              {project.expanded && (
                <CCardText>CG Cutoff: {project.cg_cutoff}</CCardText>
              )}
              <CButton
                id="expand_collapse"
                onClick={() => toggleExpandCollapse(index)}
              >
                {project.expanded ? "Collapse" : "Expand"}
              </CButton>
              <CButton onClick={() => openEditModal(project._id)}>Edit</CButton>
              <DeleteModal
                projectId={project._id}
                deleteProject={deleteProject}
              />
            </CCardBody>
          </CCard>
        ))}
      </div>
      {/* Edit Modal */}
      {editModalVisible && (
        <EditModal projectId={selectedProjectId} closeModal={closeEditModal} />
      )}
    </>
  );
}

export default TeacherHome;
