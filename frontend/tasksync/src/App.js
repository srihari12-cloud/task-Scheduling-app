import React from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp.js';
import Login from './components/Login/Login.js';
import HomePage from './components/HomePage/HomePage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
