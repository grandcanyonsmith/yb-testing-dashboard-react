// view-test-runs-main.js
import axios from 'axios';

// Function to fetch test data
export const fetchData = async (timeframe) => {
  try {
    const response = await axios.post('https://4ktivmmitgsrs67idemrarllyy0ltvat.lambda-url.us-west-2.on.aws/', { timestamp: timeframe });
    if (response.data && typeof response.data === 'object') {
      // Combine all tests from each status into a single array
      const allTestData = [].concat(
        response.data.Passed,
        response.data.Failed,
        response.data.Untested
      );
      console.log(allTestData,'allTestData')
      return allTestData;
    } else {
      console.error('Expected an object with test status arrays, but got:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Function to group test data by status
export const groupByStatus = (tests) => {
  return tests.reduce((acc, test) => {
    const { status } = test;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(test);
    return acc;
  }, {});
};

// Function to apply filters to test data
export const applyFilters = (allTestData, filters) => {
  const { team, testType, status } = filters;
  return allTestData.filter(data => {
    const teamMatch = team.length === 0 || team.includes(data.team);
    const testTypeMatch = testType.length === 0 || testType.includes(data.testType);
    const statusMatch = status.length === 0 || status.includes(data.status);
    return teamMatch && testTypeMatch && statusMatch;
  });
};

// Function to run selected tests
export const runSelectedTests = async (selectedTests) => {
  try {
    const responses = await Promise.all(
      selectedTests.map((test) =>
        axios.post('https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/', { filePath: test.filePath })
      )
    );
    return responses;
  } catch (error) {
    console.error('Error running tests:', error);
    throw error;
  }
};

// Function to select all tests
export const selectAllTests = (allTestData) => {
  return allTestData.map((test) => test.id);
};

// Function to toggle the visibility of the Run Tests button
export const toggleRunTestsButton = (show) => {
  const runTestsContainer = document.getElementById('run-tests-container');
  if (show) {
    runTestsContainer.classList.remove('hidden');
  } else {
    runTestsContainer.classList.add('hidden');
  }
};

// Function to set up event listeners for filter changes
export const setupFilterEventListeners = (callback) => {
  document.querySelectorAll('input[name="team[]"], input[name="test-type[]"], input[name="status[]"]').forEach((input) => {
    input.addEventListener('change', callback);
  });
};

// Function to set up event listeners for mobile filter checkboxes
export const setupMobileFilterEventListeners = (callback) => {
  document.querySelectorAll('#mobile-filters input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', callback);
  });
};

// Function to close filters on outside click
export const closeFiltersOnClickOutside = () => {
  document.addEventListener('click', (event) => {
    var filterToggles = document.querySelectorAll('.filter-toggle-button');
    filterToggles.forEach((toggle) => {
      var targetId = toggle.getAttribute('aria-controls');
      var targetElement = document.getElementById(targetId);
      if (!event.target.closest('.filter-toggle-button') && !targetElement.contains(event.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        targetElement.classList.add('hidden');
        toggle.querySelector('svg').classList.remove('rotate-180');
      }
    });
  });
};