import React, { useState, useEffect } from 'react';
import { fetchData, applyFilters } from './view-test-runs-main';
import axios from 'axios';

import { Link } from 'react-router-dom';


// Loading Card component
// Loading Card component
const LoadingCard = ({ name }) => (
  <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
    <p className="text-sm font-medium leading-6 text-gray-400">{name}</p>
    <p className="mt-2 flex items-baseline gap-x-2">
      <div className="spinner"></div>
      <span className="text-4xl font-semibold tracking-tight text-white">Loading...</span>
    </p>
  </div>
);

// Dropdown component
const Dropdown = ({ title, options, selectedOptions, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="desktop-filter-toggle-button group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-white"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        {title}
        <svg
          className={`ml-2 h-5 w-5 text-gray-500 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          {options.map((option) => (
            <div key={option} className="px-4 py-2">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={onOptionChange}
                  className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// Filter component for Team
const TeamFilter = ({ selectedTeams, onFilterChange }) => {
  const teams = ['Legacy', 'Publishing', 'Celebrations'];

  return (
    <div className="filter-section">
      <h3 className="filter-title">Team</h3>
      {teams.map((team) => (
        <label key={team} className="filter-option">
          <input
            type="checkbox"
            value={team}
            checked={selectedTeams.includes(team)}
            onChange={onFilterChange}
          />
          {team}
        </label>
      ))}
    </div>
  );
};

// Filter component for Test Type
const TestTypeFilter = ({ selectedTestTypes, onFilterChange }) => {
  const testTypes = ['UI Tests', 'API Tests'];

  return (
    <div className="filter-section">
      <h3 className="filter-title">Test Type</h3>
      {testTypes.map((testType) => (
        <label key={testType} className="filter-option">
          <input
            type="checkbox"
            value={testType}
            checked={selectedTestTypes.includes(testType)}
            onChange={onFilterChange}
          />
          {testType}
        </label>
      ))}
    </div>
  );
};

// Filter component for Status
const StatusFilter = ({ selectedStatuses, onFilterChange }) => {
  const statuses = ['Passed', 'Failed', 'Untested'];

  return (
    <div className="filter-section">
      <h3 className="filter-title">Status</h3>
      {statuses.map((status) => (
        <label key={status} className="filter-option">
          <input
            type="checkbox"
            value={status}
            checked={selectedStatuses.includes(status)}
            onChange={onFilterChange}
          />
          {status}
        </label>
      ))}
    </div>
  );
};

const MobileFilterSection = ({ title, options, selectedOptions, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => setIsOpen(!isOpen);

  return (
    <div className="border-t border-gray-200 px-4 py-6">
      <h3 className="-mx-2 -my-3 flow-root">
        <button
          type="button"
          className="flex w-full items-center justify-between bg-gray-800 px-2 py-3 text-sm text-gray-400"
          aria-controls={`filter-section-${title.toLowerCase()}`}
          aria-expanded={isOpen}
          onClick={toggleSection}
        >
          <span className="font-medium text-white-900">{title}</span>
          <span className="ml-6 flex items-center">
            <svg
              className={`h-5 w-5 transform ${isOpen ? '-rotate-180' : 'rotate-0'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h3>
      {isOpen && (
        <div className="pt-6" id={`filter-section-${title.toLowerCase()}`}>
          <div className="space-y-6">
            {options.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`mobile-filter-${title.toLowerCase()}-${option}`}
                  name={`${title.toLowerCase()}[]`}
                  value={option}
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={onOptionChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`mobile-filter-${title.toLowerCase()}-${option}`}
                  className="ml-3 text-sm text-gray-500"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
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

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };
  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchData('today');
      setAllTestData(data);
      setIsLoading(false);
    };
    fetchAndSetData();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // If "Select All" is checked, select all test IDs
      setSelected(filteredTestData.map((item) => item.runId));
    } else {
      // If "Select All" is unchecked, clear the selection
      setSelected([]);
    }
  };

  const handleSelect = (id, filePath) => {
    setSelected((prevSelected) => {
      if (prevSelected.some(item => item.id === id)) {
        // If the item is already selected, unselect it
        return prevSelected.filter((item) => item.id !== id);
      } else {
        // If the item is not selected, select it
        return [...prevSelected, { id, filePath }]; // store filePath along with id
      }
    });
  };

    // Add a new useEffect hook to handle the side effects of running the tests
    useEffect(() => {
      if (runTestsBtnText === 'Running...') {
        const testPromises = selected.map(({ id, filePath }) => { // destructure filePath from selected item
          // Replace this URL with the URL of your test running service
          return axios.post('https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/', { filePath });
        });
  
        Promise.all(testPromises)
          .then(() => {
            alert('All tests run successfully.');
            setRunTestsBtnText('Run Tests');
            setSelected([]);
          })
          .catch(error => {
            console.error(error);
            setRunTestsBtnText('Run Tests');
            alert('An error occurred while running the tests.');
          });
      }
    }, [runTestsBtnText, selected]);
  
    const handleRunTests = () => {
      setRunTestsBtnText('Running...');
    };

  const filteredTestData = applyFilters(allTestData, filters);
// Inside the TestDashboard component, before the return statement
const handleFilterChange = (filterType, value, isChecked) => {
  setFilters((prevFilters) => {
    const newFilters = { ...prevFilters };
    if (isChecked) {
      // Add the value to the filter array
      newFilters[filterType] = [...newFilters[filterType], value];
    } else {
      // Remove the value from the filter array
      newFilters[filterType] = newFilters[filterType].filter((item) => item !== value);
    }
    return newFilters;
  });
};


// StatusDot component
const StatusDot = ({ status }) => {
  const statusColors = {
    Passed: 'bg-green-500',
    Failed: 'bg-red-500',
    Untested: 'bg-yellow-500',
  };
  const color = statusColors[status] || 'bg-gray-500';

  return (
    <span className={`h-2 w-2 rounded-full ${color} mr-2 inline-block`}></span>
  );
};

  // Function to group tests by status
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

    const groupedTests = groupTestsByStatus(filteredTestData);

    // Calculate the total number of tests
    const totalTests = filteredTestData.length;
  
    // Define the stats for the cards
    const stats = [
      { name: 'Passed', value: groupedTests['Passed'] ? groupedTests['Passed'].length : 0 },
      { name: 'Failed', value: groupedTests['Failed'] ? groupedTests['Failed'].length : 0 },
      { name: 'Untested', value: groupedTests['Untested'] ? groupedTests['Untested'].length : 0 },
      { name: 'Total', value: totalTests },
    ];
  
// Inside the TestDashboard component
return (
  <div className="bg-gray-900 min-h-screen"> {/* Change the background color to gray-800 */}
  <div className="hidden sm:block border-b border-gray-700 bg-gray-800 pb-4">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between space-x-4">
      {/* Dropdown for Team */}
      <Dropdown
        title="Team"
        options={['Legacy', 'Publishing', 'Celebrations']}
        selectedOptions={filters.team}
        onOptionChange={(e) => handleFilterChange('team', e.target.value, e.target.checked)}
      />
      {/* Dropdown for Test Type */}
      <Dropdown
        title="Test Type"
        options={['UI Tests', 'API Tests']}
        selectedOptions={filters.testType}
        onOptionChange={(e) => handleFilterChange('testType', e.target.value, e.target.checked)}
      />
      {/* Dropdown for Status */}
      <Dropdown
        title="Status"
        options={['Passed', 'Failed', 'Untested']}
        selectedOptions={filters.status}
        onOptionChange={(e) => handleFilterChange('status', e.target.value, e.target.checked)}
      />
    </div>
  </div>
</div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold leading-6 text-white mt-6">
        Yearbook Test Dashboard
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <LoadingCard key={stat.name} name={stat.name} />
          ))}
        </div>
) : (
  <>
    <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
          <p className="mt-2 flex items-baseline gap-x-2">
            <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
          </p>
        </div>
              ))}
            </div>


            <div id="table-container" className="mt-6">
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

                    {/* Mobile Filters Button */}
      <button
        className="sm:hidden bg-indigo-600 text-white px-4 py-2 rounded mt-4"
        id="mobile-filter-button"
        onClick={toggleMobileFilters}
      >
        Filters
      </button>

      {/* Mobile Filters */}
