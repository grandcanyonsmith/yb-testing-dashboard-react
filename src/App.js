import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestDashboard from './RunDetails';
import ViewCode from './viewCode'; // Import the ViewCode component
import ViewTestRuns from './viewTestRuns'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/viewCode" element={<ViewCode />} />
        <Route path="/RunDetails" element={<TestDashboard />} />

        <Route path="/" element={<ViewTestRuns />} />
      </Routes>
    </Router>
  );
}

export default App;