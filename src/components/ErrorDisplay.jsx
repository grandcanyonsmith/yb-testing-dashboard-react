import React from 'react';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="ErrorDisplay">
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

ErrorDisplay.defaultProps = {
  error: null,
};

export default ErrorDisplay;