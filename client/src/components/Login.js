// Frontend Login.js
import React from 'react';
import "./Login.css";

const Login = () => {
  const handleGoogleLogin = (userType) => {
    window.location.href = `http://localhost:8000/auth/google?user_type=${userType}`; // Pass userType as query parameter
  }

  return (
    <div className="login-page">
      
      <div className='form'>
        <div className='child'>
          <div className='Title'>
          <h1 style={{ textAlign: "center" }}>Welcome to Project Bridge</h1>
          </div>
        </div>
        <div className='child'>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <button className='login-with-google-btn' onClick={() => handleGoogleLogin('teacher')}>Login as Teacher</button>
          <button className='login-with-google-btn' onClick={() => handleGoogleLogin('student')}>Login as Student</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
