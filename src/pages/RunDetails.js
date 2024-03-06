import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useNavigate, useSearchParams, useLocation} from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import VideoSection from '../components/VideoSection';
import LogsSection from '../components/LogsSection';
import TestRunsReport from '../components/TestRunsReport';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorOverlay from '../components/ErrorOverlay';
import SidebarMenu from '../components/SidebarMenu';
import { useMediaQuery } from 'react-responsive';

const fetchRunData = async (testName) => {
  const url = "https://trxzckk4vqjepedlnaag6igxxu0utfuv.lambda-url.us-west-2.on.aws/";
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
  const location = useLocation();
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // This effect is no longer needed if we're keeping the sidebar closed initially
    // Remove or comment out this useEffect block
    // setSidebarOpen(isDesktopOrLaptop);
  }, [isDesktopOrLaptop]);

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
    <div className={`flex bg-gray-800 min-h-screen ${isSidebarOpen ? 'md:pl-64' : ''}`}>
    <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
    <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 text-gray-200">
      <DashboardHeader selectedRun={selectedRun} onViewCodeClick={handleViewCodeClick} />
      <main className="mt-4 px-4 sm:px-0">
        <VideoSection selectedRun={selectedRun} />
        <LogsSection selectedRun={selectedRun} />
        <TestRunsReport previousRunsData={previousRunsData} setSelectedRun={setSelectedRun} />
      </main>
      <LoadingOverlay loading={loading} />
      {error && <ErrorOverlay error={error} />}
    </div>
    </div>
  );
}

export default TestDashboard;
