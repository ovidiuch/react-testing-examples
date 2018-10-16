import React from 'react';
import { GlobalStyle } from './global-style';

function GlobalStyleProxy({ nextProxy, ...otherProps }) {
  const { value: NextProxy, next } = nextProxy;

  return (
    <>
      <GlobalStyle />
      <NextProxy {...otherProps} nextProxy={next()} />
    </>
  );
}

export default [GlobalStyleProxy];
