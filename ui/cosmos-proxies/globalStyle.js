import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyle } from '../global-style';

export function GlobalStyleProxy({ nextProxy, ...otherProps }) {
  const { value: NextProxy, next } = nextProxy;
  const { fixture } = otherProps;

  return (
    <>
      <GlobalStyle />
      {fixture.bgColor && <CustomBg bgColor={fixture.bgColor} />}
      <NextProxy {...otherProps} nextProxy={next()} />
    </>
  );
}

const CustomBg = createGlobalStyle`
  html, body {
    background: ${props => props.bgColor};
  }
`;
