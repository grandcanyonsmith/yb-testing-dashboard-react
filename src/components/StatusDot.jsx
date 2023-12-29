import React from 'react';

const StatusDot = ({ status }) => {
  const statusColors = {
    Passed: 'text-green-400 bg-green-400/10',
    Failed: 'bg-red-500',
    Untested: 'bg-yellow-500',
  };
  const color = statusColors[status] || 'bg-gray-500';

  return (
    <span className={`h-2 w-2 rounded-full ${color} mr-2 inline-block`}></span>
  );
};

export default StatusDot;