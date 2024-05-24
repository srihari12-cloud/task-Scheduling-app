import React from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
