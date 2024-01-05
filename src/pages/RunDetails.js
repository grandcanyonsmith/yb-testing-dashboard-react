import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import VideoSection from '../components/VideoSection';
import LogsSection from '../components/LogsSection';
import TestRunsReport from '../components/TestRunsReport';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';

const fetchRunData = async (testName) => {
  const url = "https://m3safcz3boalyw7x7dl4qig3wq0tucft.lambda-url.us-west-2.on.aws/";
  const data = { "testName": testName };
  const headers = { 'Content-type': 'application/json' };

  try {
    const response = await axios.post(url, data, { headers });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: 'There was an error fetching the data. Please try again later.' };
  }
};

const TestDashboard = () => {
  const [previousRunsData, setPreviousRunsData] = useState([]);
  const [selectedRun, setSelectedRun] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initiateFetch = async () => {
      setLoading(true);
      const testName = searchParams.get('testName');
      const { data, error } = await fetchRunData(testName);
      setPreviousRunsData(data || []);
      setSelectedRun(data?.[0] || null);
      setError(error);
      setLoading(false);
    };

    initiateFetch();
  }, [searchParams]);

  const handleViewCodeClick = () => {
    if (selectedRun) {
      navigate(`/viewCode?testName=${encodeURIComponent(selectedRun.testName)}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-900 text-gray-200">
      <DashboardHeader selectedRun={selectedRun} onViewCodeClick={handleViewCodeClick} />
      <main className="mt-4 px-4 sm:px-0">
        <VideoSection selectedRun={selectedRun} />
        <LogsSection selectedRun={selectedRun} />
        <TestRunsReport previousRunsData={previousRunsData} setSelectedRun={setSelectedRun} />
      </main>
      <LoadingOverlay loading={loading} />
      {error && <ErrorOverlay error={error} />}
    </div>
  );
}

export default TestDashboard;