<div
  className={`fixed inset-0 z-40 sm:hidden transition-transform ${
    isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
  id="mobile-filters"
  role="dialog"
  aria-modal="true"
>
  <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMobileFilters}></div>
  <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-800 py-4 pb-12 shadow-xl">
    {/* Close button */}
    <div className="flex items-center justify-between px-4">
      <h2 className="text-lg font-medium text-white">Filters</h2>
      <button
        type="button"
        className="mobile-filters-close -mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400"
        onClick={toggleMobileFilters}
      >
        <span className="sr-only">Close menu</span>
        {/* Close icon */}
      </button>
    </div>

    {/* Mobile filter options */}
    <form className="mt-4">
      {/* Filter by Team */}
      <MobileFilterSection
        title="Team"
        options={['Legacy', 'Publishing', 'Celebrations']}
        selectedOptions={filters.team}
        onOptionChange={(e) => handleFilterChange('team', e.target.value, e.target.checked)}
      />

      {/* Filter by Test Type */}
      <MobileFilterSection
        title="Test Type"
        options={['UI Tests', 'API Tests']}
        selectedOptions={filters.testType}
        onOptionChange={(e) => handleFilterChange('testType', e.target.value, e.target.checked)}
      />

      {/* Filter by Status */}
      <MobileFilterSection
        title="Status"
        options={['Passed', 'Failed', 'Untested']}
        selectedOptions={filters.status}
        onOptionChange={(e) => handleFilterChange('status', e.target.value, e.target.checked)}
      />
    </form>
  </div>
</div>

              <table className="w-full text-left">
                <thead className="border-b border-gray-800 text-sm text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                    <input
  type="checkbox"
  id="select-all"
  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
  onChange={handleSelectAll}
  checked={selected.length === filteredTestData.length && filteredTestData.length > 0}
/>
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold" id="test-name-header">
                      Test Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold">
                      Last Run
                    </th>
                  </tr>
                </thead>
                
<tbody className="divide-y divide-gray-800 bg-gray-900" id="table-body">
{filteredTestData.map((test) => (
  <tr key={test.runId}>
    <td className="px-6 py-4">
    <input
  type="checkbox"
  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
  onChange={() => handleSelect(test.runId, test.filePath)} // pass filePath here
  checked={selected.some(item => item.id === test.runId)}
/>
    </td>
      <td className="px-6 py-4 text-sm text-gray-300">
      <Link 
  to={`/RunDetails?testName=${encodeURIComponent(test.testName.replace(/\s/g, '-'))}`} 
  className="hover:underline"
>
  {test.formattedTestName}
</Link>
  <div className="mt-2">
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
      {test.team}
    </span>
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
      {test.status}
    </span>
  </div>
</td>
      <td className="px-6 py-4 text-sm flex items-center text-gray-300">
        <StatusDot status={test.status} />
        <span className="text-xs font-semibold">{test.status}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-400">
        {test.timeframe}
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default ViewTestRuns;

