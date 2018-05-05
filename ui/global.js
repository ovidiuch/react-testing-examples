// Importing 'prismjs/components/prism-jsx' loads the jsx Prism language, but
// it only works if we import 'prismjs' first
import 'prismjs';
import 'prismjs/components/prism-jsx';
import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    background: #f7f7f7;
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 16px;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
`;
