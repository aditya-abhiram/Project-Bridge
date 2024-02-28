import React from 'react'
import { useParams } from 'react-router-dom';

const StudentHome = () => {
  const { userId } = useParams();
  return (
    <div style={{textAlign:"center"}}>
        <p>User ID: {userId}</p>
        <h1>Student Home</h1>
      </div>
  )
}

export default StudentHome