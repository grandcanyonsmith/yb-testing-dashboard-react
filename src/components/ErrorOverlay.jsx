import React from 'react';

const ErrorOverlay = ({ error }) => {
  return (
    <div className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center text-white p-4">
      {error}
    </div>
  );
};

export default ErrorOverlay;