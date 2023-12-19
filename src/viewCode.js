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
  const [submitLoading, setSubmitLoading] = useState(false);
  const [executeLoading, setExecuteLoading] = useState(false);
  const [testName, setTestName] = useState('');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [viewCode, setViewCode] = useState(true);

  const toggleView = (view) => {
    setViewCode(view === 'code');
  };

  const submitUserRequest = () => {
    setSubmitLoading(true);
    axios.post('https://kvqpfgxn2jz5pyh4wz7thbmhay0hqcvh.lambda-url.us-west-2.on.aws/', {
      fileName: testName,
      request: userRequest,
      code: code
    })
    .then(function (response) {
      setCode(response.data.newCode);
      setUserRequest('');
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      setSubmitLoading(false);
    });
  };

  const executeCode = () => {
    setExecuteLoading(true);
    axios.post('https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/', {
        filePath: testName,
        code: code
    })
    .then(function (response) {
        setStdout(response.data.StandardOutputContent);
        setStderr(response.data.StandardErrorContent);
        toggleView('logs');
    })
    .catch(function (error) {
        console.error('Error executing code:', error);
    })
    .finally(function () {
        setExecuteLoading(false);
    });
  };

  const fetchFileContents = () => {
    axios.post('https://zyw4xz6b5m2c7mdbhhsoerydve0mgnfl.lambda-url.us-west-2.on.aws/', {
        filePath: 'tests/publishing/media_versioning/test_yearbook_drafts.py',
        requestType: 'FETCH_FILE_CONTENTS',
        branchName: 'main'
    })
    .then(function (response) {
        setCode(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  useEffect(() => {
    const testNameFromURL = new URL(window.location.href).searchParams.get('testName');
    setTestName(testNameFromURL);
    fetchFileContents();
  }, []);

  const codeRef = useRef(null);
  const stdoutRef = useRef(null);
  const stderrRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, stdout, stderr]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
    <button onClick={() => window.history.back()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Back
    </button>
    <h1 className="text-xl text-left my-4">{testName}</h1>
    <div className="flex space-x-1 rounded-xl bg-gray-800 p-1">
       <button onClick={() =>
          toggleView('code')} className={`tab-button w-full rounded-lg py-2.5 text-md font-medium leading-5 ${viewCode ? 'text-white bg-gray-600' : 'text-gray-400 hover:text-white'} focus:outline-none flex items-center justify-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
             <path fill-rule="evenodd" d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z" clip-rule="evenodd" />
          </svg>
          Code
       </button>
       {/* Logs View Button */}
       <button onClick={() =>
          toggleView('logs')} className={`tab-button w-full rounded-lg py-2.5 text-md font-medium leading-5 ${!viewCode ? 'text-white bg-gray-600' : 'text-gray-400 hover:text-white'} focus:outline-none flex items-center justify-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
             <path fill-rule="evenodd" d="M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zm.943 8.752a.75.75 0 01.055-1.06L6.128 9l-1.88-1.693a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.06-.055zM9.75 10.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clip-rule="evenodd" />
          </svg>
          Logs
       </button>
    </div>
    <div className={`flex-grow w-full overflow-auto flex flex-col mb-16 ${viewCode ? '' : 'hidden'}`}>
    <pre className="line-numbers bg-gray-900"> {/* This sets the background to dark for the code box */}
         <code ref={codeRef} className="language-python w-full text-lg leading-relaxed">{code}</code>
       </pre>
 </div>
 <div className={`flex-grow w-full overflow-auto mb-16 bg-gray-900 ${viewCode ? 'hidden' : ''}`}>
 <pre className="line-numbers language-bash bg-gray-900"> {/* This sets the background to dark for the logs */}
         <code ref={stdoutRef}>{stdout}</code>
       </pre>
 <pre className="line-numbers language-bash text-red-500 bg-gray-900">
         <code ref={stderrRef}>{stderr}</code>
       </pre>
 </div>
 <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 border-t border-gray-300 p-0.75 shadow-md ">
    <div className="relative flex items-center border rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
       <textarea value={userRequest} onChange={(e) => setUserRequest(e.target.value)} className="block w-full resize-none border-none bg-transparent text-base sm:text-sm sm:leading-6 placeholder:text-gray-400 focus:ring-0 rounded-l-lg p-2" placeholder="Enter a Request..." style={{height: '2.5rem', color: 'black'}}></textarea>
       <button onClick={submitUserRequest} className="ml-auto inline-flex items-center rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
        {submitLoading ? 
          <div className="loader"></div>
          : 
          <svg id="submitIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        }
      </button>

      <button onClick={executeCode} className={`inline-flex items-center rounded-r-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ${executeLoading ? 'cursor-not-allowed' : ''}`} disabled={executeLoading}>
        {executeLoading ? (
          <div className="loader"></div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
        )}
      </button>
    </div>
 </div>
 </div>
  );
};

export default TestComponent;