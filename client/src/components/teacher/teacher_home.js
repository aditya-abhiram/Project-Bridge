// teacher_home.js
import React, { useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";

function TeacherHome() {
  const [modalOpen, setModalOpen] = useState(false);
  const { userId } = useParams(); 

  const saveProject = (projectData) => {
    projectData.teacherId = userId;

    fetch("http://localhost:8000/saveProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Project saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving project:", error);
      });
  };

  return (
    <div className="App">
      <button onClick={() => setModalOpen(true)}>Add Project</button>
      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)} saveProject={saveProject} teacherId={userId} />
    </div>
  );
}

export default TeacherHome;
