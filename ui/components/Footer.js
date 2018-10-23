// @flow

import React from 'react';
import styled from 'styled-components';
import Credits from '../../CREDITS.md';
import { CenterText, Paragraph } from './shared/styles';

export function Footer() {
  return (
    <Container>
      <CenterText>
        <Credits
          components={{
            p: Paragraph,
            a: props => <a target="_blank" {...props} />
          }}
        />
        <Paragraph style={{ textAlign: 'right' }}>
          Made with love by{' '}
          <a target="_blank" href="https://twitter.com/skidding">
            Ovidiu
          </a>
        </Paragraph>
      </CenterText>
    </Container>
  );
}

const Container = styled.div`
  padding: 32px 0 128px 0;
  background: #20232a;
  color: #888e9c;
  overflow: hidden;

  a {
    color: #dde0e8;
  }
`;
