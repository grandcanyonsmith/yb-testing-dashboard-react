import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestDashboard from './RunDetails';
import ViewCode from './viewCode'; // Import the ViewCode component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/viewCode" element={<ViewCode />} />
        <Route path="/" element={<TestDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;