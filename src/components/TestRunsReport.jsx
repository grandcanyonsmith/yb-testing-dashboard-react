import React from 'react';

const STATUS_COLORS = {
  'Passed': 'text-green-400 bg-green-400/10',
  'Failed': 'text-rose-400 bg-rose-400/10',
  'Untested': 'text-gray-400 bg-gray-400/10',
};

const getStatusColor = (status) => STATUS_COLORS[status] || STATUS_COLORS.Default;

const TestRunsReport = ({ previousRunsData, setSelectedRun }) => {
  const handleClick = (testRun) => {
    setSelectedRun(testRun);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-800 py-10">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Test Runs Report</h2>
      <table className="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
              Run ID
            </th>
            <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
              Last Run
            </th>
            <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
              Status
            </th>
          </tr>
        </thead>
                <tbody className="divide-y divide-white/5">
          {previousRunsData.map((testRun, index) => (
            
            <tr key={index} onClick={() => handleClick(testRun)} className="cursor-pointer">
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <div className="truncate text-sm font-medium leading-6 text-white hover:underline active:underline">{testRun.id}</div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="font-mono text-sm leading-6 text-gray-400">{testRun.timeframe}</div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <time className="text-gray-400 sm:hidden" dateTime={testRun.timeframe}>
                    {testRun.timeframe}
                  </time>
                  <div className={getStatusColor(testRun.status) + ' flex-none rounded-full p-1'}>
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
  );
};

export default TestRunsReport;