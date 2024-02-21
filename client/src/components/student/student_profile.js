import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { userId } = useParams();

  // Fetch student data based on userId
  // ...

  return (
    <div>
      <h1>Student Profile</h1>
      {/* Display student profile information */}
      {/* ... */}
      <p>User ID: {userId}</p>
    </div>
  );
};

export default StudentProfile;
