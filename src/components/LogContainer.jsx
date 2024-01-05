import React from 'react';
import PropTypes from 'prop-types';

const LogContainer = ({ stdout, stderr, hidden }) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 logContainer ${hidden ? 'hidden' : ''}`}>
      <pre className="line-numbers language-bash">
        <code>{stdout}</code>
      </pre>
      <pre className="line-numbers language-bash error">
        <code>{stderr}</code>
      </pre>
    </div>
  );
};

LogContainer.propTypes = {
  stdout: PropTypes.string.isRequired,
  stderr: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default LogContainer;