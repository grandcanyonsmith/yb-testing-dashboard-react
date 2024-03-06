import React from 'react';
import { Link } from 'react-router-dom';

const STATUS_COLORS = {
  'Passed': {
    outer: 'bg-green-400/10',
    inner: 'bg-green-400'
  },
  'Failed': {
    outer: 'bg-rose-400/10',
    inner: 'bg-rose-400'
  },
  'Untested': {
    outer: 'bg-gray-400/10',
    inner: 'bg-gray-400'
  },
};

const getStatusClasses = (status) => {
  return STATUS_COLORS[status] || STATUS_COLORS['Untested'];
};
const TestTable = ({ filteredTestData, handleSelectAll, handleSelect, selected }) => {
  return (
    <table className="w-full text-left">
      <thead className="border-b border-gray-800 text-sm text-white">
        <tr>
          <th scope="col" className="px-6 py-3">
            <input
              type="checkbox"
              id="select-all"
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={handleSelectAll}
              checked={selected.length === filteredTestData.length && filteredTestData.length > 0}
            />
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-semibold">
            Test Name
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-semibold sm:hidden">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-semibold hidden sm:table-cell">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-sm font-semibold hidden sm:table-cell">
            Last Run
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700 bg-gray-800">
        {filteredTestData.map((test) => (
          <tr key={test.runId}>
            <td className="px-6 py-4">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() => handleSelect(test.runId, test.filePath)}
                checked={selected.some(item => item.uId === test.runId)}
              />
            </td>
            <td className="px-6 py-4 text-sm text-gray-300">
              <Link to={`/RunDetails?testName=${encodeURIComponent(test.testName.replace(/\s/g, '-'))}`}  className="hover:underline">
                {test.formattedTestName}
              </Link>
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  {test.team}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  {test.testType}
                </span>
              </div>
            </td>
            {/* Mobile view: Status and Last Run combined */}
{/* Mobile view: Status and Last Run combined */}
<td className="px-6 py-4 text-sm flex justify-between items-center sm:hidden">
  <span className="text-gray-400">{test.timeframe}</span>
  <span className={`inline-flex justify-center items-center rounded-full ${getStatusClasses(test.status).outer} w-4 h-4`}>
    <span className={`h-2 w-2 rounded-full ${getStatusClasses(test.status).inner}`}></span>
  </span>
</td>
{/* Desktop view: Status */}
<td className="px-6 py-4 text-sm text-gray-300 hidden sm:table-cell">
  <div className="flex items-center">
    <span className={`inline-flex justify-center items-center rounded-full ${getStatusClasses(test.status).outer} w-4 h-4`}>
      <span className={`h-2 w-2 rounded-full ${getStatusClasses(test.status).inner}`}></span>
    </span>
    <span className="ml-2">{test.status}</span>
  </div>
</td>
            {/* Desktop view: Last Run */}
            <td className="px-6 py-4 text-sm text-gray-400 hidden sm:table-cell">
              {test.timeframe}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TestTable;


// <td className="px-6 py-4 text-sm flex justify-between items-center sm:hidden">
// <span className="text-gray-400">{test.timeframe}</span>
// <span className={`h-2 w-2 rounded-full ${getStatusColor(test.status)} inline-block`} />
// </td>
// {/* Desktop view: Status */}
// <td className="px-6 py-4 text-sm text-gray-300 hidden sm:table-cell">
// <span className={`h-2 w-2 rounded-full ${getStatusColor(test.status)} inline-block mr-2`} />
// {test.status}
// </td>
// {/* Desktop view: Last Run */}
// <td className="px-6 py-4 text-sm text-gray-400 hidden sm:table-cell">
// {test.timeframe}
// </td>