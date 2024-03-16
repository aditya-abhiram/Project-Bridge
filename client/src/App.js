import './App.css';
import Login from './components/Login';
import Error from './components/Error';
import React from 'react';
import StudentNav from './components/student/studentNav';
import TeacherNav from './components/teacher/teacherNav';
import StudentHome from './components/student/student_home';
import TeacherHome from './components/teacher/home/teacher_home';
import StudentProfile from './components/student/student_profile';
import TeacherProfile from './components/teacher/profile/teacher_profile';
import ProjectBank from './components/student/projectBank/student_projectBank';
import { Route, Routes, useParams } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/students/StudentHome/:userId/*" element={<StudentPageWrapper component={StudentHome} />} />
      <Route path="/teachers/TeacherHome/:userId/*" element={<TeacherPageWrapper component={TeacherHome} />} />
      <Route path="/students/StudentProfile/:userId/*" element={<StudentPageWrapper component={StudentProfile} />} />
      <Route path="/teachers/TeacherProfile/:userId/*" element={<TeacherPageWrapper component={TeacherProfile} />} />
      <Route path="/students/ProjectBank/:userId/*" element={<StudentPageWrapper component={ProjectBank} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

function StudentPageWrapper({ component: Component }) {
  const { userId } = useParams();
  return (
    <>
      <StudentNav userId={userId} />
      <Component />
    </>
  );
}

function TeacherPageWrapper({ component: Component }) {
  const { userId } = useParams();
  return (
    <>
      <TeacherNav userId={userId} />
      <Component />
    </>
  );
}

export default App;
