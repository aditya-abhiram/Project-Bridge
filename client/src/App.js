import './App.css';
import Login from './components/Login';
import Error from './components/Error';
import React from 'react';
import Header from './components/Headers';
import StudentHome from './components/student/student_home';
import TeacherHome from './components/teacher/teacher_home';
import ProjectBank from './components/common/project_bank';
import StudentProfile from './components/student/student_profile';
import TeacherProfile from './components/teacher/teacher_profile';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isErrorPage = location.pathname === '/error';

  return (
    <>
      {!isLoginPage && !isErrorPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/StudentProfile" element={<StudentProfile />} />
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/TeacherProfile" element={<TeacherProfile />} />
        <Route path= "/project_bank" element={<ProjectBank />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
