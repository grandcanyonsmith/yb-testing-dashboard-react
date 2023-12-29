import React from 'react';

export default function LoadingCard({ name }) {
  return (
    <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      <p className="text-sm font-medium leading-6 text-gray-400">{name}</p>
      <p className="mt-2 flex items-baseline gap-x-2">
        <div className="spinner"></div>
        <span className="text-4xl font-semibold tracking-tight text-white">Loading...</span>
      </p>
    </div>
  );
}