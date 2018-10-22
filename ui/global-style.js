// @flow

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background: #20232a;
    color: #888e9c;
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 16px;
  }

  body.with-modal {
    overflow: hidden;
  }

  ul, ol, li, p, h1, h2, input, button, select {
    margin: 0;
    padding: 0;
  }

  input, button, select {
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 16px;
  }

  a {
    color: #3058b5;
    font-weight: 500;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`;
