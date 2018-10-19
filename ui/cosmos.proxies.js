import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './global-style';

function GlobalStyleProxy({ nextProxy, ...otherProps }) {
  const { value: NextProxy, next } = nextProxy;

  return (
    <>
      <GlobalStyle />
      <LightBg>
        <NextProxy {...otherProps} nextProxy={next()} />
      </LightBg>
    </>
  );
}

const LightBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f7f9;
`;

export default [GlobalStyleProxy];
