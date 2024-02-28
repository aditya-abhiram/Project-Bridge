// Frontend Login.js
import React from 'react';
import "./Login.css";

const Login = () => {
  const handleGoogleLogin = (userType) => {
    window.location.href = `http://localhost:8000/auth/google?user_type=${userType}`; // Pass userType as query parameter
  }

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div className='form'>
        <button className='login-with-google-btn' onClick={() => handleGoogleLogin('teacher')}>Login as Teacher</button>
        <button className='login-with-google-btn' onClick={() => handleGoogleLogin('student')}>Login as Student</button>
      </div>
    </div>
  );
}

export default Login;
