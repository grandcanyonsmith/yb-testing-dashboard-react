import React from 'react';

const LogsSection = ({ selectedRun }) => {
  if (!selectedRun) return null;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Logs</h2>
      <div className="w-full p-6 bg-gray-800 shadow rounded-lg">
        <pre><code className="language-markup">{selectedRun?.logs.join('\n')}</code></pre>
      </div>
    </section>
  );
};

export default LogsSection;
