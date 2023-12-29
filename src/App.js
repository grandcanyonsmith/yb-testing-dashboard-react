import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestDashboard from './pages/RunDetails';
import ViewCode from './pages/viewCode'; // Import the ViewCode component
import ViewTestRuns from './pages/viewTestRuns'

function App() {
  return (
    <Router>
          <div className="bg-gray-900">
      <Routes>
        <Route path="/viewCode" element={<ViewCode />} />
        <Route path="/RunDetails" element={<TestDashboard />} />
        <Route path="/" element={<ViewTestRuns />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;