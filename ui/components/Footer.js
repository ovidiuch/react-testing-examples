// @flow

import React from 'react';
import styled from 'styled-components';
import { CenterText, Paragraph, Link, List, ListItem } from './shared/styles';

export function Footer() {
  return (
    <Container>
      <CenterText>
        <Paragraph>Some ideas for you</Paragraph>
        <LinksList>
          <ListItem>
            <SubtleLink
              target="_blank"
              href="https://github.com/skidding/react-testing-examples/issues/new"
            >
              Propose a testing example
            </SubtleLink>
          </ListItem>
          <ListItem>
            <SubtleLink
              target="_blank"
              href="https://github.com/react-cosmos/react-cosmos"
            >
              Check out React Cosmos
            </SubtleLink>
          </ListItem>
          <ListItem>
            <SubtleLink target="_blank" href="https://twitter.com/skidding">
              Follow @skidding for updates
            </SubtleLink>
          </ListItem>
        </LinksList>
        <Paragraph>Happy testing!</Paragraph>
      </CenterText>
    </Container>
  );
}

const Container = styled.div`
  padding: 32px 0 16px 0;
  background: #20232a;
  color: #888e9c;
  overflow: hidden;
`;

const SubtleLink = styled(Link)`
  color: #dde0e8;
`;

const LinksList = styled(List)`
  margin-bottom: 32px;
`;
