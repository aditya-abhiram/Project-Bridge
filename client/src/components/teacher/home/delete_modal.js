// delete_modal.js
import React, { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <Button onClick={() => setVisible(!visible)} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
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
          <Button color="secondary" variant="outlined" onClick={() => setVisible(false)}>
            CANCEL
          </Button>
          <Button color="primary" onClick={handleDeleteProject} variant="outlined" startIcon={<DeleteIcon />}>
            CONFIRM DELETE
          </Button>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default DeleteModal;
