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

export const Title = CenterText.withComponent('h2').extend`
  margin: 48px auto 24px auto;
  font-size: 28px;
  line-height: 32px;
  font-weight: 300;
  opacity: 0.75;
`;

export const Description = CenterText.extend`
  margin: 24px auto;
`;

export const Paragraph = styled.p`
  margin: 16px 0;
  line-height: 24px;
`;

export const List = styled.ul`
  padding-left: 32px;
`;

export const ListItem = styled.li`
  line-height: 24px;
`;

export const Link = styled.a`
  color: #0366d6;
  text-decoration: none;
  font-weight: 400;
`;
