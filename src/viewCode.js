import React, { useEffect, useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './ViewCode.css';

const API_URLS = {
  submit: 'https://kvqpfgxn2jz5pyh4wz7thbmhay0hqcvh.lambda-url.us-west-2.on.aws/',
  execute: 'https://xmichysgq4emm6orafcdnwwhwu0lvmez.lambda-url.us-west-2.on.aws/',
  fetchFileContents: 'https://zyw4xz6b5m2c7mdbhhsoerydve0mgnfl.lambda-url.us-west-2.on.aws/',
};

const LOADING_STATES = {
  idle: 'idle',
  submit: 'submit',
  execute: 'execute',
  fetchFileContents: 'fetchFileContents',
};

const initialState = {
  userRequest: '',
  code: '',
  testName: '',
  output: { stdout: '', stderr: '' },
  viewCode: true,
  loadingState: LOADING_STATES.idle,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setUserRequest':
      return { ...state, userRequest: action.payload };
    case 'setCode':
      return { ...state, code: action.payload };
    case 'setTestName':
      return { ...state, testName: action.payload };
    case 'setOutput':
      return { ...state, output: action.payload };
    case 'toggleViewCode':
      return { ...state, viewCode: !state.viewCode };
    case 'setLoadingState':
      return { ...state, loadingState: action.payload };
    case 'setError':
      return { ...state, error: action.payload };
    default:
      throw new Error();
  }
}

async function handleApiRequest(url, body) {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const ViewCode = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const testName = new URLSearchParams(location.search).get('testName');
    if (testName) {
      dispatch({ type: 'setTestName', payload: testName });
      fetchFileContents(testName);
    } else {
      console.error('Test name not provided in the URL');
    }
  }, [location.search]);

  const fetchFileContents = async (testName) => {
    dispatch({ type: 'setLoadingState', payload: LOADING_STATES.fetchFileContents });
    try {
      const data = await handleApiRequest(API_URLS.fetchFileContents, { filePath: testName, requestType: 'FETCH_FILE_CONTENTS', branchName: 'main' });
      dispatch({ type: 'setCode', payload: data });
    } catch (error) {
      dispatch({ type: 'setError', payload: error });
    } finally {
      dispatch({ type: 'setLoadingState', payload: LOADING_STATES.idle });
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [state.code, state.output.stdout, state.output.stderr]);

  const handleUserRequestChange = (e) => {
    dispatch({ type: 'setUserRequest', payload: e.target.value });
  };

  const submitUserRequest = async () => {
    dispatch({ type: 'setLoadingState', payload: LOADING_STATES.submit });
    try {
      const data = await handleApiRequest(API_URLS.submit, { fileName: state.testName, request: state.userRequest, code: state.code });
      dispatch({ type: 'setCode', payload: data.newCode });
    } catch (error) {
      dispatch({ type: 'setError', payload: error });
    } finally {
      dispatch({ type: 'setLoadingState', payload: LOADING_STATES.idle });
    }
  };

  const executeCode = async () => {
    dispatch({ type: 'setLoadingState', payload: LOADING_STATES.execute });
    try {
      const data = await handleApiRequest(API_URLS.execute, { filePath: state.testName, code: state.code });
      dispatch({ type: 'setOutput', payload: { stdout: data.StandardOutputContent, stderr: data.StandardErrorContent } });
      dispatch({ type: 'toggleViewCode' });
    } catch (error) {
      dispatch({ type: 'setError', payload: error });
    } finally {
      dispatch({ type: 'setLoadingState', payload: LOADING_STATES.idle });
    }
  };

  const toggleViewCode = () => {
    dispatch({ type: 'toggleViewCode' });
  };

  const navigateBack = () => {
    // Grab the testName from the URL
    const testName = new URLSearchParams(location.search).get('testName');
    // Redirect to the RunDetails page with testName as a query parameter
    navigate(`/RunDetails?testName=${encodeURIComponent(testName)}`);
  };

  return (
    <div className="ViewCode">
      <button onClick={navigateBack} className="text-sm font-semibold leading-7" style={{ position: 'absolute', top: '0', left: '10px', color: 'white' }}>
        <span aria-hidden="true">&larr;</span> Back
      </button>
      <div style={{ marginTop: '30px' }} className="tabContainer">
        <button onClick={toggleViewCode} className={`tabButton ${state.viewCode ? 'active' : ''}`}>
          Code
        </button>
        <button onClick={toggleViewCode} className={`tabButton ${!state.viewCode ? 'active' : ''}`}>
          Logs
        </button>
      </div>
      <div className={`codeContainer ${state.viewCode ? '' : 'hidden'}`}>
        <pre className="line-numbers">
          <code className="language-python">{state.code}</code>
        </pre>
      </div>
      <div className={`logContainer ${state.viewCode ? 'hidden' : ''}`}>
        <pre className="line-numbers language-bash">
          <code>{state.output.stdout}</code>
        </pre>
        <pre className="line-numbers language-bash error">
          <code>{state.output.stderr}</code>
        </pre>
      </div>
      <div className="inputContainer">
        <textarea value={state.userRequest} onChange={handleUserRequestChange} className="userRequestInput" placeholder="Enter a Request..."></textarea>
        <button onClick={submitUserRequest} className={`submitButton ${state.loadingState === LOADING_STATES.submit ? 'loading' : ''}`} disabled={state.loadingState === LOADING_STATES.submit}>
          Submit
        </button>
        <button onClick={executeCode} className={`executeButton ${state.loadingState === LOADING_STATES.execute ? 'loading' : ''}`} disabled={state.loadingState === LOADING_STATES.execute}>
          Execute
        </button>
      </div>
      {state.error && <div className="error">{state.error.message}</div>}
    </div>
  );
};

export default ViewCode;