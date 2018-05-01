// @flow

import styled from 'styled-components';

export const Center = styled.div`
  margin: 0 auto;
  max-width: 720px;
  box-sizing: border-box;
`;

export const Title = Center.withComponent('h2').extend`
  padding: 40px 24px 0 24px;
  font-size: 28px;
  line-height: 32px;
  font-weight: 300;
  opacity: 0.75;
`;

export const Description = Center.withComponent('p').extend`
  padding: 24px 24px 12px 24px;
  line-height: 1.5em;
`;
