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
import { Route, Routes, useParams } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/StudentHome/:userId/*" element={<PageWrapper component={StudentHome} />} />
      <Route path="/TeacherHome/:userId/*" element={<PageWrapper component={TeacherHome} />} />
      <Route path="/StudentProfile/:userId/*" element={<PageWrapper component={StudentProfile} />} />
      <Route path="/TeacherProfile/:userId/*" element={<PageWrapper component={TeacherProfile} />} />
      <Route path="/project_bank" element={<ProjectBank />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function PageWrapper({ component: Component }) {
  const { userId } = useParams();
  return (
    <>
      <Header userId={userId} />
      <Component />
    </>
  );
}

export default App;
