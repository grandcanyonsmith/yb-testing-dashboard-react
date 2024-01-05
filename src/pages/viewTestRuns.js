import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchData, applyFilters } from '../view-test-runs-main';
import Dropdown from '../components/Dropdown';
import LoadingCard from '../components/LoadingCard';
import MobileFilterSection from '../components/MobileFilterSection';
import StatusDot from '../components/StatusDot';
import TestTable from '../components/TestTable';
import RunTestsButton from '../components/RunTestsButton';
import FilterSection from '../components/FilterSection';
import StatsCard from '../components/StatsCard';

const ViewTestRuns = () => {
  const [allTestData, setAllTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [runTestsBtnText, setRunTestsBtnText] = useState('Run Tests');
  const [filters, setFilters] = useState({
    team: [],
    testType: [],
    status: [],
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    fetchDataAndSet('today');
  }, []);

  const fetchDataAndSet = async (timeframe) => {
    const data = await fetchData(timeframe);
    setAllTestData(data);
    setIsLoading(false);
  };

  const handleSelectAll = (e) => {
    const ids = filteredTestData.map((item) => ({ id: item.runId, filePath: item.filePath }));
    setSelected(e.target.checked ? ids : []);
  };

  
  const handleSelect = (runId, filePath) => {
    // Check if the runId is already in the selected array
    const isSelected = selected.some(item => item.id === runId);
  
    if (isSelected) {
      // If the runId is already selected, remove it from the selected array
      setSelected(selected.filter(item => item.id !== runId));
    } else {
      // If the runId is not selected, add it to the selected array
      setSelected([...selected, { id: runId, filePath }]);
    }
  };

  useEffect(() => {
    if (runTestsBtnText === 'Running...') {
      runTests();
    }
  }, [runTestsBtnText, selected]);


  const updateTestData = (runId, newData) => {
    setAllTestData(prevData => {
      const updatedData = prevData.map(test => {
        if (test.runId === runId) {
          return { ...test, ...newData };
        }
        return test;
      });
      return sortTests(updatedData); // Sort the updated data
    });
  };


  const sortTests = (tests) => {
    // Define a mapping from status to a numerical value for sorting
    const statusPriority = {
      'Failed': 1,
      'Passed': 2,
      'Untested': 3,
      // Add other statuses if needed
    };
  
    // Sort by status first, then by timestamp (most recent first)
    return tests.sort((a, b) => {
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
      // Convert timestamps to Date objects for comparison
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB - dateA; // Most recent first
    });
  };

  const runTests = async () => {
    const testPromises = selected.map(({ id, filePath }) => 
      axios.post('https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/', { filePath })
    );
  
    try {
      const responses = await Promise.all(testPromises);
      responses.forEach((response, index) => {
        const runId = selected[index].id;
        // Assuming the response data structure matches the test object structure
        const testResult = response.data; // This should be the object containing the test result details
        const newData = {
          ...testResult, // Spread the test result details into the newData object
          timeframe: 'A few seconds ago', // Update the timeframe
        };
        updateTestData(runId, newData);
      });
      alert('All tests run successfully.');
      setRunTestsBtnText('Run Tests');
      setSelected([]);
    } catch (error) {
      console.error(error);
      setRunTestsBtnText('Run Tests');
      alert('An error occurred while running the tests.');
    }
  };

  const handleRunTests = () => {
    setRunTestsBtnText('Running...');
  };

  const filteredTestData = applyFilters(allTestData, filters);

  const handleFilterChange = (filterType, value, isChecked) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      newFilters[filterType] = isChecked ? [...newFilters[filterType], value] : newFilters[filterType].filter((item) => item !== value);
      return newFilters;
    });
  };

  const groupTestsByStatus = (tests) => {
  return tests.reduce((acc, test) => {
    const { status } = test;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(test);
    return acc;
  }, {});
};

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  const groupedTests = groupTestsByStatus(filteredTestData);

  const totalTests = filteredTestData.length;

  const stats = [
    { name: 'Passed', value: groupedTests['Passed'] ? groupedTests['Passed'].length : 0 },
    { name: 'Failed', value: groupedTests['Failed'] ? groupedTests['Failed'].length : 0 },
    { name: 'Untested', value: groupedTests['Untested'] ? groupedTests['Untested'].length : 0 },
    { name: 'Total', value: totalTests },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <FilterSection filters={filters} handleFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold leading-6 text-white mt-6">Yearbook Test Dashboard</h1>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => <LoadingCard key={stat.name} name={stat.name} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => <StatsCard key={stat.name} stat={stat} />)}
            </div>
            <RunTestsButton handleRunTests={handleRunTests} runTestsBtnText={runTestsBtnText} />
            <MobileFilterSection isMobileFiltersOpen={isMobileFiltersOpen} toggleMobileFilters={toggleMobileFilters} filters={filters} handleFilterChange={handleFilterChange} />
            <TestTable filteredTestData={filteredTestData} handleSelectAll={handleSelectAll} handleSelect={handleSelect} selected={selected} />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewTestRuns;
