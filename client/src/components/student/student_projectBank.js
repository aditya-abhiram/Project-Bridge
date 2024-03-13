import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper, IconButton, Box, Collapse, Button, Checkbox } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ProjectBank = () => {
    const { userId } = useParams();
    const [projects, setProjects] = useState([]);
    const [likedProjects, setLikedProjects] = useState([]);

    useEffect(() => {
        const fetchProjectBankData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/students/projectBank/${userId}`);
                console.log('Project Bank Data:', response.data); // Log the response data
                setProjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };
    
        const fetchLikedProjects = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/students/getLiked/${userId}`);
                console.log('Liked Projects Data:', response.data); // Log the response data
                setLikedProjects(response.data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchProjectBankData();
        fetchLikedProjects();
    }, [userId]);
    

    const handleLike = async (projectId, isChecked) => {
        try {
            if (isChecked) {
                await axios.post(`http://localhost:8000/students/saveLiked/${userId}/${projectId}`);
                setLikedProjects([...likedProjects, { projectId }]);
            } else {
                await axios.delete(`http://localhost:8000/students/removeLiked/${userId}/${projectId}`);
                setLikedProjects(likedProjects.filter(project => project.projectId !== projectId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const Row = ({ project }) => {
        const [open, setOpen] = useState(false);
    
        if (!project || !project.project_name) {
            return null; // Return null or some fallback JSX if project is null or undefined, or if project_name is not present
        }
    
        const isLiked = likedProjects.some(liked => liked.projectId === project.project_name);
    
        const handleRequest = () => {
            console.log("Request button check");
        };
    
        return (
            <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {project.project_name}
                    </TableCell>
                    <TableCell>{project.project_description}</TableCell>
                    <TableCell>{project.project_type}</TableCell>
                    <TableCell>{project.project_domain}</TableCell>
                    <TableCell>{project.teacher_name}</TableCell>
                    <TableCell>{project.department}</TableCell>
                    <TableCell>{project.pre_requisites.join(', ')}</TableCell>
                    <TableCell>{project.cg_cutoff}</TableCell>
                    <TableCell>{project.cg_eligibility}</TableCell>
                    <TableCell>
                        <Checkbox
                            checked={isLiked}
                            onChange={(event) => handleLike(project.project_name, event.target.checked)}
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
                                <Typography>{project.project_description}</Typography>
                                <Typography>{`Pre-requisites: ${project.pre_requisites.join(', ')}`}</Typography>
                                <Typography>{`CG Cutoff: ${project.cg_cutoff}`}</Typography>
                                <Typography>{`CG Eligibility: ${project.cg_eligibility}`}</Typography>
                                <Button onClick={handleRequest} variant="contained" color="primary">Request</Button>
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
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Project Name</TableCell>
                            <TableCell>Project Description</TableCell>
                            <TableCell>Project Type</TableCell>
                            <TableCell>Project Domain</TableCell>
                            <TableCell>Teacher Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Pre-requisites</TableCell>
                            <TableCell>CG Cutoff</TableCell>
                            <TableCell>CG Eligibility</TableCell>
                            <TableCell>Like</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project, index) => (
                            <Row key={index} project={project} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProjectBank;
