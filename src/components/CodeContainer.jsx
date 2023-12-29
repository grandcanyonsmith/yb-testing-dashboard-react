import React, { useEffect } from 'react';
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

  const containerClass = `codeContainer ${hidden ? 'hidden' : ''}`;
  const codeClass = `language-${language}`;

  return (
    <div className={containerClass}>
      <pre className="line-numbers">
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