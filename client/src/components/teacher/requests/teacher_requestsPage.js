import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import "./teacher_requestsPage.css"
const ProjectRequests = () => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/teachers/projectRequests/${userId}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div style={{width:'92%', position:'relative', left:'3%', marginTop:'4%'}}>

      {projects.map((project) => (
        <Box key={project.project._id} mb={3}>
          <Typography variant="h6" style={{position:'relative', left:'5%', textAlign:'left'}}>{project.project.project_name}</Typography>
          {project.requestsData.length === 0 ? (
            <Typography id="main_table">No Requests Yet</Typography>
          ) : (
            <TableContainer component={Paper} id="main_table">
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell width="2%" />
                    <TableCell width="20%">Student Name</TableCell>
                    <TableCell width="10%">Degree</TableCell>
                    <TableCell width="10%">First Degree</TableCell>
                    <TableCell width="10%">Second Degree</TableCell>
                    <TableCell width="10%">CGPA</TableCell>
                    <TableCell width="10%">Eligibility</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project.requestsData.map((request) => (
                    <Row key={request.studentId} request={request} cgCutoff={parseFloat(project.project.cg_cutoff)} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ))}
    </div>
  );
};

const Row = ({ request, cgCutoff }) => {
  const [open, setOpen] = useState(false);
  const { studentInfo, reason_to_do_project, pre_requisites_fulfilled } = request;

  const isEligible = parseFloat(studentInfo.cg) > cgCutoff;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" id="collapse_btn" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{studentInfo.name}</TableCell>
        <TableCell>{studentInfo.degree}</TableCell>
        <TableCell>{studentInfo.firstDegree}</TableCell>
        <TableCell>{studentInfo.secondDegree}</TableCell>
        <TableCell>{studentInfo.cg}</TableCell>
        <TableCell>{isEligible ? 'Eligible' : 'Not Eligible'}</TableCell>
        <TableCell align="right">
                <Stack 
                direction="row" spacing={2}
                style={{display:"flex", justifyContent:"center"}}
                >
                  <Button variant="outlined" color="success" startIcon={<ThumbUpAltIcon />}>
                    Approve
                  </Button>
                  <Button variant="outlined" color="error" endIcon={<ThumbDownAltIcon />}>
                    Reject
                  </Button>
                </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Reason to do project:</strong> {reason_to_do_project}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Pre requisites fulfilled:</strong> {pre_requisites_fulfilled.join(', ')}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ProjectRequests;
