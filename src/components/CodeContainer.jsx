import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const CodeContainer = ({ code, language, hidden = false }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const containerClass = `container mx-auto px-4 sm:px-6 lg:px-8 codeContainer ${hidden ? 'hidden' : ''}`;
  const codeClass = `language-${language}`;

  return (
    <div className={containerClass}>
      <pre className="line-numbers" style={{ minHeight: '100vh' }}>
        <code className={codeClass}>{code}</code>
      </pre>
    </div>
  );
};

CodeContainer.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
};

export default CodeContainer;