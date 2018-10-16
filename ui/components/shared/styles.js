// @flow

import styled from 'styled-components';

export const Center = styled.div`
  margin: 0 auto;
  max-width: 720px;
  box-sizing: border-box;
`;

export const CenterText = styled(Center)`
  padding: 0 24px;
`;

export const Link = styled.a`
  color: #3058b5;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  box-sizing: border-box;
  border: 0;
  background: none;
  color: #20232a;
  cursor: pointer;
  outline: none;
`;

export const H2 = styled.h2`
  margin: 32px 0 24px 0;
  font-size: 28px;
  font-weight: 300;
  line-height: 36px;
  opacity: 0.8;
`;

export const H3 = styled.h3`
  margin: 24px 0 16px 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`;

export const Paragraph = styled.p`
  margin: 0 0 16px 0;
  line-height: 24px;
`;

export const Blockquote = styled.blockquote`
  margin: 0 0 16px 0;
  padding: 0 0 0 16px;
  border-left: 4px solid #dde0e8;

  p {
    color: rgba(32, 35, 42, 0.7);
  }
`;

export const InlineCode = styled.code`
  padding: 3px 6px;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-size: 14px;
  background-color: rgba(221, 224, 232, 0.7);
  border-radius: 3px;
`;

export const List = styled.ul`
  margin: 8px 0 16px 0;
  padding-left: 48px;
`;

export const ListItem = styled.li`
  line-height: 24px;
  margin: 4px 0;

  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
`;
