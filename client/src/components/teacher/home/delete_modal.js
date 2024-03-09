// delete_modal.js
import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

function DeleteModal({ projectId, deleteProject }) {
  const [visible, setVisible] = useState(false);

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId);
      setVisible(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Delete</CButton>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader closeButton>
          <CModalTitle id="StaticBackdropExampleLabel">DELETE PROJECT?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Please confirm to delete the project.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            CANCEL
          </CButton>
          <CButton color="primary" onClick={handleDeleteProject}>
            CONFIRM DELETE
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default DeleteModal;
