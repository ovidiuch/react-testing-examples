// @flow

import styled from 'styled-components';

export const Center = styled.div`
  margin: 0 auto;
  max-width: 720px;
  box-sizing: border-box;
`;

export const CenterText = Center.extend`
  padding: 0 24px;
`;

export const H2 = styled.h2`
  margin: 32px 0 24px 0;
  font-size: 28px;
  line-height: 36px;
  font-weight: 300;
  opacity: 0.75;
`;

export const H3 = styled.h3`
  margin: 24px auto 16px 0;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`;

export const Paragraph = styled.p`
  margin: 16px 0;
  line-height: 24px;
`;

export const Link = styled.a`
  color: #0366d6;
  font-weight: 500;
  text-decoration: none;

  :hover,
  :active {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  border: 0;
  background: none;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  outline: none;
`;
