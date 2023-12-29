import React from 'react';

const StatsCard = ({ stat }) => {
  return (
    <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
      </p>
    </div>
  );
};

export default StatsCard;