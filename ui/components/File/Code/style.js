// @flow

import styled from 'styled-components';

export const StyledCode = styled.code`
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace !important;
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: auto !important;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  white-space: pre-wrap;
  word-break: break-word;
`;

// Styles copied from
// https://github.com/reactjs/reactjs.org/blob/942e83ef396199f499830792b1c61a9c6c990f29/src/prism-styles.js
export const PrismStyledCode = styled(StyledCode)`
  .token.attr-name {
    color: #c5a5c5;
  }
  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #999999;
  }
  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #5a9bcf;
  }
  .token.boolean {
    color: #ff8b50;
  }
  .token.tag {
    color: #fc929e;
  }
  .token.string {
    color: #8dc891;
  }
  .token.punctuation {
    color: #5fb3b3;
  }
  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #d8dee9;
  }
  .token.function {
    color: #79b6f2;
  }
  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: #d7deea;
  }
  .token.attr-value {
    color: #8dc891;
  }
  .token.keyword {
    color: #c5a5c5;
  }
  .token.atrule,
  .token.class-name {
    color: #fac863;
  }
  .token.important {
    font-weight: 400;
  }
  .token.bold {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .namespace {
    opacity: 0.7;
  }
`;
