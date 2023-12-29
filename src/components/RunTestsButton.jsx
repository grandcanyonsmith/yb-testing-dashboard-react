import React from 'react';

const RunTestsButton = ({ handleRunTests, runTestsBtnText }) => {
  return (
    <div id="run-tests-container" className="flex justify-end mb-2">
      <button
        type="button"
        id="run-tests-btn"
        className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleRunTests}
      >
        {runTestsBtnText}
      </button>
    </div>
  );
};

export default RunTestsButton;