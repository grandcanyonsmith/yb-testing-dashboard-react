import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const TestComponent = () => {
  const [userRequest, setUserRequest] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState({ submit: false, execute: false });
  const [testName, setTestName] = useState('');
  const [output, setOutput] = useState({ stdout: '', stderr: '' });
  const [viewCode, setViewCode] = useState(true);

  const codeRef = useRef(null);
  const stdoutRef = useRef(null);
  const stderrRef = useRef(null);

  const toggleView = () => {
    setViewCode(!viewCode);
  };

  const handleApiRequest = async (url, body, successCallback, errorCallback) => {
    try {
      const response = await axios.post(url, body);
      successCallback(response);
    } catch (error) {
      errorCallback(error);
    }
  };

  const submitUserRequest = () => {
    setLoading(prev => ({ ...prev, submit: true }));
    handleApiRequest(
      'https://kvqpfgxn2jz5pyh4wz7thbmhay0hqcvh.lambda-url.us-west-2.on.aws/',
      { fileName: testName, request: userRequest, code: code },
      response => setCode(response.data.newCode),
      error => console.error(error),
    ).finally(() => setLoading(prev => ({ ...prev, submit: false })));
  };

  const executeCode = () => {
    setLoading(prev => ({ ...prev, execute: true }));
    handleApiRequest(
      'https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/',
      { filePath: testName, code: code },
      response => {
        setOutput({
          stdout: response.data.StandardOutputContent,
          stderr: response.data.StandardErrorContent,
        });
        toggleView();
      },
      error => console.error('Error executing code:', error),
    ).finally(() => setLoading(prev => ({ ...prev, execute: false })));
  };

  useEffect(() => {
    const testNameFromURL = new URL(window.location.href).searchParams.get('testName');
    setTestName(testNameFromURL);
    submitUserRequest();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, output.stdout, output.stderr]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
      <h1 className="text-xl text-left my-4">{testName}</h1>
      <div className="flex space-x-1 rounded-xl bg-gray-800 p-1">
        <button onClick={toggleView} className={`tab-button w-full rounded-lg py-2.5 text-md font-medium leading-5 ${viewCode ? 'text-white bg-gray-600' : 'text-gray-400 hover:text-white'} focus:outline-none flex items-center justify-center`}>
          Code
       </button>
        <button onClick={toggleView} className={`tab-button w-full rounded-lg py-2.5 text-md font-medium leading-5 ${!viewCode ? 'text-white bg-gray-600' : 'text-gray-400 hover:text-white'} focus:outline-none flex items-center justify-center`}>
          Logs
       </button>
      </div>
      <div className={`flex-grow w-full overflow-auto flex flex-col mb-16 ${viewCode ? '' : 'hidden'}`}>
        <pre className="line-numbers bg-gray-900">
          <code ref={codeRef} className="language-python w-full text-lg leading-relaxed">{code}</code>
        </pre>
      </div>
      <div className={`flex-grow w-full overflow-auto mb-16 bg-gray-900 ${viewCode ? 'hidden' : ''}`}>
        <pre className="line-numbers language-bash bg-gray-900">
          <code ref={stdoutRef}>{output.stdout}</code>
        </pre>
        <pre className="line-numbers language-bash text-red-500 bg-gray-900">
          <code ref={stderrRef}>{output.stderr}</code>
        </pre>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 border-t border-gray-300 p-0.75 shadow-md ">
        <div className="relative flex items-center border rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          <textarea value={userRequest} onChange={(e) => setUserRequest(e.target.value)} className="block w-full resize-none border-none bg-transparent text-base sm:text-sm sm:leading-6 placeholder:text-gray-400 focus:ring-0 rounded-l-lg p-2" placeholder="Enter a Request..." style={{ height: '2.5rem', color: 'black' }}></textarea>
          <button onClick={submitUserRequest} className="ml-auto inline-flex items-center rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" disabled={loading.submit}>
            {loading.submit ? (
              <div className="loader"></div>
            ) : (
              'Submit'
            )}
          </button>
          <button onClick={executeCode} className={`inline-flex items-center rounded-r-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ${loading.execute ? 'cursor-not-allowed' : ''}`} disabled={loading.execute}>
            {loading.execute ? (
              <div className="loader"></div>
            ) : (
              'Execute'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
