import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  IconButton,
  Box,
  Collapse,
  Button,
  Checkbox,
} from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DataGrid } from "@mui/x-data-grid";
import RequestFormModal from "./RequestFormModal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./student_projectBank.css";
const ProjectBank = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Define selectedProject state
  const [draftDetails, setDraftDetails] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);
  const [projectStatuses, setProjectStatuses] = useState({});
  useEffect(() => {
    const fetchProjectBankData = async () => {
      try {
        const response = await axios.get(
          `https://project-bridge-backend.onrender.com/students/projectBank/${userId}`
        );
        console.log("Project Bank Data:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLikedProjects = async () => {
      try {
        const response = await axios.get(
          `https://project-bridge-backend.onrender.com/students/getLiked/${userId}`
        );
        console.log("Liked Projects Data:", response.data);
        setLikedProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjectBankData();
    fetchLikedProjects();
    // fetchProjectStatuses();
  }, [userId]);

  useEffect(() => {
    const fetchProjectStatuses = async () => {
      try {
        const requests = projects.map((project) =>
          axios.get(
            `https://project-bridge-backend.onrender.com/students/getProjectStatus/${userId}/${project.projectId}`
          )
        );
        const responses = await Promise.all(requests);
        const statuses = responses.reduce((acc, response, index) => {
          const project = projects[index];
          acc[project.projectId] = response.data.projectStatus;
          return acc;
        }, {});
        setProjectStatuses(statuses);
      } catch (error) {
        console.error("Error fetching project statuses:", error);
      }
    };

    if (projects.length > 0) {
      fetchProjectStatuses();
    }
  }, [projects, userId]);

  useEffect(() => {
    if (projects.length > 0) {
      const fetchSentRequests = async () => {
        try {
          const requests = {};
          for (const project of projects) {
            const response = await axios.get(
              `https://project-bridge-backend.onrender.com/requests/sentRequests/${project.projectId}/${userId}`
            );
            requests[project.projectId] = response.data ? true : false;
          }
          setSentRequests(requests);
        } catch (error) {
          console.error("Error fetching sent requests:", error);
        }
      };

      fetchSentRequests();
    }
  }, [projects, userId]);

  const handleLike = async (projectId, isChecked) => {
    try {
      if (isChecked) {
        await axios.post(
          `https://project-bridge-backend.onrender.com/students/saveLiked/${userId}/${projectId}`
        );
        setLikedProjects([...likedProjects, { projectId }]);
      } else {
        await axios.delete(
          `https://project-bridge-backend.onrender.com/students/removeLiked/${userId}/${projectId}`
        );
        setLikedProjects(
          likedProjects.filter((project) => project.projectId !== projectId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateProjectStatus = (projectId, status) => {
    setProjectStatuses((prevStatuses) => ({
      ...prevStatuses,
      [projectId]: status,
    }));
  };

  const Row = ({ project, projectStatuses }) => {
    const [open, setOpen] = useState(false);
    if (!project || !project.project_name) {
      return null; // Return null or some fallback JSX if project is null or undefined, or if project_name is not present
    }
    const isLiked = likedProjects.some(
      (liked) => liked.projectId === project.project_name
    );

    const isRequestSent = sentRequests[project.projectId];

    const projectStatus = projectStatuses[project.projectId];

    // This line is causing the error

    const handleRequest = (projectData) => {
      setSelectedProject(projectData); // Set selectedProject when request button is clicked
      setIsRequestFormOpen(true);
    };

    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              id="collapse_btn"
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {project.project_name}
          </TableCell>
          <TableCell>{project.project_type}</TableCell>
          <TableCell>{project.project_domain}</TableCell>
          <TableCell>{project.teacher_name}</TableCell>
          <TableCell>{project.department}</TableCell>
          <TableCell>{project.pre_requisites.join(", ")}</TableCell>
          {/* <TableCell>{project.cg_cutoff}</TableCell> */}
          <TableCell>{project.cg_eligibility}</TableCell>
          <TableCell>{projectStatus}</TableCell>
          <TableCell>
            <Checkbox
              checked={isLiked}
              onChange={(event) =>
                handleLike(project.project_name, event.target.checked)
              }
              icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Project Details
                </Typography>
                <Typography>{`Project Description: ${project.project_description}`}</Typography>
                <Typography>{`Pre-requisites: ${project.pre_requisites.join(
                  ", "
                )}`}</Typography>
                <Typography>{`CG Cutoff: ${project.cg_cutoff}`}</Typography>
                <Typography>{`CG Eligibility: ${project.cg_eligibility}`}</Typography>
                {/* <Button onClick={() => handleRequest(project)} variant="contained" color="primary">Request</Button> */}
                {/* Render other project details here */}
                <Stack
                  direction="row"
                  spacing={1}
                  style={{ justifyContent: "flex-start" }}
                >
                  {isRequestSent ? (
                    <Chip
                      label="Request Already Sent"
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <Button
                      onClick={() => handleRequest(project)}
                      variant="contained"
                      color="primary"
                    >
                      Request
                    </Button>
                  )}
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <div>
      <h1>Project Bank</h1>
      <TableContainer component={Paper} id="main_table">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell width="2%" />
              <TableCell width="20%">Project Name</TableCell>
              <TableCell width="8%">Project Type</TableCell>
              <TableCell width="10%">Project Domain</TableCell>
              <TableCell width="10%">Teacher Name</TableCell>
              <TableCell width="7%">Department</TableCell>
              <TableCell width="12%">Pre-requisites</TableCell>
              {/* <TableCell width="10%">CG Cutoff</TableCell> */}
              <TableCell width="8%">CG Eligibility</TableCell>
              <TableCell width="10%">Project Status</TableCell>
              <TableCell width="2%">Like</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <Row
                key={index}
                project={project}
                projectStatuses={projectStatuses}
                updateProjectStatus={updateProjectStatus}
                handleRequest={() => setIsRequestFormOpen(true)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isRequestFormOpen && (
        <RequestFormModal
          visible={isRequestFormOpen}
          onClose={() => setIsRequestFormOpen(false)}
          project={selectedProject}
          userId={userId}
          selectedProject={selectedProject} // Pass selectedProject to RequestFormModal
          draftDetails={draftDetails}
          setSentRequests={setSentRequests}
          sentRequests={sentRequests}
          setProjectStatuses={setProjectStatuses}
          projectStatuses={projectStatuses}
        />
      )}
    </div>
  );
};

export default ProjectBank;
