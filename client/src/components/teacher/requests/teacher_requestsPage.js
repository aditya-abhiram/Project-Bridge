import React from 'react'
import { useParams } from 'react-router-dom';
const ProjectRequests = () => {
  const { userId } = useParams();
  return (
    <div style={{textAlign:"center"}}>
        <p>User ID: {userId}</p>
        <h1>Requests Page</h1>
        <a href={`/teachers/TeacherHome/${userId}`}> Back to Home </a>
      </div>
  )
}

export default ProjectRequests