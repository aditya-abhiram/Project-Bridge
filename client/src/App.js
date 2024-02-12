import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Error from './components/Error';
import React from 'react';
import Header from './components/Headers';

import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}



export default App;
