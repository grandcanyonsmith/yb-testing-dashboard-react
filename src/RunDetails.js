import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const STATUS_COLORS = {
  'Passed': 'bg-green-500',
  'Failed': 'bg-red-500',
  'Default': 'bg-gray-500',
};

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

const DashboardHeader = ({ selectedRun, onViewCodeClick }) => {
  if (!selectedRun) return null;

  return (
    <header className="border-b border-gray-700 bg-gray-800 pl-6 py-5">
      <div className="lg:flex lg:items-center lg:justify-between bg-gray-800 px-4 py-5 sm:px-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
            {selectedRun.formattedTestName}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-300">Team: {selectedRun.team}</div>
            <div className="mt-2 flex items-center text-sm text-gray-300">Status: {selectedRun.status}</div>
            <div className="mt-2 flex items-center text-sm text-gray-300">ID: {selectedRun.id}</div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <button
            className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
            onClick={onViewCodeClick}
          >
            View Code
          </button>
        </div>
      </div>
    </header>
  );
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


  const getStatusColor = (status) => STATUS_COLORS[status] || STATUS_COLORS.Default;

  const handleViewCodeClick = () => {
    if (selectedRun) {
      navigate(`/viewCode?testName=${encodeURIComponent(selectedRun.testName)}`);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200">
      <DashboardHeader selectedRun={selectedRun} onViewCodeClick={handleViewCodeClick} />
      <main className="mt-4 px-4 sm:px-0">
        <section className="w-full h-1/2 flex items-center justify-center bg-gray-800 relative">
          {selectedRun && <video src={selectedRun.videoUrl} controls className="w-full h-full"></video>}
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Logs</h2>
          <div className="w-full p-6 bg-gray-800 shadow rounded-lg">
            <pre><code className="language-markup">{selectedRun?.logs.join('\n')}</code></pre>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Test Runs Report</h2>
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700 shadow-sm rounded-lg overflow-hidden">
                  <thead className="border-b border-white/10 text-sm leading-6 text-white">
                    <tr>
                      <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                        Run ID
                      </th>
                      <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                        Last Run
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {previousRunsData.map((testRun, index) => (
                      <tr key={index} onClick={() => setSelectedRun(testRun)} className="cursor-pointer">
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                          <div className="flex items-center gap-x-4">
                            <div className="truncate text-sm font-medium leading-6 text-white">{testRun.id}</div>
                          </div>
                        </td>
                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                          <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                            <time className="text-gray-400 sm:hidden" dateTime={testRun.timestamp}>
                              {testRun.timestamp}
                            </time>
                            <div className={`flex-none rounded-full p-1 ${getStatusColor(testRun.status)}`}>
                              <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            </div>
                            <div className="hidden text-white sm:block">{testRun.status}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Transition
        show={loading}
        enter="transition-opacity duration-75"
        leave="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ChevronRightIcon className="animate-spin h-32 w-32 text-white" />
        </div>
      </Transition>
      {error && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center text-white p-4">
          {error}
        </div>
      )}
    </div>
  );
}

export default TestDashboard;
