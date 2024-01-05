import React from 'react';
import { Link } from 'react-router-dom';
import StatusDot from './StatusDot';

const TestTable = ({ filteredTestData, handleSelectAll, handleSelect, selected }) => {

  return (
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
  onChange={() => handleSelect(test.runId, test.filePath)}
  checked={selected.some(item => item.id === test.runId)}
/>
            </td>
            <td className="px-6 py-4 text-sm text-gray-300">
              <Link 
  to={`/RunDetails?testName=${encodeURIComponent(test.testName ? test.testName.replace(/\s/g, '-') : '')}`} 
  className="hover:underline"
>
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
  );
};

export default TestTable;





// import React, { useCallback, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import StatusDot from './StatusDot';

// const classNames = (...classes) => {
//   return classes.filter(Boolean).join(' ')
// }

// const statuses = {
//   Passed: 'text-green-400 bg-green-400/10',
//   Failed: 'text-rose-400 bg-rose-400/10',
//   Untested: 'text-gray-400 bg-gray-400/10',
// }

// const TableRow = ({ test, handleSelect, isSelected }) => (
//   <tr key={test.runId}>
//     <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
//       <div className="flex items-center gap-x-4">
//         <img src={test.user.imageUrl} alt="" className="h-8 w-8 rounded-full bg-gray-800" />
//         <div className="truncate text-sm font-medium leading-6 text-white">{test.user.name}</div>
//       </div>
//     </td>
//     <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
//       <div className="flex gap-x-3">
//         <div className="font-mono text-sm leading-6 text-gray-400">{test.commit}</div>
//         <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
//           {test.branch}
//         </div>
//       </div>
//     </td>
//     <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
//       <div className="flex items-center justify-end gap-x-2 sm:justify-start">
//         <time className="text-gray-400 sm:hidden" dateTime={test.dateTime}>
//           {test.date}
//         </time>
//         <div className={classNames(statuses[test.status], 'flex-none rounded-full p-1')}>
//           <div className="h-1.5 w-1.5 rounded-full bg-current" />
//         </div>
//         <div className="hidden text-white sm:block">{test.status}</div>
//       </div>
//     </td>
//     <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
//       {test.duration}
//     </td>
//     <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
//       <time dateTime={test.dateTime}>{test.date}</time>
//     </td>
//   </tr>
// );

// const TestTable = ({ filteredTestData, handleSelectAll, handleSelect, selected }) => {
//   const handleSelectMemo = useCallback(handleSelect, []);
//   const filteredTestDataMemo = useMemo(() => filteredTestData, [filteredTestData]);

//   return (
//     <div className="bg-gray-900 py-10">
//       <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
//       <table className="mt-6 w-full whitespace-nowrap text-left">
//         <colgroup>
//           <col className="w-full sm:w-4/12" />
//           <col className="lg:w-4/12" />
//           <col className="lg:w-2/12" />
//           <col className="lg:w-1/12" />
//           <col className="lg:w-1/12" />
//         </colgroup>
//         <thead className="border-b border-white/10 text-sm leading-6 text-white">
//           <tr>
//             <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
//               User
//             </th>
//             <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
//               Commit
//             </th>
//             <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
//               Status
//             </th>
//             <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
//               Duration
//             </th>
//             <th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
//               Deployed at
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-white/5">
//           {filteredTestDataMemo.map((test) => (
//             <TableRow 
//               test={test} 
//               handleSelect={handleSelectMemo} 
//               isSelected={selected.some(item => item.id === test.runId)} 
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TestTable;