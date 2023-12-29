import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  left: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  padding: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const BackButton = ({ onClick }) => (
  <StyledButton onClick={onClick} aria-label="Go back">
    <span aria-hidden="true">&larr;</span> Back
  </StyledButton>
);

BackButton.propTypes = {
  onClick: PropTypes.func,
};

BackButton.defaultProps = {
  onClick: () => {},
};

export default BackButton;