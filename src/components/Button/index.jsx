import React from 'react';
import styled from 'styled-components';

const Button = ({
  name,
  onClick,
  children,
  ...rest
}) => (
  <button
    onClick={onClick}
    name={name}
    {...rest}
  >
    {children}
  </button>
);

/*
  We can create multiple button styles in here if needed
  we just need to make sure that we export them appropriately
*/


export const BlueButton = styled(Button)`
  background-color: '#0000FF';
  color: '#fff';
`;

export default Button;